import { CodeEditor } from "@/components/code-editor";
import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook.js";
import {
  Button,
  Content,
  ContentBody,
  ContentFooter,
  ContentHeader,
  Field,
  FieldLabel,
  Heading,
  Input,
  RailLayout,
  RailLayoutMain,
  RailLayoutSide,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Textarea,
} from "@ubento/bento.arlo-core";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GoBack } from "../../go-back.js";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseMongoUri(uriStr: string) {
  try {
    if (!uriStr.trim()) return null;
    const normalized = uriStr.trim();
    const match = normalized.match(
      /^(mongodb(?:\+srv)?):\/\/(?:([^:]*)(?::([^@]*))?@)?([^/?#]+)(?:\/([^?#]*))?(?:\?([^#]*))?$/,
    );
    if (!match) return null;

    const [_, protocol, user, pass, hostPart, db, query] = match;
    const isSrv = protocol === "mongodb+srv";

    let extractedHost = hostPart;
    let extractedPort = isSrv ? "" : "27017";

    if (!isSrv) {
      const lastColon = hostPart.lastIndexOf(":");
      if (lastColon !== -1) {
        const afterColon = hostPart.substring(lastColon + 1);
        if (/^\d+$/.test(afterColon)) {
          extractedPort = afterColon;
          extractedHost = hostPart.substring(0, lastColon);
        }
      }
    }

    const username = user ? decodeURIComponent(user) : "";
    const password = pass ? decodeURIComponent(pass) : "";
    const authType = username ? "scram" : "none";
    const defaultDatabase = db ? decodeURIComponent(db) : "";

    let authSource = "admin";
    let tls = true;
    if (query) {
      const searchParams = new URLSearchParams(query);
      if (searchParams.has("authSource")) {
        authSource = searchParams.get("authSource") || "admin";
      }
      const tlsParam = searchParams.get("tls") || searchParams.get("ssl");
      if (tlsParam === "false") {
        tls = false;
      }
    }

    return {
      isSrv,
      host: extractedHost,
      port: extractedPort,
      username,
      password,
      authType,
      defaultDatabase,
      authSource,
      tls,
    };
  } catch (e) {
    return null;
  }
}

export function CreateMongoServiceModal() {
  const ubento = useUbento();
  const session = useSession();
  const { goBack } = useAppModal();

  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [specText, setSpecText] = useState("");
  const [hasEditedSpec, setHasEditedSpec] = useState(false);
  const [selectedConnectionId, setSelectedConnectionId] = useState("");
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Connection creation subform state
  const [showNewConnectionForm, setShowNewConnectionForm] = useState(false);
  const [connName, setConnName] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("27017");
  const [isSrv, setIsSrv] = useState(false);
  const [defaultDatabase, setDefaultDatabase] = useState("");
  const [authType, setAuthType] = useState<"scram" | "none">("scram");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authSource, setAuthSource] = useState("admin");
  const [tls, setTls] = useState(true);
  const [uri, setUri] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Logo Preview
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Fetch existing connections of type mongodb
  const {
    data: connectionsData,
    isLoading: isLoadingConnections,
    refetch: refetchConnections,
  } = ubento.vertex.useConnections({
    team_id: session.teamId,
  });

  const mongoConnections =
    connectionsData?.pages
      .flatMap((page) => page.data)
      .filter((c: any) => c.type === "mongodb") ?? [];

  // Fetch databases for the selected connection
  const { data: databases, isLoading: isLoadingDatabases } =
    ubento.vertex.useListMongodbDatabases(selectedConnectionId);

  // Mutations
  const { mutate: createService, isPending: isCreatingService } =
    ubento.vertex.useCreateService();
  const { mutate: createChannel, isPending: isCreatingChannel } =
    ubento.vertex.useCreateServiceChannel();
  const { mutate: uploadSpec, isPending: isUploadingSpec } =
    ubento.vertex.useUploadServiceChannelSpec();
  const { mutate: uploadServiceImage, isPending: isUploadingImage } =
    ubento.vertex.useUploadServiceImage();
  const { mutate: createConnection, isPending: isCreatingConnection } =
    ubento.vertex.useCreateConnection();
  const { mutate: extractSchema, isPending: isExtractingSchema } =
    ubento.vertex.useExtractMongodbSchema();

  const isPending =
    isCreatingService ||
    isCreatingChannel ||
    isUploadingSpec ||
    isUploadingImage;

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  // Set default selected database when database list loads
  useEffect(() => {
    if (databases && databases.length > 0) {
      if (!selectedDatabase || !databases.some((d: any) => d.name === selectedDatabase)) {
        setSelectedDatabase(databases[0].name);
      }
    } else {
      setSelectedDatabase("");
    }
  }, [databases, selectedDatabase]);

  const handleNameChange = (value: string) => {
    setName(value);
    setHandle(slugify(value));
  };

  // Generate template when fields change
  useEffect(() => {
    if (hasEditedSpec) return;

    const template = {
      spec: 1,
      type: "mongodb",
      name: name || "MongoDB Service",
      description: description || "My MongoDB Service Instance",
      connectionId: selectedConnectionId || "<selected-connection-id>",
      database: selectedDatabase || "<selected-database>",
      collections: [
        {
          name: "users",
          description: "User collection",
          schema: {
            type: "object",
            properties: {
              _id: { type: "string" },
              email: { type: "string" },
              created_at: { type: "string", format: "date-time" },
            },
          },
        },
      ],
    };

    setSpecText(JSON.stringify(template, null, 2));
  }, [name, description, selectedConnectionId, selectedDatabase, hasEditedSpec]);

  const handleCreateConnectionSubmit = () => {
    setError("");
    if (!connName.trim()) {
      setError("Connection name is required.");
      return;
    }
    if (!host.trim()) {
      setError("MongoDB host is required.");
      return;
    }

    createConnection(
      {
        team_id: session.teamId || "",
        name: connName.trim(),
        type: "mongodb",
        credentials: {
          type: authType,
          ...(authType === "scram" && {
            username: username.trim(),
            password: password.trim(),
            authSource: authSource.trim() || "admin",
          }),
        },
        // We pass data object representing connection data schema
        ...{
          data: {
            isSrv,
            host: host.trim(),
            port: isSrv ? undefined : parseInt(port) || 27017,
            defaultDatabase: defaultDatabase.trim() || undefined,
            tls,
          } as any,
        },
      },
      {
        onSuccess: (conn: any) => {
          refetchConnections().then(() => {
            setSelectedConnectionId(conn.id);
            setShowNewConnectionForm(false);
            // Clear subform state
            setConnName("");
            setUri("");
            setShowAdvanced(false);
            setHost("");
            setPort("27017");
            setIsSrv(false);
            setUsername("");
            setPassword("");
            setAuthSource("admin");
          });
        },
        onError: (err: any) => {
          setError(err.message || "Failed to create MongoDB connection.");
        },
      },
    );
  };

  const handleExtractSchema = () => {
    if (!selectedConnectionId || !selectedDatabase) return;
    setError("");
    extractSchema(
      { connectionId: selectedConnectionId, database: selectedDatabase },
      {
        onSuccess: (schemaData: any) => {
          const collections = Object.entries(schemaData || {}).map(
            ([colName, colMeta]: [string, any]) => {
              return {
                name: colName,
                description: `${colName} collection`,
                schema: colMeta.schema || { type: "object", properties: {} },
              };
            },
          );

          let currentSpecObj: any = {};
          try {
            currentSpecObj = JSON.parse(specText);
          } catch (e) {
            currentSpecObj = {
              spec: 1,
              type: "mongodb",
              name: name || "MongoDB Service",
              description: description || "My MongoDB Service Instance",
              connectionId: selectedConnectionId,
            };
          }

          const updatedSpec = {
            ...currentSpecObj,
            database: selectedDatabase,
            collections,
          };

          setSpecText(JSON.stringify(updatedSpec, null, 2));
          setHasEditedSpec(true);
        },
        onError: (err: any) => {
          setError(err.message || "Failed to extract MongoDB schema.");
        },
      },
    );
  };

  const handleCreateServiceSubmit = () => {
    setError("");
    const trimmedHandle = handle.trim();
    if (!trimmedHandle) {
      setError("Service identifier is required.");
      return;
    }
    if (!/^[a-z0-9-_]+$/.test(trimmedHandle)) {
      setError(
        "Service identifier must only contain lowercase letters, numbers, hyphens, and underscores.",
      );
      return;
    }
    if (!selectedConnectionId) {
      setError("MongoDB connection is required.");
      return;
    }

    let parsedSpec = null;
    if (specText.trim()) {
      try {
        parsedSpec = JSON.parse(specText);
      } catch {
        setError("Specification is not valid JSON.");
        return;
      }
    } else {
      setError("Specification is required.");
      return;
    }

    // Force exact type/connectionId onto specification
    parsedSpec.type = "mongodb";
    parsedSpec.connectionId = selectedConnectionId;

    createService(
      {
        team_id: session.teamId,
        scope: "team",
        handle: trimmedHandle,
        name: name.trim() || "MongoDB Service",
        description: description.trim(),
      },
      {
        onSuccess: (createdService: any) => {
          const proceed = () => {
            if (imageFile) {
              uploadServiceImage(
                { serviceId: createdService.id, file: imageFile },
                {
                  onSuccess: () => {
                    goBack();
                  },
                  onError: (err: any) => {
                    setError(err.message || "Failed to upload service image.");
                  },
                },
              );
            } else {
              goBack();
            }
          };

          createChannel(
            {
              serviceId: createdService.id,
              data: {
                team_id: session.teamId,
                name: "default",
              },
            },
            {
              onSuccess: (newChan: any) => {
                uploadSpec(
                  {
                    serviceChannelId: newChan.id,
                    spec: parsedSpec,
                  },
                  {
                    onSuccess: () => {
                      proceed();
                    },
                    onError: (err: any) => {
                      setError(
                        err.message || "Failed to upload specification.",
                      );
                    },
                  },
                );
              },
              onError: (err: any) => {
                setError(err.message || "Failed to create default channel.");
              },
            },
          );
        },
        onError: (err: any) => {
          setError(err.message || "Failed to create service.");
        },
      },
    );
  };

  return (
    <RailLayout>
      <RailLayoutSide style={{ width: "33%" }}>
        <Content>
          <ContentHeader>
            <GoBack />
            <Heading level="h4">Create MongoDB Service</Heading>
          </ContentHeader>
          <ContentBody
            paddingX={false}
            paddingY={false}
            className="overflow-hidden"
          >
            <ScrollArea>
              <div className="flex-1 space-y-4 border-border/30 px-6 py-4">
                {error && (
                  <div className="p-3 text-xs text-base bg-base/10 rounded-lg font-medium">
                    {error}
                  </div>
                )}

                {!showNewConnectionForm ? (
                  <>
                    <Field>
                      <FieldLabel>Name</FieldLabel>
                      <Input
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="e.g. My Database Service"
                        autoFocus
                      />
                    </Field>

                    <Field>
                      <FieldLabel>Service Identifier (Handle)</FieldLabel>
                      <Input
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        placeholder="e.g. my-database-service"
                      />
                      <span className="text-[11px] text-content-muted">
                        Used as the service ID/key. Must be alphanumeric with
                        dashes or underscores.
                      </span>
                    </Field>

                    <Field>
                      <div className="flex items-center justify-between">
                        <FieldLabel>MongoDB Connection</FieldLabel>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-xs font-semibold text-base hover:underline"
                          onClick={() => setShowNewConnectionForm(true)}
                        >
                          New connection
                        </Button>
                      </div>

                      {isLoadingConnections ? (
                        <div className="flex items-center gap-2 p-2">
                          <Spinner />
                          <span className="text-xs text-content-muted">
                            Loading connections...
                          </span>
                        </div>
                      ) : mongoConnections.length === 0 ? (
                        <div className="p-3 border border-dashed rounded-xl text-center space-y-2">
                          <p className="text-xs text-content-muted">
                            No MongoDB connections found.
                          </p>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setShowNewConnectionForm(true)}
                          >
                            Create Connection
                          </Button>
                        </div>
                      ) : (
                        <Select
                          value={selectedConnectionId}
                          onValueChange={setSelectedConnectionId}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select connection..." />
                          </SelectTrigger>
                          <SelectContent>
                            {mongoConnections.map((c: any) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.name || c.id}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </Field>

                    {selectedConnectionId && (
                      <Field>
                        <FieldLabel>Database</FieldLabel>
                        {isLoadingDatabases ? (
                          <div className="flex items-center gap-2 p-2">
                            <Spinner />
                            <span className="text-xs text-content-muted">
                              Loading databases...
                            </span>
                          </div>
                        ) : !databases || databases.length === 0 ? (
                          <div className="p-3 border border-dashed rounded-xl text-center">
                            <p className="text-xs text-content-muted">
                              No databases found or unable to list databases.
                            </p>
                          </div>
                        ) : (
                          <Select
                            value={selectedDatabase}
                            onValueChange={setSelectedDatabase}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select database..." />
                            </SelectTrigger>
                            <SelectContent>
                              {databases.map((db: any) => (
                                <SelectItem key={db.name} value={db.name}>
                                  {db.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                    )}

                    <Field>
                      <FieldLabel>Description</FieldLabel>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What database tasks does this service perform?"
                        rows={3}
                      />
                    </Field>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setShowNewConnectionForm(false)}
                      >
                        <ArrowLeft size={16} />
                      </Button>
                      <span className="text-sm font-bold">
                        New MongoDB Connection
                      </span>
                    </div>

                    <Field>
                      <FieldLabel>Connection Name</FieldLabel>
                      <Input
                        value={connName}
                        onChange={(e) => setConnName(e.target.value)}
                        placeholder="e.g. MongoDB Production"
                      />
                    </Field>

                    <Field>
                      <FieldLabel>Connection URI</FieldLabel>
                      <Input
                        value={uri}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUri(val);
                          const parsed = parseMongoUri(val);
                          if (parsed) {
                            setIsSrv(parsed.isSrv);
                            setHost(parsed.host);
                            if (parsed.port) {
                              setPort(parsed.port);
                            }
                            setDefaultDatabase(parsed.defaultDatabase);
                            setAuthType(parsed.authType as "scram" | "none");
                            setUsername(parsed.username);
                            setPassword(parsed.password);
                            setAuthSource(parsed.authSource);
                            setTls(parsed.tls);
                          }
                        }}
                        placeholder="mongodb://username:password@host:port/database"
                      />
                    </Field>

                    <div className="flex justify-end py-1">
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-xs font-semibold text-base hover:underline"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                      >
                        {showAdvanced
                          ? "Hide Advanced Options"
                          : "Show Advanced Options"}
                      </Button>
                    </div>

                    {showAdvanced && (
                      <>
                        <div className="flex items-center gap-4 py-1">
                          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isSrv}
                              onChange={(e) => setIsSrv(e.target.checked)}
                              className="rounded border-border"
                            />
                            Use SRV (mongodb+srv://)
                          </label>
                          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                            <input
                              type="checkbox"
                              checked={tls}
                              onChange={(e) => setTls(e.target.checked)}
                              className="rounded border-border"
                            />
                            TLS Enabled
                          </label>
                        </div>

                        <Field>
                          <FieldLabel>Host</FieldLabel>
                          <Input
                            value={host}
                            onChange={(e) => setHost(e.target.value)}
                            placeholder={
                              isSrv ? "cluster0.abcde.mongodb.net" : "localhost"
                            }
                          />
                        </Field>

                        {!isSrv && (
                          <Field>
                            <FieldLabel>Port</FieldLabel>
                            <Input
                              value={port}
                              onChange={(e) => setPort(e.target.value)}
                              placeholder="27017"
                            />
                          </Field>
                        )}

                        <Field>
                          <FieldLabel>Default Database</FieldLabel>
                          <Input
                            value={defaultDatabase}
                            onChange={(e) => setDefaultDatabase(e.target.value)}
                            placeholder="e.g. app_db"
                          />
                        </Field>

                        <Field>
                          <FieldLabel>Auth Mechanism</FieldLabel>
                          <Select
                            value={authType}
                            onValueChange={(val: any) => setAuthType(val)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="scram">
                                SCRAM (Username/Password)
                              </SelectItem>
                              <SelectItem value="none">No Auth</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>

                        {authType === "scram" && (
                          <>
                            <Field>
                              <FieldLabel>Username</FieldLabel>
                              <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                              />
                            </Field>
                            <Field>
                              <FieldLabel>Password</FieldLabel>
                              <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                type="password"
                              />
                            </Field>
                            <Field>
                              <FieldLabel>Auth Source Database</FieldLabel>
                              <Input
                                value={authSource}
                                onChange={(e) => setAuthSource(e.target.value)}
                                placeholder="admin"
                              />
                            </Field>
                          </>
                        )}
                      </>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1"
                        variant="secondary"
                        onClick={() => setShowNewConnectionForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="flex-1"
                        variant="primary"
                        disabled={isCreatingConnection || !connName || !host}
                        onClick={handleCreateConnectionSubmit}
                      >
                        {isCreatingConnection
                          ? "Creating..."
                          : "Save Connection"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </ContentBody>
        </Content>
      </RailLayoutSide>
      <RailLayoutMain>
        <Content>
          <ContentHeader>
            <div className="flex items-center justify-between w-full">
              <Heading className="text-lg font-bold">
                MongoDB Specification
              </Heading>
              {selectedConnectionId && (
                <Button
                  onClick={handleExtractSchema}
                  variant="secondary"
                  size="sm"
                  disabled={isExtractingSchema || !selectedDatabase}
                >
                  {isExtractingSchema ? "Extracting..." : "Extract Schema"}
                </Button>
              )}
            </div>
          </ContentHeader>
          <ContentBody paddingY={false}>
            <div className="h-full border rounded-lg overflow-hidden flex flex-col bg-background">
              <CodeEditor
                value={specText}
                onChange={(val) => {
                  setSpecText(val);
                  setHasEditedSpec(true);
                }}
                language="json"
                className="flex-1"
              />
            </div>
          </ContentBody>
          <ContentFooter>
            <div className="flex justify-end w-full">
              <Button
                onClick={handleCreateServiceSubmit}
                variant="primary"
                disabled={
                  !name || !handle || !selectedConnectionId || isPending
                }
              >
                {isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </ContentFooter>
        </Content>
      </RailLayoutMain>
    </RailLayout>
  );
}
