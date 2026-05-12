import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "resend",
  "type": "http",
  "connection": {
    "provider": "resend",
    "baseUrl": "https://api.resend.com"
  },
  "schemas": {
    "SendEmailRequest": {
      "type": "object",
      "properties": {
        "from": {
          "type": "string"
        },
        "to": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        },
        "bcc": {
          "type": "string"
        },
        "cc": {
          "type": "string"
        },
        "reply_to": {
          "type": "string"
        },
        "html": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "template": {
          "type": "ref",
          "ref": "EmailTemplateInput"
        },
        "headers": {
          "type": "object",
          "properties": {}
        },
        "scheduled_at": {
          "type": "string"
        },
        "attachments": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Attachment"
          }
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Tag"
          }
        },
        "topic_id": {
          "type": "string"
        }
      },
      "required": [
        "from",
        "to",
        "subject"
      ]
    },
    "Attachment": {
      "type": "object",
      "properties": {
        "content": {
          "type": "string"
        },
        "filename": {
          "type": "string"
        },
        "path": {
          "type": "string"
        },
        "content_type": {
          "type": "string"
        },
        "content_id": {
          "type": "string"
        }
      }
    },
    "Tag": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      }
    },
    "EmailTemplateInput": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "variables": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "id"
      ]
    },
    "SendEmailResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        }
      }
    },
    "UpdateEmailOptions": {
      "type": "object",
      "properties": {
        "scheduled_at": {
          "type": "string"
        }
      }
    },
    "Email": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "to": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "from": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        },
        "html": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "bcc": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "cc": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "reply_to": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "last_event": {
          "type": "string"
        }
      }
    },
    "ListEmailsResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Email"
          }
        }
      }
    },
    "CreateBatchEmailsResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    "DomainCapabilities": {
      "type": "object",
      "properties": {
        "sending": {
          "type": "string"
        },
        "receiving": {
          "type": "string"
        }
      }
    },
    "CreateDomainRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "custom_return_path": {
          "type": "string"
        },
        "open_tracking": {
          "type": "boolean"
        },
        "click_tracking": {
          "type": "boolean"
        },
        "tls": {
          "type": "string"
        },
        "capabilities": {
          "type": "ref",
          "ref": "DomainCapabilities"
        },
        "tracking_subdomain": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ]
    },
    "CreateDomainResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "capabilities": {
          "type": "ref",
          "ref": "DomainCapabilities"
        },
        "records": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DomainRecord"
          }
        },
        "region": {
          "type": "string"
        },
        "open_tracking": {
          "type": "boolean"
        },
        "click_tracking": {
          "type": "boolean"
        },
        "tracking_subdomain": {
          "type": "string"
        }
      }
    },
    "UpdateDomainOptions": {
      "type": "object",
      "properties": {
        "open_tracking": {
          "type": "boolean"
        },
        "click_tracking": {
          "type": "boolean"
        },
        "tls": {
          "type": "string"
        },
        "capabilities": {
          "type": "ref",
          "ref": "DomainCapabilities"
        },
        "tracking_subdomain": {
          "type": "string"
        }
      }
    },
    "DomainRecord": {
      "type": "object",
      "properties": {
        "record": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "ttl": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "value": {
          "type": "string"
        },
        "priority": {
          "type": "number"
        }
      }
    },
    "Domain": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "open_tracking": {
          "type": "boolean"
        },
        "click_tracking": {
          "type": "boolean"
        },
        "tracking_subdomain": {
          "type": "string"
        },
        "capabilities": {
          "type": "ref",
          "ref": "DomainCapabilities"
        },
        "records": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DomainRecord"
          }
        }
      }
    },
    "VerifyDomainResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      }
    },
    "ListDomainsResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ListDomainsItem"
          }
        }
      }
    },
    "ListDomainsItem": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "capabilities": {
          "type": "ref",
          "ref": "DomainCapabilities"
        }
      }
    },
    "UpdateDomainResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        }
      }
    },
    "DeleteDomainResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "CreateApiKeyRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "permission": {
          "type": "string"
        },
        "domain_id": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ]
    },
    "CreateApiKeyResponse": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "token": {
          "type": "string"
        }
      }
    },
    "ListApiKeysResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ApiKey"
          }
        }
      }
    },
    "ApiKey": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "last_used_at": {
          "type": "object"
        }
      }
    },
    "DeleteApiKeyResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "CreateAudienceOptions": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ]
    },
    "CreateAudienceResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "GetAudienceResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        }
      }
    },
    "RemoveAudienceResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "ListAudiencesResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "created_at": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    "CreateContactOptions": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "first_name": {
          "type": "string"
        },
        "last_name": {
          "type": "string"
        },
        "unsubscribed": {
          "type": "boolean"
        },
        "properties": {
          "type": "object",
          "properties": {}
        },
        "segments": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "topics": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "subscription": {
                "type": "string"
              }
            }
          }
        },
        "audience_id": {
          "type": "string"
        }
      },
      "required": [
        "email"
      ]
    },
    "CreateContactResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      }
    },
    "GetContactResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "first_name": {
          "type": "string"
        },
        "last_name": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "unsubscribed": {
          "type": "boolean"
        },
        "properties": {
          "type": "object",
          "properties": {}
        }
      }
    },
    "UpdateContactOptions": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "first_name": {
          "type": "string"
        },
        "last_name": {
          "type": "string"
        },
        "unsubscribed": {
          "type": "boolean"
        },
        "properties": {
          "type": "object",
          "properties": {}
        }
      }
    },
    "UpdateContactResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      }
    },
    "RemoveContactResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "ListContactsResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "email": {
                "type": "string"
              },
              "first_name": {
                "type": "string"
              },
              "last_name": {
                "type": "string"
              },
              "created_at": {
                "type": "string"
              },
              "unsubscribed": {
                "type": "boolean"
              }
            }
          }
        }
      }
    },
    "CreateBroadcastOptions": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "segment_id": {
          "type": "string"
        },
        "audience_id": {
          "type": "string"
        },
        "from": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        },
        "reply_to": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "preview_text": {
          "type": "string"
        },
        "html": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "topic_id": {
          "type": "string"
        },
        "send": {
          "type": "boolean"
        },
        "scheduled_at": {
          "type": "string"
        }
      },
      "required": [
        "from",
        "subject",
        "segment_id"
      ]
    },
    "CreateBroadcastResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        }
      }
    },
    "ListBroadcastsResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "audience_id": {
                "type": "string"
              },
              "segment_id": {
                "type": "string"
              },
              "status": {
                "type": "string"
              },
              "created_at": {
                "type": "string"
              },
              "scheduled_at": {
                "type": "string"
              },
              "sent_at": {
                "type": "string"
              },
              "topic_id": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    "GetBroadcastResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "audience_id": {
          "type": "object"
        },
        "segment_id": {
          "type": "object"
        },
        "from": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        },
        "reply_to": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "preview_text": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "scheduled_at": {
          "type": "string"
        },
        "sent_at": {
          "type": "string"
        },
        "text": {
          "type": "object"
        },
        "html": {
          "type": "object"
        },
        "topic_id": {
          "type": "object"
        }
      }
    },
    "UpdateBroadcastOptions": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "audience_id": {
          "type": "string"
        },
        "segment_id": {
          "type": "string"
        },
        "from": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        },
        "reply_to": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "preview_text": {
          "type": "string"
        },
        "html": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "topic_id": {
          "type": "string"
        }
      }
    },
    "UpdateBroadcastResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        }
      }
    },
    "RemoveBroadcastResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "SendBroadcastOptions": {
      "type": "object",
      "properties": {
        "scheduled_at": {
          "type": "string"
        }
      }
    },
    "SendBroadcastResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        }
      }
    },
    "RetrievedAttachment": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "filename": {
          "type": "string"
        },
        "content_type": {
          "type": "string"
        },
        "content_id": {
          "type": "string"
        },
        "content_disposition": {
          "type": "string"
        },
        "download_url": {
          "type": "string"
        },
        "expires_at": {
          "type": "string"
        },
        "size": {
          "type": "number"
        }
      }
    },
    "ListAttachmentsResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "filename": {
                "type": "string"
              },
              "content_type": {
                "type": "string"
              },
              "content_id": {
                "type": "string"
              },
              "content_disposition": {
                "type": "string"
              },
              "download_url": {
                "type": "string"
              },
              "expires_at": {
                "type": "string"
              },
              "size": {
                "type": "number"
              }
            }
          }
        }
      }
    },
    "GetReceivedEmailResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "to": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "from": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        },
        "message_id": {
          "type": "string"
        },
        "bcc": {
          "type": "object"
        },
        "cc": {
          "type": "object"
        },
        "reply_to": {
          "type": "object"
        },
        "html": {
          "type": "object"
        },
        "text": {
          "type": "object"
        },
        "headers": {
          "type": "object"
        },
        "created_at": {
          "type": "string"
        },
        "attachments": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "filename": {
                "type": "string"
              },
              "content_type": {
                "type": "string"
              },
              "content_id": {
                "type": "string"
              },
              "content_disposition": {
                "type": "string"
              },
              "size": {
                "type": "number"
              }
            }
          }
        }
      }
    },
    "ListReceivedEmailsResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "to": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "from": {
                "type": "string"
              },
              "subject": {
                "type": "object"
              },
              "message_id": {
                "type": "string"
              },
              "bcc": {
                "type": "object"
              },
              "cc": {
                "type": "object"
              },
              "reply_to": {
                "type": "object"
              },
              "created_at": {
                "type": "string"
              },
              "attachments": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "filename": {
                      "type": "string"
                    },
                    "content_type": {
                      "type": "string"
                    },
                    "content_id": {
                      "type": "string"
                    },
                    "content_disposition": {
                      "type": "string"
                    },
                    "size": {
                      "type": "number"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "CreateWebhookRequest": {
      "type": "object",
      "properties": {
        "endpoint": {
          "type": "string"
        },
        "events": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "endpoint",
        "events"
      ]
    },
    "CreateWebhookResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "signing_secret": {
          "type": "string"
        }
      }
    },
    "GetWebhookResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "endpoint": {
          "type": "string"
        },
        "events": {
          "type": "object"
        },
        "status": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "signing_secret": {
          "type": "string"
        }
      }
    },
    "ListWebhooksResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "endpoint": {
                "type": "string"
              },
              "events": {
                "type": "object"
              },
              "status": {
                "type": "string"
              },
              "created_at": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    "UpdateWebhookRequest": {
      "type": "object",
      "properties": {
        "endpoint": {
          "type": "string"
        },
        "events": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "status": {
          "type": "string"
        }
      }
    },
    "UpdateWebhookResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      }
    },
    "DeleteWebhookResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "TemplateVariable": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "fallback_value": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        }
      },
      "required": [
        "key",
        "type"
      ]
    },
    "TemplateVariableInput": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "fallback_value": {
          "type": "string"
        }
      },
      "required": [
        "key",
        "type"
      ]
    },
    "Template": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "current_version_id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "alias": {
          "type": "string"
        },
        "from": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        },
        "reply_to": {
          "type": "object"
        },
        "html": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "variables": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TemplateVariable"
          }
        },
        "created_at": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "published_at": {
          "type": "object"
        },
        "has_unpublished_versions": {
          "type": "boolean"
        }
      }
    },
    "TemplateListItem": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "published_at": {
          "type": "object"
        },
        "created_at": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        },
        "alias": {
          "type": "string"
        }
      }
    },
    "CreateTemplateRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "alias": {
          "type": "string"
        },
        "from": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        },
        "reply_to": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "html": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "variables": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TemplateVariableInput"
          }
        }
      },
      "required": [
        "name",
        "html"
      ]
    },
    "CreateTemplateResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        }
      }
    },
    "ListTemplatesResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TemplateListItem"
          }
        },
        "has_more": {
          "type": "boolean"
        }
      }
    },
    "UpdateTemplateOptions": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "alias": {
          "type": "string"
        },
        "from": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        },
        "reply_to": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "html": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "variables": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TemplateVariableInput"
          }
        }
      }
    },
    "UpdateTemplateResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        }
      }
    },
    "RemoveTemplateResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "PublishTemplateResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        }
      }
    },
    "DuplicateTemplateResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        }
      }
    },
    "CreateSegmentOptions": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "audience_id": {
          "type": "string"
        },
        "filter": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "name"
      ]
    },
    "CreateSegmentResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        }
      }
    },
    "GetSegmentResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "audience_id": {
          "type": "string"
        },
        "filter": {
          "type": "object",
          "properties": {}
        },
        "created_at": {
          "type": "string"
        }
      }
    },
    "ListSegmentsResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "audience_id": {
                "type": "string"
              },
              "created_at": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    "RemoveSegmentResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "CreateTopicOptions": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "default_subscription": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "visibility": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "default_subscription"
      ]
    },
    "CreateTopicResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        }
      }
    },
    "GetTopicResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "default_subscription": {
          "type": "string"
        },
        "visibility": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        }
      }
    },
    "ListTopicsResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "default_subscription": {
                "type": "string"
              },
              "visibility": {
                "type": "string"
              },
              "created_at": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    "UpdateTopicOptions": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "visibility": {
          "type": "string"
        }
      }
    },
    "UpdateTopicResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        }
      }
    },
    "RemoveTopicResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "CreateContactPropertyOptions": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "fallback_value": {
          "type": "string"
        }
      },
      "required": [
        "key",
        "type"
      ]
    },
    "CreateContactPropertyResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        }
      }
    },
    "GetContactPropertyResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "fallback_value": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        }
      }
    },
    "ListContactPropertiesResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "key": {
                "type": "string"
              },
              "type": {
                "type": "string"
              },
              "fallback_value": {
                "type": "string"
              },
              "created_at": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    "UpdateContactPropertyOptions": {
      "type": "object",
      "properties": {
        "fallback_value": {
          "type": "string"
        }
      }
    },
    "UpdateContactPropertyResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        }
      }
    },
    "RemoveContactPropertyResponseSuccess": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "object": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "AddContactToSegmentResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "contact_id": {
          "type": "string"
        },
        "segment_id": {
          "type": "string"
        }
      }
    },
    "ListContactSegmentsResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "created_at": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    "RemoveContactFromSegmentResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "contact_id": {
          "type": "string"
        },
        "segment_id": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "GetContactTopicsResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "subscription": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    "UpdateContactTopicsOptions": {
      "type": "object",
      "properties": {
        "topics": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "subscription": {
                "type": "string"
              }
            }
          }
        }
      },
      "required": [
        "topics"
      ]
    },
    "UpdateContactTopicsResponseSuccess": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "contact_id": {
          "type": "string"
        },
        "topics": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "subscription": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    "LogSummary": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "endpoint": {
          "type": "string"
        },
        "method": {
          "type": "string"
        },
        "response_status": {
          "type": "number"
        },
        "user_agent": {
          "type": "object"
        }
      }
    },
    "Log": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "endpoint": {
          "type": "string"
        },
        "method": {
          "type": "string"
        },
        "response_status": {
          "type": "number"
        },
        "user_agent": {
          "type": "object"
        },
        "request_body": {
          "type": "object"
        },
        "response_body": {
          "type": "object"
        }
      }
    },
    "ListLogsResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LogSummary"
          }
        }
      }
    },
    "AutomationStep": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "config": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "key",
        "type",
        "config"
      ]
    },
    "AutomationStepResponse": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "config": {
          "type": "object",
          "properties": {}
        }
      }
    },
    "AutomationConnection": {
      "type": "object",
      "properties": {
        "from": {
          "type": "string"
        },
        "to": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "from",
        "to"
      ]
    },
    "CreateAutomationRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AutomationStep"
          }
        },
        "connections": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AutomationConnection"
          }
        }
      },
      "required": [
        "name",
        "steps",
        "connections"
      ]
    },
    "CreateAutomationResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      }
    },
    "Automation": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AutomationStepResponse"
          }
        },
        "connections": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AutomationConnection"
          }
        }
      }
    },
    "AutomationListItem": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        }
      }
    },
    "ListAutomationsResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AutomationListItem"
          }
        }
      }
    },
    "PatchAutomationRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AutomationStep"
          }
        },
        "connections": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AutomationConnection"
          }
        }
      }
    },
    "PatchAutomationResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      }
    },
    "DeleteAutomationResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "StopAutomationResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "status": {
          "type": "string"
        }
      }
    },
    "AutomationRunStep": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "started_at": {
          "type": "object"
        },
        "completed_at": {
          "type": "object"
        },
        "output": {
          "type": "object"
        },
        "error": {
          "type": "object"
        },
        "created_at": {
          "type": "string"
        }
      }
    },
    "AutomationRun": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "started_at": {
          "type": "object"
        },
        "completed_at": {
          "type": "object"
        },
        "created_at": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AutomationRunStep"
          }
        }
      }
    },
    "AutomationRunListItem": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "started_at": {
          "type": "object"
        },
        "completed_at": {
          "type": "object"
        },
        "created_at": {
          "type": "string"
        }
      }
    },
    "ListAutomationRunsResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AutomationRunListItem"
          }
        }
      }
    },
    "Event": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "schema": {
          "type": "object"
        },
        "created_at": {
          "type": "string"
        },
        "updated_at": {
          "type": "object"
        }
      }
    },
    "EventSummary": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "schema": {
          "type": "object"
        },
        "created_at": {
          "type": "string"
        },
        "updated_at": {
          "type": "object"
        }
      }
    },
    "CreateEventRequest": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "schema": {
          "type": "object"
        }
      },
      "required": [
        "name"
      ]
    },
    "CreateEventResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      }
    },
    "ListEventsResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "has_more": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EventSummary"
          }
        }
      }
    },
    "UpdateEventRequest": {
      "type": "object",
      "properties": {
        "schema": {
          "type": "object"
        }
      },
      "required": [
        "schema"
      ]
    },
    "UpdateEventResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      }
    },
    "RemoveEventResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      }
    },
    "SendEventRequest": {
      "type": "object",
      "properties": {
        "event": {
          "type": "string"
        },
        "contact_id": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "payload": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "event"
      ]
    },
    "SendEventResponse": {
      "type": "object",
      "properties": {
        "object": {
          "type": "string"
        },
        "event": {
          "type": "string"
        }
      }
    }
  },
  "entities": {},
  "queries": {
    "get_emails": {
      "name": "Retrieve a list of emails",
      "schema": {
        "type": "ref",
        "ref": "ListEmailsResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/emails"
        }
      }
    },
    "get_emails__email_id_": {
      "name": "Retrieve a single email",
      "schema": {
        "type": "ref",
        "ref": "Email"
      },
      "args": {
        "email_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/emails/{email_id}",
          "params": {
            "email_id": {
              "$resolve": "args.email_id"
            }
          }
        }
      }
    },
    "get_emails__email_id__attachments": {
      "name": "Retrieve a list of attachments for a sent email",
      "schema": {
        "type": "ref",
        "ref": "ListAttachmentsResponse"
      },
      "args": {
        "email_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "before": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/emails/{email_id}/attachments",
          "params": {
            "email_id": {
              "$resolve": "args.email_id"
            }
          },
          "query": {
            "limit": {
              "$resolve": "args.limit"
            },
            "after": {
              "$resolve": "args.after"
            },
            "before": {
              "$resolve": "args.before"
            }
          }
        }
      }
    },
    "get_emails__email_id__attachments__attachment_id_": {
      "name": "Retrieve a single attachment for a sent email",
      "schema": {
        "type": "ref",
        "ref": "RetrievedAttachment"
      },
      "args": {
        "email_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "attachment_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/emails/{email_id}/attachments/{attachment_id}",
          "params": {
            "email_id": {
              "$resolve": "args.email_id"
            },
            "attachment_id": {
              "$resolve": "args.attachment_id"
            }
          }
        }
      }
    },
    "get_emails_receiving": {
      "name": "Retrieve a list of received emails",
      "schema": {
        "type": "ref",
        "ref": "ListReceivedEmailsResponse"
      },
      "args": {
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "before": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/emails/receiving",
          "query": {
            "limit": {
              "$resolve": "args.limit"
            },
            "after": {
              "$resolve": "args.after"
            },
            "before": {
              "$resolve": "args.before"
            }
          }
        }
      }
    },
    "get_emails_receiving__email_id_": {
      "name": "Retrieve a single received email",
      "schema": {
        "type": "ref",
        "ref": "GetReceivedEmailResponse"
      },
      "args": {
        "email_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/emails/receiving/{email_id}",
          "params": {
            "email_id": {
              "$resolve": "args.email_id"
            }
          }
        }
      }
    },
    "get_emails_receiving__email_id__attachments": {
      "name": "Retrieve a list of attachments for a received email",
      "schema": {
        "type": "ref",
        "ref": "ListAttachmentsResponse"
      },
      "args": {
        "email_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "before": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/emails/receiving/{email_id}/attachments",
          "params": {
            "email_id": {
              "$resolve": "args.email_id"
            }
          },
          "query": {
            "limit": {
              "$resolve": "args.limit"
            },
            "after": {
              "$resolve": "args.after"
            },
            "before": {
              "$resolve": "args.before"
            }
          }
        }
      }
    },
    "get_emails_receiving__email_id__attachments__attachment_id_": {
      "name": "Retrieve a single attachment for a received email",
      "schema": {
        "type": "ref",
        "ref": "RetrievedAttachment"
      },
      "args": {
        "email_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "attachment_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/emails/receiving/{email_id}/attachments/{attachment_id}",
          "params": {
            "email_id": {
              "$resolve": "args.email_id"
            },
            "attachment_id": {
              "$resolve": "args.attachment_id"
            }
          }
        }
      }
    },
    "get_domains": {
      "name": "Retrieve a list of domains",
      "schema": {
        "type": "ref",
        "ref": "ListDomainsResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/domains"
        }
      }
    },
    "get_domains__domain_id_": {
      "name": "Retrieve a single domain",
      "schema": {
        "type": "ref",
        "ref": "Domain"
      },
      "args": {
        "domain_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/domains/{domain_id}",
          "params": {
            "domain_id": {
              "$resolve": "args.domain_id"
            }
          }
        }
      }
    },
    "get_api-keys": {
      "name": "Retrieve a list of API keys",
      "schema": {
        "type": "ref",
        "ref": "ListApiKeysResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/api-keys"
        }
      }
    },
    "get_templates": {
      "name": "Retrieve a list of templates",
      "schema": {
        "type": "ref",
        "ref": "ListTemplatesResponseSuccess"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/templates"
        }
      }
    },
    "get_templates__id_": {
      "name": "Retrieve a single template",
      "schema": {
        "type": "ref",
        "ref": "Template"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/templates/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "get_audiences": {
      "name": "Retrieve a list of audiences",
      "schema": {
        "type": "ref",
        "ref": "ListAudiencesResponseSuccess"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/audiences"
        }
      }
    },
    "get_audiences__id_": {
      "name": "Retrieve a single audience",
      "schema": {
        "type": "ref",
        "ref": "GetAudienceResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/audiences/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "get_contacts": {
      "name": "Retrieve a list of contacts",
      "schema": {
        "type": "ref",
        "ref": "ListContactsResponseSuccess"
      },
      "args": {
        "segment_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/contacts",
          "query": {
            "segment_id": {
              "$resolve": "args.segment_id"
            }
          }
        }
      }
    },
    "get_contacts__id_": {
      "name": "Retrieve a single contact by ID or email",
      "schema": {
        "type": "ref",
        "ref": "GetContactResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/contacts/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "get_broadcasts": {
      "name": "Retrieve a list of broadcasts",
      "schema": {
        "type": "ref",
        "ref": "ListBroadcastsResponseSuccess"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/broadcasts"
        }
      }
    },
    "get_broadcasts__id_": {
      "name": "Retrieve a single broadcast",
      "schema": {
        "type": "ref",
        "ref": "GetBroadcastResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/broadcasts/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "get_webhooks": {
      "name": "Retrieve a list of webhooks",
      "schema": {
        "type": "ref",
        "ref": "ListWebhooksResponse"
      },
      "args": {
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "after": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "before": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/webhooks",
          "query": {
            "limit": {
              "$resolve": "args.limit"
            },
            "after": {
              "$resolve": "args.after"
            },
            "before": {
              "$resolve": "args.before"
            }
          }
        }
      }
    },
    "get_webhooks__webhook_id_": {
      "name": "Retrieve a single webhook",
      "schema": {
        "type": "ref",
        "ref": "GetWebhookResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/webhooks/{webhook_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          }
        }
      }
    },
    "get_segments": {
      "name": "Retrieve a list of segments",
      "schema": {
        "type": "ref",
        "ref": "ListSegmentsResponseSuccess"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/segments"
        }
      }
    },
    "get_segments__id_": {
      "name": "Retrieve a single segment",
      "schema": {
        "type": "ref",
        "ref": "GetSegmentResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/segments/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "get_topics": {
      "name": "Retrieve a list of topics",
      "schema": {
        "type": "ref",
        "ref": "ListTopicsResponseSuccess"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/topics"
        }
      }
    },
    "get_topics__id_": {
      "name": "Retrieve a single topic",
      "schema": {
        "type": "ref",
        "ref": "GetTopicResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/topics/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "get_contact-properties": {
      "name": "Retrieve a list of contact properties",
      "schema": {
        "type": "ref",
        "ref": "ListContactPropertiesResponseSuccess"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/contact-properties"
        }
      }
    },
    "get_contact-properties__id_": {
      "name": "Retrieve a single contact property",
      "schema": {
        "type": "ref",
        "ref": "GetContactPropertyResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/contact-properties/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "get_contacts__contact_id__segments": {
      "name": "Retrieve a list of segments for a contact",
      "schema": {
        "type": "ref",
        "ref": "ListContactSegmentsResponseSuccess"
      },
      "args": {
        "contact_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/contacts/{contact_id}/segments",
          "params": {
            "contact_id": {
              "$resolve": "args.contact_id"
            }
          }
        }
      }
    },
    "get_contacts__contact_id__topics": {
      "name": "Retrieve topics for a contact",
      "schema": {
        "type": "ref",
        "ref": "GetContactTopicsResponseSuccess"
      },
      "args": {
        "contact_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/contacts/{contact_id}/topics",
          "params": {
            "contact_id": {
              "$resolve": "args.contact_id"
            }
          }
        }
      }
    },
    "get_logs": {
      "name": "Retrieve a list of logs",
      "schema": {
        "type": "ref",
        "ref": "ListLogsResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/logs"
        }
      }
    },
    "get_logs__log_id_": {
      "name": "Retrieve a single log",
      "schema": {
        "type": "ref",
        "ref": "Log"
      },
      "args": {
        "log_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/logs/{log_id}",
          "params": {
            "log_id": {
              "$resolve": "args.log_id"
            }
          }
        }
      }
    },
    "get_automations": {
      "name": "Retrieve a list of automations",
      "schema": {
        "type": "ref",
        "ref": "ListAutomationsResponse"
      },
      "args": {
        "status": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/automations",
          "query": {
            "status": {
              "$resolve": "args.status"
            }
          }
        }
      }
    },
    "get_automations__automation_id_": {
      "name": "Retrieve a single automation",
      "schema": {
        "type": "ref",
        "ref": "Automation"
      },
      "args": {
        "automation_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/automations/{automation_id}",
          "params": {
            "automation_id": {
              "$resolve": "args.automation_id"
            }
          }
        }
      }
    },
    "get_automations__automation_id__runs": {
      "name": "Retrieve a list of automation runs",
      "schema": {
        "type": "ref",
        "ref": "ListAutomationRunsResponse"
      },
      "args": {
        "automation_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "status": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/automations/{automation_id}/runs",
          "params": {
            "automation_id": {
              "$resolve": "args.automation_id"
            }
          },
          "query": {
            "status": {
              "$resolve": "args.status"
            }
          }
        }
      }
    },
    "get_automations__automation_id__runs__run_id_": {
      "name": "Retrieve a single automation run",
      "schema": {
        "type": "ref",
        "ref": "AutomationRun"
      },
      "args": {
        "automation_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "run_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/automations/{automation_id}/runs/{run_id}",
          "params": {
            "automation_id": {
              "$resolve": "args.automation_id"
            },
            "run_id": {
              "$resolve": "args.run_id"
            }
          }
        }
      }
    },
    "get_events": {
      "name": "Retrieve a list of events",
      "schema": {
        "type": "ref",
        "ref": "ListEventsResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/events"
        }
      }
    },
    "get_events__identifier_": {
      "name": "Retrieve a single event",
      "schema": {
        "type": "ref",
        "ref": "Event"
      },
      "args": {
        "identifier": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/events/{identifier}",
          "params": {
            "identifier": {
              "$resolve": "args.identifier"
            }
          }
        }
      }
    }
  },
  "actions": {
    "post_emails": {
      "name": "Send an email",
      "schema": {
        "type": "ref",
        "ref": "SendEmailResponse"
      },
      "args": {
        "Idempotency-Key": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SendEmailRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/emails",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "patch_emails__email_id_": {
      "name": "Update a single email",
      "schema": {
        "type": "ref",
        "ref": "UpdateEmailOptions"
      },
      "args": {
        "email_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/emails/{email_id}",
          "params": {
            "email_id": {
              "$resolve": "args.email_id"
            }
          }
        }
      }
    },
    "post_emails__email_id__cancel": {
      "name": "Cancel the schedule of the e-mail.",
      "schema": {
        "type": "ref",
        "ref": "Email"
      },
      "args": {
        "email_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/emails/{email_id}/cancel",
          "params": {
            "email_id": {
              "$resolve": "args.email_id"
            }
          }
        }
      }
    },
    "post_emails_batch": {
      "name": "Trigger up to 100 batch emails at once.",
      "schema": {
        "type": "ref",
        "ref": "CreateBatchEmailsResponse"
      },
      "args": {
        "Idempotency-Key": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "SendEmailRequest"
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/emails/batch",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "post_domains": {
      "name": "Create a new domain",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateDomainRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/domains",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "patch_domains__domain_id_": {
      "name": "Update an existing domain",
      "schema": {
        "type": "ref",
        "ref": "UpdateDomainResponseSuccess"
      },
      "args": {
        "domain_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateDomainOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/domains/{domain_id}",
          "params": {
            "domain_id": {
              "$resolve": "args.domain_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_domains__domain_id_": {
      "name": "Remove an existing domain",
      "schema": {
        "type": "ref",
        "ref": "DeleteDomainResponse"
      },
      "args": {
        "domain_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/domains/{domain_id}",
          "params": {
            "domain_id": {
              "$resolve": "args.domain_id"
            }
          }
        }
      }
    },
    "post_domains__domain_id__verify": {
      "name": "Verify an existing domain",
      "schema": {
        "type": "ref",
        "ref": "VerifyDomainResponse"
      },
      "args": {
        "domain_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/domains/{domain_id}/verify",
          "params": {
            "domain_id": {
              "$resolve": "args.domain_id"
            }
          }
        }
      }
    },
    "post_api-keys": {
      "name": "Create a new API key",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateApiKeyRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/api-keys",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_api-keys__api_key_id_": {
      "name": "Remove an existing API key",
      "schema": {
        "type": "ref",
        "ref": "DeleteApiKeyResponse"
      },
      "args": {
        "api_key_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/api-keys/{api_key_id}",
          "params": {
            "api_key_id": {
              "$resolve": "args.api_key_id"
            }
          }
        }
      }
    },
    "post_templates": {
      "name": "Create a template",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateTemplateRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/templates",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "patch_templates__id_": {
      "name": "Update an existing template",
      "schema": {
        "type": "ref",
        "ref": "UpdateTemplateResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateTemplateOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/templates/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_templates__id_": {
      "name": "Remove an existing template",
      "schema": {
        "type": "ref",
        "ref": "RemoveTemplateResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/templates/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "post_templates__id__publish": {
      "name": "Publish a template",
      "schema": {
        "type": "ref",
        "ref": "PublishTemplateResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/templates/{id}/publish",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "post_templates__id__duplicate": {
      "name": "Duplicate a template",
      "schema": {
        "type": "ref",
        "ref": "DuplicateTemplateResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/templates/{id}/duplicate",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "post_audiences": {
      "name": "Create a list of contacts",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateAudienceOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/audiences",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_audiences__id_": {
      "name": "Remove an existing audience",
      "schema": {
        "type": "ref",
        "ref": "RemoveAudienceResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/audiences/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "post_contacts": {
      "name": "Create a new contact",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateContactOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/contacts",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "patch_contacts__id_": {
      "name": "Update a single contact by ID or email",
      "schema": {
        "type": "ref",
        "ref": "UpdateContactResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateContactOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/contacts/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_contacts__id_": {
      "name": "Remove an existing contact by ID or email",
      "schema": {
        "type": "ref",
        "ref": "RemoveContactResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/contacts/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "post_broadcasts": {
      "name": "Create a broadcast",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateBroadcastOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/broadcasts",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_broadcasts__id_": {
      "name": "Remove an existing broadcast that is in the draft status",
      "schema": {
        "type": "ref",
        "ref": "RemoveBroadcastResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/broadcasts/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "patch_broadcasts__id_": {
      "name": "Update an existing broadcast",
      "schema": {
        "type": "ref",
        "ref": "UpdateBroadcastResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateBroadcastOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/broadcasts/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "post_broadcasts__id__send": {
      "name": "Send or schedule a broadcast",
      "schema": {
        "type": "ref",
        "ref": "SendBroadcastResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SendBroadcastOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/broadcasts/{id}/send",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "post_webhooks": {
      "name": "Create a new webhook",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateWebhookRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/webhooks",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "patch_webhooks__webhook_id_": {
      "name": "Update an existing webhook",
      "schema": {
        "type": "ref",
        "ref": "UpdateWebhookResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateWebhookRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/webhooks/{webhook_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_webhooks__webhook_id_": {
      "name": "Remove an existing webhook",
      "schema": {
        "type": "ref",
        "ref": "DeleteWebhookResponse"
      },
      "args": {
        "webhook_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/webhooks/{webhook_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          }
        }
      }
    },
    "post_segments": {
      "name": "Create a new segment",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateSegmentOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/segments",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_segments__id_": {
      "name": "Remove an existing segment",
      "schema": {
        "type": "ref",
        "ref": "RemoveSegmentResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/segments/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "post_topics": {
      "name": "Create a new topic",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateTopicOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/topics",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "patch_topics__id_": {
      "name": "Update an existing topic",
      "schema": {
        "type": "ref",
        "ref": "UpdateTopicResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateTopicOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/topics/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_topics__id_": {
      "name": "Remove an existing topic",
      "schema": {
        "type": "ref",
        "ref": "RemoveTopicResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/topics/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "post_contact-properties": {
      "name": "Create a new contact property",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateContactPropertyOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/contact-properties",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "patch_contact-properties__id_": {
      "name": "Update an existing contact property",
      "schema": {
        "type": "ref",
        "ref": "UpdateContactPropertyResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateContactPropertyOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/contact-properties/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_contact-properties__id_": {
      "name": "Remove an existing contact property",
      "schema": {
        "type": "ref",
        "ref": "RemoveContactPropertyResponseSuccess"
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/contact-properties/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "post_contacts__contact_id__segments__segment_id_": {
      "name": "Add a contact to a segment",
      "schema": {
        "type": "ref",
        "ref": "AddContactToSegmentResponseSuccess"
      },
      "args": {
        "contact_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "segment_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/contacts/{contact_id}/segments/{segment_id}",
          "params": {
            "contact_id": {
              "$resolve": "args.contact_id"
            },
            "segment_id": {
              "$resolve": "args.segment_id"
            }
          }
        }
      }
    },
    "delete_contacts__contact_id__segments__segment_id_": {
      "name": "Remove a contact from a segment",
      "schema": {
        "type": "ref",
        "ref": "RemoveContactFromSegmentResponseSuccess"
      },
      "args": {
        "contact_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "segment_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/contacts/{contact_id}/segments/{segment_id}",
          "params": {
            "contact_id": {
              "$resolve": "args.contact_id"
            },
            "segment_id": {
              "$resolve": "args.segment_id"
            }
          }
        }
      }
    },
    "patch_contacts__contact_id__topics": {
      "name": "Update topics for a contact",
      "schema": {
        "type": "ref",
        "ref": "UpdateContactTopicsResponseSuccess"
      },
      "args": {
        "contact_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateContactTopicsOptions"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/contacts/{contact_id}/topics",
          "params": {
            "contact_id": {
              "$resolve": "args.contact_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "post_automations": {
      "name": "Create an automation",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateAutomationRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/automations",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "patch_automations__automation_id_": {
      "name": "Update an automation",
      "schema": {
        "type": "ref",
        "ref": "PatchAutomationResponse"
      },
      "args": {
        "automation_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PatchAutomationRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/automations/{automation_id}",
          "params": {
            "automation_id": {
              "$resolve": "args.automation_id"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_automations__automation_id_": {
      "name": "Delete an automation",
      "schema": {
        "type": "ref",
        "ref": "DeleteAutomationResponse"
      },
      "args": {
        "automation_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/automations/{automation_id}",
          "params": {
            "automation_id": {
              "$resolve": "args.automation_id"
            }
          }
        }
      }
    },
    "post_automations__automation_id__stop": {
      "name": "Stop an automation",
      "schema": {
        "type": "ref",
        "ref": "StopAutomationResponse"
      },
      "args": {
        "automation_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/automations/{automation_id}/stop",
          "params": {
            "automation_id": {
              "$resolve": "args.automation_id"
            }
          }
        }
      }
    },
    "post_events": {
      "name": "Create an event",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreateEventRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/events",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "post_events_send": {
      "name": "Send an event",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SendEventRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/events/send",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "patch_events__identifier_": {
      "name": "Update an event",
      "schema": {
        "type": "ref",
        "ref": "UpdateEventResponse"
      },
      "args": {
        "identifier": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UpdateEventRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/events/{identifier}",
          "params": {
            "identifier": {
              "$resolve": "args.identifier"
            }
          },
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "delete_events__identifier_": {
      "name": "Delete an event",
      "schema": {
        "type": "ref",
        "ref": "RemoveEventResponse"
      },
      "args": {
        "identifier": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/events/{identifier}",
          "params": {
            "identifier": {
              "$resolve": "args.identifier"
            }
          }
        }
      }
    }
  }
};

export default spec;
