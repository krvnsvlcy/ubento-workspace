import { BehaviorSubject } from "rxjs";
import { DataTransferPayload } from "../../../../../../tools/data-transfer/build/data_transfer.js";
import { Copilot } from "./copilot.js";

export type CopilotInputAttachment<T extends string = string, D = unknown> = {
  id: string;
  type: T;
  status: "pending" | "ready" | "errored";
  data?: D;
  getData?: () => Promise<D>;
};

export type CopilotAttachmentInputEvent = {
  payload: DataTransferPayload;
  copilot: Copilot;
};

export class CopilotInput {
  private copilot: Copilot;

  private _text = new BehaviorSubject<string>("");
  private _isLoading = new BehaviorSubject<boolean>(false);
  private _error = new BehaviorSubject<string | undefined>(undefined);
  private _attachments = new BehaviorSubject<CopilotInputAttachment[]>([]);
  private _model = new BehaviorSubject<string | undefined>(undefined);

  get text$() {
    return this._text.asObservable();
  }
  get text() {
    return this._text.value;
  }

  get isLoading$() {
    return this._isLoading.asObservable();
  }
  get isLoading() {
    return this._isLoading.value;
  }

  get error$() {
    return this._error.asObservable();
  }
  get error() {
    return this._error.value;
  }

  get attachments$() {
    return this._attachments.asObservable();
  }
  get attachments() {
    return this._attachments.value;
  }

  get model$() {
    return this._model.asObservable();
  }
  get model() {
    return this._model.value;
  }

  constructor({ copilot }: { copilot: Copilot }) {
    this.copilot = copilot;
  }

  setText(text: string) {
    this._text.next(text);
  }

  setLoading(isLoading: boolean) {
    this._isLoading.next(isLoading);
  }

  setError(error: string | undefined) {
    this._error.next(error);
  }

  addAttachment(attachment: CopilotInputAttachment) {
    this._attachments.next([...this._attachments.value, attachment]);
  }
  removeAttachment(id: string) {
    this._attachments.next(
      this._attachments.value.filter((attachment) => attachment.id !== id),
    );
  }
  clearAttachments() {
    this._attachments.next([]);
  }
  updateAttachment(id: string, update: Partial<CopilotInputAttachment>) {
    this._attachments.next(
      this._attachments.value.map((attachment) =>
        attachment.id === id ? { ...attachment, ...update } : attachment,
      ),
    );
  }

  acceptAttachmentInput(event: CopilotAttachmentInputEvent) {
    for (const tp of this.copilot.environment.attachmentTypes) {
      const matched = tp.match(event);
      if (matched) return true;
    }
    return false;
  }
  inputAttachment(event: CopilotAttachmentInputEvent) {
    for (const tp of this.copilot.environment.attachmentTypes) {
      if (!tp.match(event)) continue;
      const data = tp.handle(event);
      if (data.length) {
        for (const d of data) {
          const id = crypto.randomUUID();
          if (typeof d === "function") {
            const attachment: CopilotInputAttachment<typeof tp.type, typeof d> =
              {
                id,
                type: tp.type,
                status: "pending",
                getData: d,
              };
            this.addAttachment(attachment);
            d()
              .then((data: any) => {
                this.updateAttachment(id, { data, status: "ready" });
              })
              .catch(() => {
                this.updateAttachment(id, { status: "errored" });
              });
          } else {
            this.addAttachment({
              id,
              type: tp.type,
              status: "ready",
              data: d,
            });
          }
        }

        break;
      }
    }
  }

  setModel(model: string | undefined) {
    this._model.next(model);
  }

  dispose() {
    this._text.complete();
    this._isLoading.complete();
    this._error.complete();
    this._attachments.complete();
    this._model.complete();
  }
}
