import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "twilio",
  "type": "http",
  "connection": {
    "provider": "twilio",
    "baseUrl": "https://accounts.twilio.com"
  },
  "schemas": {
    "accounts.v1.auth_token_promotion": {
      "type": "object",
      "properties": {
        "account_sid": {
          "type": "string"
        },
        "auth_token": {
          "type": "string"
        },
        "date_created": {
          "type": "string"
        },
        "date_updated": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      }
    },
    "accounts.v1.bulk_consents": {
      "type": "object",
      "properties": {
        "items": {
          "type": "object",
          "properties": {}
        }
      }
    },
    "accounts.v1.bulk_contacts": {
      "type": "object",
      "properties": {
        "items": {
          "type": "object",
          "properties": {}
        }
      }
    },
    "accounts.v1.credential": {
      "type": "object",
      "properties": {}
    },
    "accounts.v1.credential.credential_aws": {
      "type": "object",
      "properties": {
        "sid": {
          "type": "string"
        },
        "account_sid": {
          "type": "string"
        },
        "friendly_name": {
          "type": "string"
        },
        "date_created": {
          "type": "string"
        },
        "date_updated": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      }
    },
    "accounts.v1.credential.credential_public_key": {
      "type": "object",
      "properties": {
        "sid": {
          "type": "string"
        },
        "account_sid": {
          "type": "string"
        },
        "friendly_name": {
          "type": "string"
        },
        "date_created": {
          "type": "string"
        },
        "date_updated": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      }
    },
    "accounts.v1.messaging_geopermissions": {
      "type": "object",
      "properties": {
        "permissions": {
          "type": "object",
          "properties": {}
        }
      }
    },
    "accounts.v1.safelist": {
      "type": "object",
      "properties": {
        "sid": {
          "type": "string"
        },
        "phone_number": {
          "type": "string"
        }
      }
    },
    "accounts.v1.secondary_auth_token": {
      "type": "object",
      "properties": {
        "account_sid": {
          "type": "string"
        },
        "date_created": {
          "type": "string"
        },
        "date_updated": {
          "type": "string"
        },
        "secondary_auth_token": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      }
    }
  },
  "entities": {},
  "queries": {
    "ListCredentialAws": {
      "name": "Retrieves a collection of AWS Credentials belonging to the account used to make the request",
      "schema": {
        "type": "object",
        "properties": {
          "credentials": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "accounts.v1.credential.credential_aws"
            }
          },
          "meta": {
            "type": "object",
            "properties": {
              "first_page_url": {
                "type": "string"
              },
              "key": {
                "type": "string"
              },
              "next_page_url": {
                "type": "string"
              },
              "page": {
                "type": "number"
              },
              "page_size": {
                "type": "number"
              },
              "previous_page_url": {
                "type": "string"
              },
              "url": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "PageSize": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "Page": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "PageToken": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/Credentials/AWS",
          "query": {
            "PageSize": {
              "$resolve": "args.PageSize"
            },
            "Page": {
              "$resolve": "args.Page"
            },
            "PageToken": {
              "$resolve": "args.PageToken"
            }
          }
        }
      }
    },
    "FetchCredentialAws": {
      "name": "Fetch the AWS credentials specified by the provided Credential Sid",
      "schema": {
        "type": "ref",
        "ref": "accounts.v1.credential.credential_aws"
      },
      "args": {
        "Sid": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/Credentials/AWS/{Sid}",
          "params": {
            "Sid": {
              "$resolve": "args.Sid"
            }
          }
        }
      }
    },
    "ListCredentialPublicKey": {
      "name": "Retrieves a collection of Public Key Credentials belonging to the account used to make the request",
      "schema": {
        "type": "object",
        "properties": {
          "credentials": {
            "type": "array",
            "items": {
              "type": "ref",
              "ref": "accounts.v1.credential.credential_public_key"
            }
          },
          "meta": {
            "type": "object",
            "properties": {
              "first_page_url": {
                "type": "string"
              },
              "key": {
                "type": "string"
              },
              "next_page_url": {
                "type": "string"
              },
              "page": {
                "type": "number"
              },
              "page_size": {
                "type": "number"
              },
              "previous_page_url": {
                "type": "string"
              },
              "url": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "PageSize": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "Page": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "PageToken": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/Credentials/PublicKeys",
          "query": {
            "PageSize": {
              "$resolve": "args.PageSize"
            },
            "Page": {
              "$resolve": "args.Page"
            },
            "PageToken": {
              "$resolve": "args.PageToken"
            }
          }
        }
      }
    },
    "FetchCredentialPublicKey": {
      "name": "Fetch the public key specified by the provided Credential Sid",
      "schema": {
        "type": "ref",
        "ref": "accounts.v1.credential.credential_public_key"
      },
      "args": {
        "Sid": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/Credentials/PublicKeys/{Sid}",
          "params": {
            "Sid": {
              "$resolve": "args.Sid"
            }
          }
        }
      }
    },
    "FetchMessagingGeopermissions": {
      "name": "FetchMessagingGeopermissions",
      "schema": {
        "type": "ref",
        "ref": "accounts.v1.messaging_geopermissions"
      },
      "args": {
        "CountryCode": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/Messaging/GeoPermissions",
          "query": {
            "CountryCode": {
              "$resolve": "args.CountryCode"
            }
          }
        }
      }
    },
    "FetchSafelist": {
      "name": "Check if a phone number or phone number 1k prefix exists in SafeList.",
      "schema": {
        "type": "ref",
        "ref": "accounts.v1.safelist"
      },
      "args": {
        "PhoneNumber": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/SafeList/Numbers",
          "query": {
            "PhoneNumber": {
              "$resolve": "args.PhoneNumber"
            }
          }
        }
      }
    }
  },
  "actions": {
    "UpdateAuthTokenPromotion": {
      "name": "Promote the secondary Auth Token to primary. After promoting the new token, all requests to Twilio using your old primary Auth Token will result in an error.",
      "schema": {
        "type": "ref",
        "ref": "accounts.v1.auth_token_promotion"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/AuthTokens/Promote"
        }
      }
    },
    "CreateBulkConsents": {
      "name": "CreateBulkConsents",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/Consents/Bulk"
        }
      }
    },
    "CreateBulkContacts": {
      "name": "CreateBulkContacts",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/Contacts/Bulk"
        }
      }
    },
    "CreateCredentialAws": {
      "name": "Create a new AWS Credential",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/Credentials/AWS"
        }
      }
    },
    "UpdateCredentialAws": {
      "name": "Modify the properties of a given Account",
      "schema": {
        "type": "ref",
        "ref": "accounts.v1.credential.credential_aws"
      },
      "args": {
        "Sid": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/Credentials/AWS/{Sid}",
          "params": {
            "Sid": {
              "$resolve": "args.Sid"
            }
          }
        }
      }
    },
    "DeleteCredentialAws": {
      "name": "Delete a Credential from your account",
      "schema": {
        "type": "object"
      },
      "args": {
        "Sid": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v1/Credentials/AWS/{Sid}",
          "params": {
            "Sid": {
              "$resolve": "args.Sid"
            }
          }
        }
      }
    },
    "CreateCredentialPublicKey": {
      "name": "Create a new Public Key Credential",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/Credentials/PublicKeys"
        }
      }
    },
    "UpdateCredentialPublicKey": {
      "name": "Modify the properties of a given Account",
      "schema": {
        "type": "ref",
        "ref": "accounts.v1.credential.credential_public_key"
      },
      "args": {
        "Sid": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/Credentials/PublicKeys/{Sid}",
          "params": {
            "Sid": {
              "$resolve": "args.Sid"
            }
          }
        }
      }
    },
    "DeleteCredentialPublicKey": {
      "name": "Delete a Credential from your account",
      "schema": {
        "type": "object"
      },
      "args": {
        "Sid": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v1/Credentials/PublicKeys/{Sid}",
          "params": {
            "Sid": {
              "$resolve": "args.Sid"
            }
          }
        }
      }
    },
    "UpdateMessagingGeopermissions": {
      "name": "UpdateMessagingGeopermissions",
      "schema": {
        "type": "ref",
        "ref": "accounts.v1.messaging_geopermissions"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v1/Messaging/GeoPermissions"
        }
      }
    },
    "CreateSafelist": {
      "name": "Add a new phone number or phone number 1k prefix to SafeList.",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/SafeList/Numbers"
        }
      }
    },
    "DeleteSafelist": {
      "name": "Remove a phone number or phone number 1k prefix from SafeList.",
      "schema": {
        "type": "object"
      },
      "args": {
        "PhoneNumber": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v1/SafeList/Numbers",
          "query": {
            "PhoneNumber": {
              "$resolve": "args.PhoneNumber"
            }
          }
        }
      }
    },
    "CreateSecondaryAuthToken": {
      "name": "Create a new secondary Auth Token",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/AuthTokens/Secondary"
        }
      }
    },
    "DeleteSecondaryAuthToken": {
      "name": "Delete the secondary Auth Token from your account",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v1/AuthTokens/Secondary"
        }
      }
    }
  }
};

export default spec;
