import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "mailchimp",
  "type": "http",
  "connection": {
    "provider": "mailchimp",
    "baseUrl": "https://mandrillapp.com/api/1.4"
  },
  "schemas": {
    "ApiKey": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        }
      },
      "required": [
        "key"
      ]
    },
    "Error": {
      "type": "object",
      "properties": {
        "status": {
          "type": "string"
        },
        "code": {
          "type": "number"
        },
        "name": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      },
      "required": [
        "status",
        "code",
        "name",
        "message"
      ]
    },
    "ExportNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "IPInvalidCustomDnsError": {
      "type": "ref",
      "ref": "Error"
    },
    "IPInvalidDeletePoolError": {
      "type": "ref",
      "ref": "Error"
    },
    "IPInvalidEmptyDefaultPoolError": {
      "type": "ref",
      "ref": "Error"
    },
    "IPNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "IPOrPoolNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "IPPoolNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "InboundDomainNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "InboundRouteNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "InvalidKeyError": {
      "type": "ref",
      "ref": "Error"
    },
    "MctemplateInvalidVersionError": {
      "type": "ref",
      "ref": "Error"
    },
    "MctemplateNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "MessageNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "MessageServiceUnavailableError": {
      "type": "ref",
      "ref": "Error"
    },
    "MessageSmsSubaccountNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "MessageSubaccountNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "MessageTemplateOrSubaccountNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "MetadataNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "PaymentRequiredError": {
      "type": "ref",
      "ref": "Error"
    },
    "RejectEmailNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "RejectPhoneNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "RejectSubaccountNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "RequestLimitExceededError": {
      "type": "ref",
      "ref": "Error"
    },
    "SenderCannotDeleteVerifiedError": {
      "type": "ref",
      "ref": "Error"
    },
    "SenderDomainNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "SenderNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "ServerError": {
      "type": "ref",
      "ref": "Error"
    },
    "SubaccountNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "TagInvalidNameError": {
      "type": "ref",
      "ref": "Error"
    },
    "TemplateInvalidDataError": {
      "type": "ref",
      "ref": "Error"
    },
    "TemplateNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "UrlCannotDeleteVerifiedError": {
      "type": "ref",
      "ref": "Error"
    },
    "UrlInvalidDomainError": {
      "type": "ref",
      "ref": "Error"
    },
    "UrlNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "ValidationError": {
      "type": "ref",
      "ref": "Error"
    },
    "WebhookNotFoundError": {
      "type": "ref",
      "ref": "Error"
    },
    "MergeVar": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "content": {
          "type": "string"
        }
      }
    },
    "Sender": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "sent": {
          "type": "number"
        },
        "hard_bounces": {
          "type": "number"
        },
        "soft_bounces": {
          "type": "number"
        },
        "rejects": {
          "type": "number"
        },
        "complaints": {
          "type": "number"
        },
        "unsubs": {
          "type": "number"
        },
        "opens": {
          "type": "number"
        },
        "clicks": {
          "type": "number"
        },
        "unique_clicks": {
          "type": "number"
        },
        "unique_opens": {
          "type": "number"
        }
      }
    },
    "StatsWindow": {
      "type": "object",
      "properties": {
        "sent": {
          "type": "number"
        },
        "hard_bounces": {
          "type": "number"
        },
        "soft_bounces": {
          "type": "number"
        },
        "rejects": {
          "type": "number"
        },
        "complaints": {
          "type": "number"
        },
        "unsubs": {
          "type": "number"
        },
        "opens": {
          "type": "number"
        },
        "unique_opens": {
          "type": "number"
        },
        "clicks": {
          "type": "number"
        },
        "unique_clicks": {
          "type": "number"
        }
      }
    },
    "AllowlistsAddRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "AllowlistsAddResponse": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "added": {
          "type": "boolean"
        }
      },
      "required": [
        "email",
        "added"
      ]
    },
    "AllowlistsDeleteRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "AllowlistsDeleteResponse": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      },
      "required": [
        "email",
        "deleted"
      ]
    },
    "AllowlistsListRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "AllowlistsListResponse": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          },
          "detail": {
            "type": "string"
          },
          "created_at": {
            "type": "string"
          }
        },
        "required": [
          "email",
          "detail",
          "created_at"
        ]
      }
    },
    "ExportsActivityRequest": {
      "type": "object",
      "properties": {
        "key": {
          "type": "ref",
          "ref": "ApiKey"
        },
        "notify_email": {
          "type": "string"
        },
        "date_from": {
          "type": "string"
        },
        "date_to": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "senders": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "states": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "api_keys": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "key"
      ]
    },
    "ExportsActivityResponse": {
      "type": "ref",
      "ref": "Export"
    },
    "ExportsAllowlistRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "ExportsAllowlistResponse": {
      "type": "ref",
      "ref": "Export"
    },
    "Export": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "finished_at": {
          "type": "object"
        },
        "state": {
          "type": "string"
        },
        "result_url": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "created_at",
        "type",
        "state"
      ]
    },
    "ExportsInfoRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "ExportsInfoResponse": {
      "type": "ref",
      "ref": "Export"
    },
    "ExportsListRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "ExportsListResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "Export"
      }
    },
    "ExportsRejectsRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "ExportsRejectsResponse": {
      "type": "ref",
      "ref": "Export"
    },
    "ExportsWhitelistRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "ExportsWhitelistResponse": {
      "type": "ref",
      "ref": "Export"
    },
    "IPsCancelWarmupRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "IPsCancelWarmupResponse": {
      "type": "ref",
      "ref": "IP"
    },
    "IPsCheckCustomDnsRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "IPsCheckCustomDnsResponse": {
      "type": "object",
      "properties": {
        "valid": {
          "type": "boolean"
        },
        "error": {
          "type": "object"
        }
      },
      "required": [
        "valid"
      ]
    },
    "IPsCreatePoolRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "IPsCreatePoolResponse": {
      "type": "ref",
      "ref": "IPsPool"
    },
    "IPsDeletePoolRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "IPsDeletePoolResponse": {
      "type": "object",
      "properties": {
        "pool": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      },
      "required": [
        "pool",
        "deleted"
      ]
    },
    "IPsDeleteRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "IPsDeleteResponse": {
      "type": "object",
      "properties": {
        "ip": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        }
      },
      "required": [
        "ip",
        "deleted"
      ]
    },
    "IP": {
      "type": "object",
      "properties": {
        "ip": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "pool": {
          "type": "string"
        },
        "domain": {
          "type": "string"
        },
        "custom_dns": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "valid": {
              "type": "boolean"
            },
            "error": {
              "type": "object"
            }
          },
          "required": [
            "enabled",
            "valid"
          ]
        },
        "warmup": {
          "type": "ref",
          "ref": "IPsWarmupStatus"
        }
      },
      "required": [
        "ip",
        "created_at",
        "pool",
        "domain",
        "custom_dns",
        "warmup"
      ]
    },
    "IPsInfoRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "IPsInfoResponse": {
      "type": "ref",
      "ref": "IP"
    },
    "IPsListPoolsRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "IPsListPoolsResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "IPsPool"
      }
    },
    "IPsListRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "IPsListResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "IP"
      }
    },
    "IPsPool": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "ips": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "IP"
          }
        }
      },
      "required": [
        "name",
        "created_at",
        "ips"
      ]
    },
    "IPsPoolInfoRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "IPsPoolInfoResponse": {
      "type": "ref",
      "ref": "IPsPool"
    },
    "IPsProvisionRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "IPsProvisionResponse": {
      "type": "object",
      "properties": {
        "requested_at": {
          "type": "string"
        }
      },
      "required": [
        "requested_at"
      ]
    },
    "IPsSetCustomDnsRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "IPsSetCustomDnsResponse": {
      "type": "ref",
      "ref": "IP"
    },
    "IPsSetPoolRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "IPsSetPoolResponse": {
      "type": "ref",
      "ref": "IP"
    },
    "IPsStartWarmupRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "IPsStartWarmupResponse": {
      "type": "ref",
      "ref": "IP"
    },
    "IPsWarmupStatus": {
      "type": "object",
      "properties": {
        "warming_up": {
          "type": "boolean"
        },
        "start_at": {
          "type": "object"
        },
        "end_at": {
          "type": "object"
        }
      },
      "required": [
        "warming_up"
      ]
    },
    "InboundAddDomainRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "InboundAddDomainResponse": {
      "type": "ref",
      "ref": "InboundDomain"
    },
    "InboundAddRouteRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "InboundAddRouteResponse": {
      "type": "ref",
      "ref": "InboundRoute"
    },
    "InboundCheckDomainRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "InboundCheckDomainResponse": {
      "type": "ref",
      "ref": "InboundDomain"
    },
    "InboundDeleteDomainRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "InboundDeleteDomainResponse": {
      "type": "ref",
      "ref": "InboundDomain"
    },
    "InboundDeleteRouteRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "InboundDeleteRouteResponse": {
      "type": "ref",
      "ref": "InboundRoute"
    },
    "InboundDomainsRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "InboundDomainsResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "InboundDomain"
      }
    },
    "InboundDomain": {
      "type": "object",
      "properties": {
        "domain": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "valid_mx": {
          "type": "boolean"
        }
      },
      "required": [
        "domain",
        "created_at",
        "valid_mx"
      ]
    },
    "InboundRoute": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "pattern": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "pattern",
        "url"
      ]
    },
    "InboundRoutesRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "InboundRoutesResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "InboundRoute"
      }
    },
    "InboundSendRawRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "InboundSendRawResponse": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          },
          "pattern": {
            "type": "string"
          },
          "url": {
            "type": "string"
          }
        },
        "required": [
          "email",
          "pattern",
          "url"
        ]
      }
    },
    "InboundUpdateRouteRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "InboundUpdateRouteResponse": {
      "type": "ref",
      "ref": "InboundRoute"
    },
    "MctemplatesInfoRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MctemplatesInfoResponse": {
      "type": "ref",
      "ref": "MctemplatesMcTemplate"
    },
    "MctemplatesListRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MctemplatesListResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "MctemplatesMcTemplate"
      }
    },
    "MctemplatesMcTemplate": {
      "type": "object",
      "properties": {
        "mc_template_id": {
          "type": "number"
        },
        "mc_template_name": {
          "type": "string"
        },
        "labels": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "code": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        },
        "from_email": {
          "type": "string"
        },
        "from_name": {
          "type": "string"
        },
        "text": {
          "type": "string"
        },
        "publish_code": {
          "type": "string"
        },
        "publish_text": {
          "type": "string"
        },
        "published_at": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        },
        "draft_updated_at": {
          "type": "string"
        },
        "is_broken_template": {
          "type": "boolean"
        }
      },
      "required": [
        "mc_template_id",
        "mc_template_name",
        "labels",
        "code",
        "subject",
        "from_email",
        "from_name",
        "text",
        "publish_code",
        "publish_text",
        "published_at",
        "created_at",
        "updated_at",
        "draft_updated_at",
        "is_broken_template"
      ]
    },
    "MctemplatesRenderRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MctemplatesRenderResponse": {
      "type": "object",
      "properties": {
        "html": {
          "type": "string"
        }
      },
      "required": [
        "html"
      ]
    },
    "MctemplatesTimeSeries": {
      "type": "object",
      "properties": {
        "sent": {
          "type": "number"
        },
        "hard_bounces": {
          "type": "number"
        },
        "soft_bounces": {
          "type": "number"
        },
        "rejects": {
          "type": "number"
        },
        "complaints": {
          "type": "number"
        },
        "unsubs": {
          "type": "number"
        },
        "opens": {
          "type": "number"
        },
        "unique_opens": {
          "type": "number"
        },
        "clicks": {
          "type": "number"
        },
        "unique_clicks": {
          "type": "number"
        },
        "time": {
          "type": "string"
        }
      },
      "required": [
        "sent",
        "hard_bounces",
        "soft_bounces",
        "rejects",
        "complaints",
        "unsubs",
        "opens",
        "clicks",
        "unique_opens",
        "unique_clicks",
        "time"
      ]
    },
    "MctemplatesTimeSeriesRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MctemplatesTimeSeriesResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "MctemplatesTimeSeries"
      }
    },
    "MessagesCancelScheduledRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MessagesCancelScheduledResponse": {
      "type": "ref",
      "ref": "MessagesScheduled"
    },
    "MessagesClickDetail": {
      "type": "object",
      "properties": {
        "ts": {
          "type": "number"
        },
        "url": {
          "type": "string"
        },
        "ip": {
          "type": "string"
        },
        "location": {
          "type": "string"
        },
        "ua": {
          "type": "string"
        }
      },
      "required": [
        "ts",
        "url",
        "ip",
        "location",
        "ua"
      ]
    },
    "MessagesContentRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MessagesContentResponse": {
      "type": "ref",
      "ref": "MessagesEmailContent"
    },
    "MessagesEmailContent": {
      "type": "ref",
      "ref": "MessagesMessageBase"
    },
    "MessagesEmailDetails": {
      "type": "object",
      "properties": {
        "sender": {
          "type": "string"
        },
        "template": {
          "type": "object"
        },
        "mc_template": {
          "type": "object"
        },
        "subject": {
          "type": "string"
        },
        "email": {
          "type": "string"
        }
      },
      "required": [
        "sender",
        "subject",
        "email"
      ]
    },
    "MessagesEmailInfo": {
      "type": "ref",
      "ref": "MessagesMessageBase"
    },
    "MessagesInfoRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MessagesInfoResponse": {
      "type": "ref",
      "ref": "MessagesEmailInfo"
    },
    "MessagesListScheduledRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MessagesListScheduledResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "MessagesScheduled"
      }
    },
    "MessagesMessageBase": {
      "type": "object",
      "properties": {
        "ts": {
          "type": "number"
        },
        "_id": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "ts",
        "_id",
        "tags"
      ]
    },
    "MessagesOpenDetail": {
      "type": "object",
      "properties": {
        "ts": {
          "type": "number"
        },
        "ip": {
          "type": "string"
        },
        "location": {
          "type": "string"
        },
        "ua": {
          "type": "string"
        }
      },
      "required": [
        "ts",
        "ip",
        "location",
        "ua"
      ]
    },
    "MessagesParseRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MessagesParseResponse": {
      "type": "object",
      "properties": {
        "headers": {
          "type": "object",
          "properties": {}
        },
        "text": {
          "type": "string"
        },
        "text_flowed": {
          "type": "boolean"
        },
        "attachments": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "type": {
                "type": "string"
              },
              "content": {
                "type": "string"
              },
              "binary": {
                "type": "boolean"
              }
            }
          }
        },
        "from_email": {
          "type": "string"
        },
        "from_name": {
          "type": "string"
        },
        "html": {
          "type": "object"
        },
        "to": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "email": {
                "type": "string"
              },
              "name": {
                "type": "object"
              }
            }
          }
        },
        "subject": {
          "type": "object"
        }
      },
      "required": [
        "headers",
        "text",
        "text_flowed",
        "attachments",
        "from_email",
        "from_name"
      ]
    },
    "MessagesRequestComponent": {
      "type": "object",
      "properties": {
        "html": {
          "type": "object"
        },
        "text": {
          "type": "object"
        },
        "subject": {
          "type": "object"
        },
        "from_email": {
          "type": "object"
        },
        "from_name": {
          "type": "object"
        },
        "to": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "email": {
                "type": "string"
              },
              "name": {
                "type": "object"
              },
              "type": {
                "type": "object"
              }
            }
          }
        },
        "headers": {
          "type": "object",
          "properties": {}
        },
        "important": {
          "type": "object"
        },
        "track_opens": {
          "type": "object"
        },
        "track_clicks": {
          "type": "object"
        },
        "auto_text": {
          "type": "object"
        },
        "auto_html": {
          "type": "object"
        },
        "inline_css": {
          "type": "object"
        },
        "url_strip_qs": {
          "type": "object"
        },
        "preserve_recipients": {
          "type": "object"
        },
        "view_content_link": {
          "type": "object"
        },
        "bcc_address": {
          "type": "object"
        },
        "tracking_domain": {
          "type": "object"
        },
        "signing_domain": {
          "type": "object"
        },
        "return_path_domain": {
          "type": "object"
        },
        "merge": {
          "type": "object"
        },
        "merge_language": {
          "type": "object"
        },
        "global_merge_vars": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MergeVar"
          }
        },
        "merge_vars": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "rcpt": {
                "type": "string"
              },
              "vars": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "MergeVar"
                }
              }
            }
          }
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "subaccount": {
          "type": "object"
        },
        "google_analytics_domains": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "google_analytics_campaign": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "metadata": {
          "type": "object",
          "properties": {}
        },
        "recipient_metadata": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "rcpt": {
                "type": "string"
              },
              "values": {
                "type": "object",
                "properties": {}
              }
            }
          }
        },
        "attachments": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "content": {
                "type": "string"
              }
            }
          }
        },
        "images": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "content": {
                "type": "string"
              }
            }
          }
        }
      }
    },
    "MessagesRescheduleRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MessagesRescheduleResponse": {
      "type": "ref",
      "ref": "MessagesScheduled"
    },
    "MessagesScheduled": {
      "type": "object",
      "properties": {
        "_id": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "send_at": {
          "type": "string"
        },
        "from_email": {
          "type": "string"
        },
        "to": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        }
      },
      "required": [
        "_id",
        "created_at",
        "send_at",
        "from_email",
        "to",
        "subject"
      ]
    },
    "MessagesSearchRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MessagesSearchResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "MessagesEmailInfo"
      }
    },
    "MessagesSearchTimeSeries": {
      "type": "object",
      "properties": {
        "time": {
          "type": "string"
        },
        "sent": {
          "type": "number"
        },
        "opens": {
          "type": "number"
        },
        "clicks": {
          "type": "number"
        },
        "hard_bounces": {
          "type": "number"
        },
        "soft_bounces": {
          "type": "number"
        },
        "rejects": {
          "type": "number"
        },
        "complaints": {
          "type": "number"
        },
        "unsubs": {
          "type": "number"
        },
        "unique_opens": {
          "type": "number"
        },
        "unique_clicks": {
          "type": "number"
        }
      },
      "required": [
        "time",
        "sent",
        "opens",
        "clicks",
        "hard_bounces",
        "soft_bounces",
        "rejects",
        "complaints",
        "unsubs",
        "unique_opens",
        "unique_clicks"
      ]
    },
    "MessagesSearchTimeSeriesRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MessagesSearchTimeSeriesResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "MessagesSearchTimeSeries"
      }
    },
    "MessagesSendMcTemplateRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MessagesSendMcTemplateResponse": {
      "type": "ref",
      "ref": "MessagesSendResponse"
    },
    "MessagesSendRawRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MessagesSendRawResponse": {
      "type": "ref",
      "ref": "MessagesSendResponse"
    },
    "MessagesSendRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MessagesSendResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "MessagesSendResult"
      }
    },
    "MessagesSendResult": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "reject_reason": {
          "type": "object"
        },
        "queued_reason": {
          "type": "object"
        },
        "_id": {
          "type": "string"
        }
      },
      "required": [
        "email",
        "status",
        "_id"
      ]
    },
    "MessagesSendSmsRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MessagesSendSmsResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "MessagesSmsMessage"
      }
    },
    "MessagesSendTemplateRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MessagesSendTemplateResponse": {
      "type": "ref",
      "ref": "MessagesSendResponse"
    },
    "MessagesSmsContent": {
      "type": "ref",
      "ref": "MessagesMessageBase"
    },
    "MessagesSmsEvent": {
      "type": "object",
      "properties": {
        "ts": {
          "type": "number"
        },
        "state": {
          "type": "string"
        },
        "sub_state": {
          "type": "object"
        }
      },
      "required": [
        "ts",
        "state"
      ]
    },
    "MessagesSmsInfo": {
      "type": "ref",
      "ref": "MessagesMessageBase"
    },
    "MessagesSmsMessage": {
      "type": "object",
      "properties": {
        "to": {
          "type": "string"
        },
        "from": {
          "type": "string"
        },
        "status": {
          "type": "object",
          "properties": {}
        },
        "reject_reason": {
          "type": "object"
        },
        "queue_reason": {
          "type": "object"
        },
        "_id": {
          "type": "string"
        }
      },
      "required": [
        "to",
        "from",
        "status",
        "_id"
      ]
    },
    "MessagesSmtpEvent": {
      "type": "object",
      "properties": {
        "ts": {
          "type": "number"
        },
        "type": {
          "type": "string"
        },
        "diag": {
          "type": "string"
        },
        "source_ip": {
          "type": "string"
        },
        "destination_ip": {
          "type": "string"
        },
        "size": {
          "type": "number"
        }
      },
      "required": [
        "ts",
        "type",
        "diag",
        "source_ip",
        "destination_ip",
        "size"
      ]
    },
    "MessagesTrackingFields": {
      "type": "object",
      "properties": {
        "opens": {
          "type": "number"
        },
        "clicks": {
          "type": "number"
        },
        "opens_detail": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessagesOpenDetail"
          }
        },
        "clicks_detail": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MessagesClickDetail"
          }
        },
        "state": {
          "type": "string"
        },
        "metadata": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "opens",
        "clicks",
        "opens_detail",
        "clicks_detail",
        "state"
      ]
    },
    "MetadataAddRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MetadataAddResponse": {
      "type": "ref",
      "ref": "Metadata"
    },
    "MetadataDeleteRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MetadataDeleteResponse": {
      "type": "ref",
      "ref": "Metadata"
    },
    "MetadataListRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MetadataListResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "MetadataResponseData"
      }
    },
    "Metadata": {
      "type": "ref",
      "ref": "MetadataResponseData"
    },
    "MetadataResponseData": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "view_template": {
          "type": "object"
        }
      },
      "required": [
        "name",
        "state"
      ]
    },
    "MetadataUpdateRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "MetadataUpdateResponse": {
      "type": "ref",
      "ref": "Metadata"
    },
    "RejectsAddRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "RejectsAddResponse": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "added": {
          "type": "boolean"
        }
      },
      "required": [
        "email",
        "added"
      ]
    },
    "RejectsAddSmsRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "RejectsAddSmsResponse": {
      "type": "ref",
      "ref": "RejectsSmsReject"
    },
    "RejectsDeleteRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "RejectsDeleteResponse": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "deleted": {
          "type": "boolean"
        },
        "subaccount": {
          "type": "string"
        }
      },
      "required": [
        "email",
        "deleted"
      ]
    },
    "RejectsDeleteSmsRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "RejectsDeleteSmsResponse": {
      "type": "ref",
      "ref": "RejectsSmsReject"
    },
    "RejectsListRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "RejectsListResponse": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          },
          "reason": {
            "type": "string"
          },
          "detail": {
            "type": "string"
          },
          "created_at": {
            "type": "string"
          },
          "last_event_at": {
            "type": "string"
          },
          "expires_at": {
            "type": "string"
          },
          "expired": {
            "type": "boolean"
          },
          "sender": {
            "type": "object"
          },
          "subaccount": {
            "type": "object"
          }
        },
        "required": [
          "email",
          "reason",
          "detail",
          "created_at",
          "last_event_at",
          "expires_at",
          "expired"
        ]
      }
    },
    "RejectsListSmsRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "RejectsListSmsResponse": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "phone": {
            "type": "string"
          },
          "created_at": {
            "type": "string"
          },
          "expires_at": {
            "type": "object"
          },
          "expired": {
            "type": "boolean"
          },
          "subaccount": {
            "type": "object"
          }
        },
        "required": [
          "phone",
          "created_at",
          "expired"
        ]
      }
    },
    "RejectsSmsReject": {
      "type": "object",
      "properties": {
        "phone": {
          "type": "string"
        },
        "added": {
          "type": "boolean"
        },
        "deleted": {
          "type": "boolean"
        },
        "subaccount": {
          "type": "object"
        }
      },
      "required": [
        "phone"
      ]
    },
    "SendersAddDomainRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SendersAddDomainResponse": {
      "type": "ref",
      "ref": "SendersSenderDomain"
    },
    "SendersCheckDomainRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SendersCheckDomainResponse": {
      "type": "ref",
      "ref": "SendersSenderDomain"
    },
    "SendersDeleteDomainRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SendersDeleteDomainResponse": {
      "type": "ref",
      "ref": "SendersSenderDomain"
    },
    "DmarcDetail": {
      "type": "object",
      "properties": {
        "valid": {
          "type": "boolean"
        },
        "error": {
          "type": "string"
        }
      }
    },
    "SendersDomainsRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SendersDomainsResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "SendersSenderDomain"
      }
    },
    "SendersHourStat": {
      "type": "object",
      "properties": {
        "time": {
          "type": "string"
        },
        "sent": {
          "type": "number"
        },
        "hard_bounces": {
          "type": "number"
        },
        "soft_bounces": {
          "type": "number"
        },
        "rejects": {
          "type": "number"
        },
        "complaints": {
          "type": "number"
        },
        "opens": {
          "type": "number"
        },
        "unique_opens": {
          "type": "number"
        },
        "clicks": {
          "type": "number"
        },
        "unique_clicks": {
          "type": "number"
        }
      }
    },
    "SendersInfoRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SendersInfoResponse": {
      "type": "ref",
      "ref": "Sender"
    },
    "SendersListRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SendersListResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "Sender"
      }
    },
    "SendersSenderDomain": {
      "type": "object",
      "properties": {
        "domain": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "last_tested_at": {
          "type": "string"
        },
        "spf": {
          "type": "ref",
          "ref": "VerificationDetail"
        },
        "dkim": {
          "type": "ref",
          "ref": "VerificationDetail"
        },
        "dkim2": {
          "type": "ref",
          "ref": "VerificationDetail"
        },
        "dmarc": {
          "type": "ref",
          "ref": "DmarcDetail"
        },
        "verified_at": {
          "type": "string"
        },
        "valid_signing": {
          "type": "boolean"
        },
        "verify_txt_key": {
          "type": "string"
        }
      }
    },
    "SendersTimeSeriesRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SendersTimeSeriesResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "SendersHourStat"
      }
    },
    "VerificationDetail": {
      "type": "object",
      "properties": {
        "valid": {
          "type": "boolean"
        },
        "valid_after": {
          "type": "string"
        },
        "error": {
          "type": "string"
        }
      }
    },
    "SendersVerifyDomainRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SendersVerifyDomainResponse": {
      "type": "object",
      "properties": {
        "status": {
          "type": "string"
        },
        "domain": {
          "type": "string"
        },
        "email": {
          "type": "string"
        }
      },
      "required": [
        "status",
        "domain",
        "email"
      ]
    },
    "SubaccountsAddRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SubaccountsAddResponse": {
      "type": "ref",
      "ref": "SubaccountsSubaccount"
    },
    "SubaccountsDeleteRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SubaccountsDeleteResponse": {
      "type": "ref",
      "ref": "SubaccountsSubaccount"
    },
    "SubaccountsInfoRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SubaccountsInfoResponse": {
      "type": "ref",
      "ref": "SubaccountsSubaccount"
    },
    "SubaccountsListRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SubaccountsListResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "SubaccountsSubaccount"
      }
    },
    "SubaccountsPauseRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SubaccountsPauseResponse": {
      "type": "ref",
      "ref": "SubaccountsSubaccount"
    },
    "SubaccountsResumeRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SubaccountsResumeResponse": {
      "type": "ref",
      "ref": "SubaccountsSubaccount"
    },
    "SubaccountsSubaccount": {
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
        "first_sent_at": {
          "type": "object"
        },
        "status": {
          "type": "string"
        },
        "reputation": {
          "type": "number"
        },
        "sent_weekly": {
          "type": "number"
        },
        "sent_monthly": {
          "type": "number"
        },
        "sent_total": {
          "type": "number"
        },
        "custom_quota": {
          "type": "number"
        }
      },
      "required": [
        "id",
        "status",
        "reputation",
        "created_at",
        "sent_weekly",
        "sent_monthly",
        "sent_total"
      ]
    },
    "SubaccountsUpdateRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "SubaccountsUpdateResponse": {
      "type": "ref",
      "ref": "SubaccountsSubaccount"
    },
    "TagsAllTimeSeriesRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "TagsAllTimeSeriesResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "TagsTimeSeriesWithTag"
      }
    },
    "TagsDeleteRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "TagsDeleteResponse": {
      "type": "object",
      "properties": {
        "tag": {
          "type": "string"
        },
        "sent": {
          "type": "number"
        },
        "hard_bounces": {
          "type": "number"
        },
        "soft_bounces": {
          "type": "number"
        },
        "rejects": {
          "type": "number"
        },
        "complaints": {
          "type": "number"
        },
        "unsubs": {
          "type": "number"
        },
        "opens": {
          "type": "number"
        },
        "clicks": {
          "type": "number"
        },
        "unique_opens": {
          "type": "number"
        },
        "unique_clicks": {
          "type": "number"
        },
        "reputation": {
          "type": "number"
        }
      },
      "required": [
        "tag",
        "sent",
        "hard_bounces",
        "soft_bounces",
        "rejects",
        "complaints",
        "unsubs",
        "opens",
        "clicks",
        "unique_opens",
        "unique_clicks",
        "reputation"
      ]
    },
    "TagsInfoRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "TagsInfoResponse": {
      "type": "object",
      "properties": {
        "tag": {
          "type": "string"
        },
        "sent": {
          "type": "number"
        },
        "hard_bounces": {
          "type": "number"
        },
        "soft_bounces": {
          "type": "number"
        },
        "rejects": {
          "type": "number"
        },
        "complaints": {
          "type": "number"
        },
        "unsubs": {
          "type": "number"
        },
        "opens": {
          "type": "number"
        },
        "clicks": {
          "type": "number"
        },
        "unique_opens": {
          "type": "number"
        },
        "unique_clicks": {
          "type": "number"
        },
        "reputation": {
          "type": "number"
        },
        "stats": {
          "type": "object",
          "properties": {
            "today": {
              "type": "ref",
              "ref": "StatsWindow"
            },
            "last_7_days": {
              "type": "ref",
              "ref": "StatsWindow"
            },
            "last_30_days": {
              "type": "ref",
              "ref": "StatsWindow"
            },
            "last_60_days": {
              "type": "ref",
              "ref": "StatsWindow"
            },
            "last_90_days": {
              "type": "ref",
              "ref": "StatsWindow"
            }
          },
          "required": [
            "today",
            "last_7_days",
            "last_30_days",
            "last_60_days",
            "last_90_days"
          ]
        }
      },
      "required": [
        "tag",
        "sent",
        "hard_bounces",
        "soft_bounces",
        "rejects",
        "complaints",
        "unsubs",
        "opens",
        "clicks",
        "unique_opens",
        "unique_clicks",
        "reputation",
        "stats"
      ]
    },
    "TagsListRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "TagsListResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "TagsTag"
      }
    },
    "TagsTag": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "number"
        },
        "tag": {
          "type": "string"
        },
        "sent": {
          "type": "number"
        },
        "hard_bounces": {
          "type": "number"
        },
        "soft_bounces": {
          "type": "number"
        },
        "rejects": {
          "type": "number"
        },
        "complaints": {
          "type": "number"
        },
        "unsubs": {
          "type": "number"
        },
        "opens": {
          "type": "number"
        },
        "clicks": {
          "type": "number"
        },
        "content_reviews": {
          "type": "number"
        },
        "content_rejections": {
          "type": "number"
        },
        "reject_resets": {
          "type": "number"
        },
        "unique_opens": {
          "type": "number"
        },
        "unique_clicks": {
          "type": "number"
        },
        "reputation": {
          "type": "number"
        },
        "confidence": {
          "type": "number"
        }
      },
      "required": [
        "user_id",
        "tag",
        "sent",
        "hard_bounces",
        "soft_bounces",
        "rejects",
        "complaints",
        "unsubs",
        "opens",
        "clicks",
        "content_reviews",
        "content_rejections",
        "reject_resets",
        "unique_opens",
        "unique_clicks",
        "reputation",
        "confidence"
      ]
    },
    "TagsTagTimeSeries": {
      "type": "object",
      "properties": {
        "sent": {
          "type": "number"
        },
        "hard_bounces": {
          "type": "number"
        },
        "soft_bounces": {
          "type": "number"
        },
        "rejects": {
          "type": "number"
        },
        "complaints": {
          "type": "number"
        },
        "unsubs": {
          "type": "number"
        },
        "opens": {
          "type": "number"
        },
        "unique_opens": {
          "type": "number"
        },
        "clicks": {
          "type": "number"
        },
        "unique_clicks": {
          "type": "number"
        },
        "time": {
          "type": "string"
        }
      },
      "required": [
        "sent",
        "hard_bounces",
        "soft_bounces",
        "rejects",
        "complaints",
        "unsubs",
        "opens",
        "clicks",
        "unique_opens",
        "unique_clicks",
        "time"
      ]
    },
    "TagsTimeSeriesRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "TagsTimeSeriesResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "TagsTagTimeSeries"
      }
    },
    "TagsTimeSeriesWithTag": {
      "type": "ref",
      "ref": "TagsTagTimeSeries"
    },
    "TemplatesAddRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "TemplatesAddResponse": {
      "type": "ref",
      "ref": "TemplatesTemplate"
    },
    "TemplatesDeleteRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "TemplatesDeleteResponse": {
      "type": "ref",
      "ref": "TemplatesTemplate"
    },
    "TemplatesInfoRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "TemplatesInfoResponse": {
      "type": "ref",
      "ref": "TemplatesTemplate"
    },
    "TemplatesListRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "TemplatesListResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "TemplatesTemplate"
      }
    },
    "TemplatesPublishRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "TemplatesPublishResponse": {
      "type": "ref",
      "ref": "TemplatesTemplate"
    },
    "TemplatesRenderRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "TemplatesRenderResponse": {
      "type": "object",
      "properties": {
        "html": {
          "type": "string"
        }
      },
      "required": [
        "html"
      ]
    },
    "TemplatesTemplate": {
      "type": "object",
      "properties": {
        "slug": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "labels": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "code": {
          "type": "object"
        },
        "subject": {
          "type": "object"
        },
        "from_email": {
          "type": "object"
        },
        "from_name": {
          "type": "object"
        },
        "text": {
          "type": "object"
        },
        "publish_name": {
          "type": "string"
        },
        "publish_code": {
          "type": "object"
        },
        "publish_subject": {
          "type": "object"
        },
        "publish_from_email": {
          "type": "object"
        },
        "publish_from_name": {
          "type": "object"
        },
        "publish_text": {
          "type": "object"
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
        "draft_updated_at": {
          "type": "string"
        },
        "is_broken_template": {
          "type": "boolean"
        }
      },
      "required": [
        "slug",
        "name",
        "labels",
        "code",
        "subject",
        "from_email",
        "from_name",
        "text",
        "publish_name",
        "publish_code",
        "publish_subject",
        "publish_from_email",
        "publish_from_name",
        "publish_text",
        "published_at",
        "created_at",
        "updated_at",
        "draft_updated_at",
        "is_broken_template"
      ]
    },
    "TemplateContent": {
      "type": "object",
      "properties": {
        "name": {
          "type": "object"
        },
        "content": {
          "type": "object"
        }
      }
    },
    "TemplatesTemplateHistory": {
      "type": "object",
      "properties": {
        "time": {
          "type": "string"
        },
        "sent": {
          "type": "number"
        },
        "hard_bounces": {
          "type": "number"
        },
        "soft_bounces": {
          "type": "number"
        },
        "rejects": {
          "type": "number"
        },
        "complaints": {
          "type": "number"
        },
        "opens": {
          "type": "number"
        },
        "unique_opens": {
          "type": "number"
        },
        "clicks": {
          "type": "number"
        },
        "unique_clicks": {
          "type": "number"
        }
      },
      "required": [
        "time",
        "sent",
        "hard_bounces",
        "soft_bounces",
        "rejects",
        "complaints",
        "opens",
        "unique_opens",
        "clicks",
        "unique_clicks"
      ]
    },
    "TemplatesTimeSeriesRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "TemplatesTimeSeriesResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "TemplatesTemplateHistory"
      }
    },
    "TemplatesUpdateRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "TemplatesUpdateResponse": {
      "type": "ref",
      "ref": "TemplatesTemplate"
    },
    "UrlsAddTrackingDomainRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "UrlsAddTrackingDomainResponse": {
      "type": "ref",
      "ref": "TrackingDomain"
    },
    "UrlsCheckTrackingDomainRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "UrlsCheckTrackingDomainResponse": {
      "type": "ref",
      "ref": "TrackingDomain"
    },
    "UrlsDeleteTrackingDomainRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "UrlsDeleteTrackingDomainResponse": {
      "type": "ref",
      "ref": "TrackingDomain"
    },
    "TrackingDomain": {
      "type": "object",
      "properties": {
        "domain": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "last_tested_at": {
          "type": "string"
        },
        "cname": {
          "type": "object",
          "properties": {
            "valid": {
              "type": "boolean"
            },
            "valid_after": {
              "type": "object"
            },
            "error": {
              "type": "object"
            }
          },
          "required": [
            "valid",
            "valid_after",
            "error"
          ]
        },
        "valid_tracking": {
          "type": "boolean"
        }
      },
      "required": [
        "domain",
        "created_at",
        "last_tested_at",
        "cname",
        "valid_tracking"
      ]
    },
    "UrlsTrackingDomainsRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "UrlsTrackingDomainsResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "TrackingDomain"
      }
    },
    "UsersInfoRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "UsersInfoResponse": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "public_id": {
          "type": "string"
        },
        "reputation": {
          "type": "number"
        },
        "hourly_quota": {
          "type": "number"
        },
        "backlog": {
          "type": "number"
        },
        "stats": {
          "type": "object",
          "properties": {
            "today": {
              "type": "ref",
              "ref": "StatsWindow"
            },
            "last_7_days": {
              "type": "ref",
              "ref": "StatsWindow"
            },
            "last_30_days": {
              "type": "ref",
              "ref": "StatsWindow"
            },
            "last_60_days": {
              "type": "ref",
              "ref": "StatsWindow"
            },
            "last_90_days": {
              "type": "ref",
              "ref": "StatsWindow"
            },
            "all_time": {
              "type": "ref",
              "ref": "StatsWindow"
            }
          },
          "required": [
            "today",
            "last_7_days",
            "last_30_days",
            "last_60_days",
            "last_90_days",
            "all_time"
          ]
        }
      },
      "required": [
        "username",
        "created_at",
        "public_id",
        "reputation",
        "hourly_quota",
        "backlog",
        "stats"
      ]
    },
    "UsersPing2Request": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "UsersPing2Response": {
      "type": "object",
      "properties": {}
    },
    "UsersPingRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "UsersPingResponse": {
      "type": "string"
    },
    "UsersSendersRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "UsersSendersResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "Sender"
      }
    },
    "WebhooksAddRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "WebhooksAddResponse": {
      "type": "ref",
      "ref": "Webhook"
    },
    "WebhooksDeleteRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "WebhooksDeleteResponse": {
      "type": "ref",
      "ref": "Webhook"
    },
    "WebhooksInfoRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "WebhooksInfoResponse": {
      "type": "ref",
      "ref": "Webhook"
    },
    "WebhooksListRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "WebhooksListResponse": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "Webhook"
      }
    },
    "WebhooksUpdateRequest": {
      "type": "ref",
      "ref": "ApiKey"
    },
    "WebhooksUpdateResponse": {
      "type": "ref",
      "ref": "Webhook"
    },
    "Webhook": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "url": {
          "type": "string"
        },
        "auth_key": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "events": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "created_at": {
          "type": "string"
        },
        "last_sent_at": {
          "type": "object"
        },
        "batches_sent": {
          "type": "number"
        },
        "events_sent": {
          "type": "number"
        },
        "last_error": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "url",
        "created_at",
        "batches_sent",
        "events_sent",
        "events"
      ]
    }
  },
  "entities": {},
  "queries": {},
  "actions": {
    "allowlists/add": {
      "name": "Add email to allowlist",
      "schema": {
        "type": "ref",
        "ref": "AllowlistsAddResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AllowlistsAddRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/allowlists/add",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "allowlists/list": {
      "name": "List allowlist entries",
      "schema": {
        "type": "ref",
        "ref": "AllowlistsListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AllowlistsListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/allowlists/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "allowlists/delete": {
      "name": "Remove email from allowlist",
      "schema": {
        "type": "ref",
        "ref": "AllowlistsDeleteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AllowlistsDeleteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/allowlists/delete",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "exports/info": {
      "name": "Get export job information",
      "schema": {
        "type": "ref",
        "ref": "ExportsInfoResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ExportsInfoRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/exports/info",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "exports/list": {
      "name": "List export jobs",
      "schema": {
        "type": "ref",
        "ref": "ExportsListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ExportsListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/exports/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "exports/rejects": {
      "name": "Export rejection blacklist",
      "schema": {
        "type": "ref",
        "ref": "ExportsRejectsResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ExportsRejectsRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/exports/rejects",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "exports/whitelist": {
      "name": "Export rejection allowlist (legacy)",
      "schema": {
        "type": "ref",
        "ref": "ExportsWhitelistResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ExportsWhitelistRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/exports/whitelist",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "exports/allowlist": {
      "name": "Export rejection allowlist",
      "schema": {
        "type": "ref",
        "ref": "ExportsAllowlistResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ExportsAllowlistRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/exports/allowlist",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "exports/activity": {
      "name": "Export activity history",
      "schema": {
        "type": "ref",
        "ref": "ExportsActivityResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ExportsActivityRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/exports/activity",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ips/list": {
      "name": "List dedicated IPs",
      "schema": {
        "type": "ref",
        "ref": "IPsListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IPsListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ips/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ips/info": {
      "name": "Get dedicated IP information",
      "schema": {
        "type": "ref",
        "ref": "IPsInfoResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IPsInfoRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ips/info",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ips/provision": {
      "name": "Request dedicated IP provisioning",
      "schema": {
        "type": "ref",
        "ref": "IPsProvisionResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IPsProvisionRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ips/provision",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ips/start-warmup": {
      "name": "Start IP warmup process",
      "schema": {
        "type": "ref",
        "ref": "IPsStartWarmupResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IPsStartWarmupRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ips/start-warmup",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ips/cancel-warmup": {
      "name": "Cancel IP warmup process",
      "schema": {
        "type": "ref",
        "ref": "IPsCancelWarmupResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IPsCancelWarmupRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ips/cancel-warmup",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ips/set-pool": {
      "name": "Move IP to different pool",
      "schema": {
        "type": "ref",
        "ref": "IPsSetPoolResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IPsSetPoolRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ips/set-pool",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ips/delete": {
      "name": "Delete dedicated IP",
      "schema": {
        "type": "ref",
        "ref": "IPsDeleteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IPsDeleteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ips/delete",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ips/list-pools": {
      "name": "List dedicated IP pools",
      "schema": {
        "type": "ref",
        "ref": "IPsListPoolsResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IPsListPoolsRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ips/list-pools",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ips/pool-info": {
      "name": "Get pool information",
      "schema": {
        "type": "ref",
        "ref": "IPsPoolInfoResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IPsPoolInfoRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ips/pool-info",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ips/create-pool": {
      "name": "Create dedicated IP pool",
      "schema": {
        "type": "ref",
        "ref": "IPsCreatePoolResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IPsCreatePoolRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ips/create-pool",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ips/delete-pool": {
      "name": "Delete dedicated IP pool",
      "schema": {
        "type": "ref",
        "ref": "IPsDeletePoolResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IPsDeletePoolRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ips/delete-pool",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ips/check-custom-dns": {
      "name": "Test custom DNS configuration",
      "schema": {
        "type": "ref",
        "ref": "IPsCheckCustomDnsResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IPsCheckCustomDnsRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ips/check-custom-dns",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "ips/set-custom-dns": {
      "name": "Configure custom DNS for IP",
      "schema": {
        "type": "ref",
        "ref": "IPsSetCustomDnsResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IPsSetCustomDnsRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/ips/set-custom-dns",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "inbound/domains": {
      "name": "List inbound domains",
      "schema": {
        "type": "ref",
        "ref": "InboundDomainsResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InboundDomainsRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/inbound/domains",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "inbound/add-domain": {
      "name": "Add inbound domain",
      "schema": {
        "type": "ref",
        "ref": "InboundAddDomainResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InboundAddDomainRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/inbound/add-domain",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "inbound/check-domain": {
      "name": "Check domain settings",
      "schema": {
        "type": "ref",
        "ref": "InboundCheckDomainResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InboundCheckDomainRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/inbound/check-domain",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "inbound/delete-domain": {
      "name": "Delete inbound domain",
      "schema": {
        "type": "ref",
        "ref": "InboundDeleteDomainResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InboundDeleteDomainRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/inbound/delete-domain",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "inbound/routes": {
      "name": "List mailbox routes",
      "schema": {
        "type": "ref",
        "ref": "InboundRoutesResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InboundRoutesRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/inbound/routes",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "inbound/add-route": {
      "name": "Add mailbox route",
      "schema": {
        "type": "ref",
        "ref": "InboundAddRouteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InboundAddRouteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/inbound/add-route",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "inbound/update-route": {
      "name": "Update mailbox route",
      "schema": {
        "type": "ref",
        "ref": "InboundUpdateRouteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InboundUpdateRouteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/inbound/update-route",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "inbound/delete-route": {
      "name": "Delete mailbox route",
      "schema": {
        "type": "ref",
        "ref": "InboundDeleteRouteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InboundDeleteRouteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/inbound/delete-route",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "inbound/send-raw": {
      "name": "Send mime document",
      "schema": {
        "type": "ref",
        "ref": "InboundSendRawResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InboundSendRawRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/inbound/send-raw",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "mctemplates/info": {
      "name": "Get Mailchimp Transactional template information",
      "schema": {
        "type": "ref",
        "ref": "MctemplatesInfoResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MctemplatesInfoRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/mctemplates/info",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "mctemplates/list": {
      "name": "List Mailchimp Transactional templates",
      "schema": {
        "type": "ref",
        "ref": "MctemplatesListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MctemplatesListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/mctemplates/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "mctemplates/render": {
      "name": "Render a Mailchimp Transactional template",
      "schema": {
        "type": "ref",
        "ref": "MctemplatesRenderResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MctemplatesRenderRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/mctemplates/render",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "mctemplates/time-series": {
      "name": "Get Mailchimp Transactional template time series",
      "schema": {
        "type": "ref",
        "ref": "MctemplatesTimeSeriesResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MctemplatesTimeSeriesRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/mctemplates/time-series",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "messages/send": {
      "name": "Send a new transactional message through the Transactional API.",
      "schema": {
        "type": "ref",
        "ref": "MessagesSendResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessagesSendRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/messages/send",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "messages/send-template": {
      "name": "Send a new transactional message using a template",
      "schema": {
        "type": "ref",
        "ref": "MessagesSendTemplateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessagesSendTemplateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/messages/send-template",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "messages/send-mc-template": {
      "name": "Send using Mailchimp template",
      "schema": {
        "type": "ref",
        "ref": "MessagesSendMcTemplateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessagesSendMcTemplateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/messages/send-mc-template",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "messages/search": {
      "name": "Search recently sent messages",
      "schema": {
        "type": "ref",
        "ref": "MessagesSearchResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessagesSearchRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/messages/search",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "messages/search-time-series": {
      "name": "Get time series data for message search",
      "schema": {
        "type": "ref",
        "ref": "MessagesSearchTimeSeriesResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessagesSearchTimeSeriesRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/messages/search-time-series",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "messages/info": {
      "name": "Get information about a single sent message",
      "schema": {
        "type": "ref",
        "ref": "MessagesInfoResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessagesInfoRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/messages/info",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "messages/content": {
      "name": "Get the full content of a sent message",
      "schema": {
        "type": "ref",
        "ref": "MessagesContentResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessagesContentRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/messages/content",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "messages/parse": {
      "name": "Parse a MIME message",
      "schema": {
        "type": "ref",
        "ref": "MessagesParseResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessagesParseRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/messages/parse",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "messages/send-raw": {
      "name": "Send a raw MIME message through Mandrill",
      "schema": {
        "type": "ref",
        "ref": "MessagesSendRawResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessagesSendRawRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/messages/send-raw",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "messages/list-scheduled": {
      "name": "Get scheduled emails",
      "schema": {
        "type": "ref",
        "ref": "MessagesListScheduledResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessagesListScheduledRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/messages/list-scheduled",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "messages/cancel-scheduled": {
      "name": "Cancel a scheduled email",
      "schema": {
        "type": "ref",
        "ref": "MessagesCancelScheduledResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessagesCancelScheduledRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/messages/cancel-scheduled",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "messages/reschedule": {
      "name": "Reschedule a scheduled email",
      "schema": {
        "type": "ref",
        "ref": "MessagesRescheduleResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessagesRescheduleRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/messages/reschedule",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "messages/send-sms": {
      "name": "Send SMS message",
      "schema": {
        "type": "ref",
        "ref": "MessagesSendSmsResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MessagesSendSmsRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/messages/send-sms",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "metadata/list": {
      "name": "List custom metadata fields",
      "schema": {
        "type": "ref",
        "ref": "MetadataListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MetadataListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/metadata/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "metadata/add": {
      "name": "Add custom metadata field",
      "schema": {
        "type": "ref",
        "ref": "MetadataAddResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MetadataAddRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/metadata/add",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "metadata/update": {
      "name": "Update custom metadata field",
      "schema": {
        "type": "ref",
        "ref": "MetadataUpdateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MetadataUpdateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/metadata/update",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "metadata/delete": {
      "name": "Delete custom metadata field",
      "schema": {
        "type": "ref",
        "ref": "MetadataDeleteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "MetadataDeleteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/metadata/delete",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "rejects/add": {
      "name": "Add email to rejection blacklist",
      "schema": {
        "type": "ref",
        "ref": "RejectsAddResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "RejectsAddRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/rejects/add",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "rejects/add-sms": {
      "name": "Add phone number to SMS rejection denylist",
      "schema": {
        "type": "ref",
        "ref": "RejectsAddSmsResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "RejectsAddSmsRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/rejects/add-sms",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "rejects/list": {
      "name": "List rejection blacklist entries",
      "schema": {
        "type": "ref",
        "ref": "RejectsListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "RejectsListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/rejects/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "rejects/list-sms": {
      "name": "List SMS rejection denylist entries",
      "schema": {
        "type": "ref",
        "ref": "RejectsListSmsResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "RejectsListSmsRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/rejects/list-sms",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "rejects/delete": {
      "name": "Delete email from rejection blacklist",
      "schema": {
        "type": "ref",
        "ref": "RejectsDeleteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "RejectsDeleteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/rejects/delete",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "rejects/delete-sms": {
      "name": "Delete phone number from SMS rejection denylist",
      "schema": {
        "type": "ref",
        "ref": "RejectsDeleteSmsResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "RejectsDeleteSmsRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/rejects/delete-sms",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "senders/list": {
      "name": "List senders used by this account",
      "schema": {
        "type": "ref",
        "ref": "SendersListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SendersListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/senders/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "senders/domains": {
      "name": "List sender domains",
      "schema": {
        "type": "ref",
        "ref": "SendersDomainsResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SendersDomainsRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/senders/domains",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "senders/add-domain": {
      "name": "Add a sender domain",
      "schema": {
        "type": "ref",
        "ref": "SendersAddDomainResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SendersAddDomainRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/senders/add-domain",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "senders/check-domain": {
      "name": "Check domain SPF and DKIM",
      "schema": {
        "type": "ref",
        "ref": "SendersCheckDomainResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SendersCheckDomainRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/senders/check-domain",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "senders/verify-domain": {
      "name": "Verify a sender domain by email",
      "schema": {
        "type": "ref",
        "ref": "SendersVerifyDomainResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SendersVerifyDomainRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/senders/verify-domain",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "senders/info": {
      "name": "Get detailed information for a sender",
      "schema": {
        "type": "ref",
        "ref": "SendersInfoResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SendersInfoRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/senders/info",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "senders/time-series": {
      "name": "Get hourly stats for a sender",
      "schema": {
        "type": "ref",
        "ref": "SendersTimeSeriesResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SendersTimeSeriesRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/senders/time-series",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "senders/delete-domain": {
      "name": "Delete a sender domain",
      "schema": {
        "type": "ref",
        "ref": "SendersDeleteDomainResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SendersDeleteDomainRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/senders/delete-domain",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "subaccounts/list": {
      "name": "List subaccounts",
      "schema": {
        "type": "ref",
        "ref": "SubaccountsListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SubaccountsListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/subaccounts/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "subaccounts/add": {
      "name": "Add a new subaccount",
      "schema": {
        "type": "ref",
        "ref": "SubaccountsAddResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SubaccountsAddRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/subaccounts/add",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "subaccounts/info": {
      "name": "Get subaccount information",
      "schema": {
        "type": "ref",
        "ref": "SubaccountsInfoResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SubaccountsInfoRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/subaccounts/info",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "subaccounts/update": {
      "name": "Update an existing subaccount",
      "schema": {
        "type": "ref",
        "ref": "SubaccountsUpdateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SubaccountsUpdateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/subaccounts/update",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "subaccounts/delete": {
      "name": "Delete a subaccount",
      "schema": {
        "type": "ref",
        "ref": "SubaccountsDeleteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SubaccountsDeleteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/subaccounts/delete",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "subaccounts/pause": {
      "name": "Pause a subaccount",
      "schema": {
        "type": "ref",
        "ref": "SubaccountsPauseResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SubaccountsPauseRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/subaccounts/pause",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "subaccounts/resume": {
      "name": "Resume a paused subaccount",
      "schema": {
        "type": "ref",
        "ref": "SubaccountsResumeResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SubaccountsResumeRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/subaccounts/resume",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "tags/list": {
      "name": "List all user-defined tags",
      "schema": {
        "type": "ref",
        "ref": "TagsListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TagsListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tags/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "tags/delete": {
      "name": "Delete a tag permanently",
      "schema": {
        "type": "ref",
        "ref": "TagsDeleteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TagsDeleteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tags/delete",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "tags/info": {
      "name": "Get detailed information about a tag",
      "schema": {
        "type": "ref",
        "ref": "TagsInfoResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TagsInfoRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tags/info",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "tags/time-series": {
      "name": "Get time series data for a specific tag",
      "schema": {
        "type": "ref",
        "ref": "TagsTimeSeriesResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TagsTimeSeriesRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tags/time-series",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "tags/all-time-series": {
      "name": "Get time series data for all tags",
      "schema": {
        "type": "ref",
        "ref": "TagsAllTimeSeriesResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TagsAllTimeSeriesRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tags/all-time-series",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "templates/add": {
      "name": "Add a new template",
      "schema": {
        "type": "ref",
        "ref": "TemplatesAddResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TemplatesAddRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/templates/add",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "templates/info": {
      "name": "Get template information",
      "schema": {
        "type": "ref",
        "ref": "TemplatesInfoResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TemplatesInfoRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/templates/info",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "templates/update": {
      "name": "Update an existing template",
      "schema": {
        "type": "ref",
        "ref": "TemplatesUpdateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TemplatesUpdateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/templates/update",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "templates/publish": {
      "name": "Publish a template",
      "schema": {
        "type": "ref",
        "ref": "TemplatesPublishResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TemplatesPublishRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/templates/publish",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "templates/delete": {
      "name": "Delete a template",
      "schema": {
        "type": "ref",
        "ref": "TemplatesDeleteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TemplatesDeleteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/templates/delete",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "templates/list": {
      "name": "List all templates",
      "schema": {
        "type": "ref",
        "ref": "TemplatesListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TemplatesListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/templates/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "templates/time-series": {
      "name": "Get template time series data",
      "schema": {
        "type": "ref",
        "ref": "TemplatesTimeSeriesResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TemplatesTimeSeriesRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/templates/time-series",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "templates/render": {
      "name": "Render a template",
      "schema": {
        "type": "ref",
        "ref": "TemplatesRenderResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TemplatesRenderRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/templates/render",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "urls/tracking-domains": {
      "name": "Get tracking domains",
      "schema": {
        "type": "ref",
        "ref": "UrlsTrackingDomainsResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UrlsTrackingDomainsRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/urls/tracking-domains",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "urls/add-tracking-domain": {
      "name": "Add tracking domain",
      "schema": {
        "type": "ref",
        "ref": "UrlsAddTrackingDomainResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UrlsAddTrackingDomainRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/urls/add-tracking-domain",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "urls/check-tracking-domain": {
      "name": "Check tracking domain",
      "schema": {
        "type": "ref",
        "ref": "UrlsCheckTrackingDomainResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UrlsCheckTrackingDomainRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/urls/check-tracking-domain",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "urls/delete-tracking-domain": {
      "name": "Delete a tracking domain",
      "schema": {
        "type": "ref",
        "ref": "UrlsDeleteTrackingDomainResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UrlsDeleteTrackingDomainRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/urls/delete-tracking-domain",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "users/info": {
      "name": "Return the information about the API-connected user",
      "schema": {
        "type": "ref",
        "ref": "UsersInfoResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UsersInfoRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/users/info",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "users/ping": {
      "name": "Validate an API key and respond to a ping",
      "schema": {
        "type": "ref",
        "ref": "UsersPingResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UsersPingRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/users/ping",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "users/ping2": {
      "name": "Validate an API key and respond to a ping (strict JSON parser version)",
      "schema": {
        "type": "ref",
        "ref": "UsersPing2Response"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UsersPing2Request"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/users/ping2",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "users/senders": {
      "name": "Return the senders that have tried to use this account",
      "schema": {
        "type": "ref",
        "ref": "UsersSendersResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UsersSendersRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/users/senders",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "webhooks/list": {
      "name": "Get the list of all webhooks",
      "schema": {
        "type": "ref",
        "ref": "WebhooksListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WebhooksListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/webhooks/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "webhooks/add": {
      "name": "Add a new webhook",
      "schema": {
        "type": "ref",
        "ref": "WebhooksAddResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WebhooksAddRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/webhooks/add",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "webhooks/info": {
      "name": "Get webhook information",
      "schema": {
        "type": "ref",
        "ref": "WebhooksInfoResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WebhooksInfoRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/webhooks/info",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "webhooks/update": {
      "name": "Update an existing webhook",
      "schema": {
        "type": "ref",
        "ref": "WebhooksUpdateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WebhooksUpdateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/webhooks/update",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "webhooks/delete": {
      "name": "Delete an existing webhook",
      "schema": {
        "type": "ref",
        "ref": "WebhooksDeleteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WebhooksDeleteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/webhooks/delete",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    }
  }
};

export default spec;
