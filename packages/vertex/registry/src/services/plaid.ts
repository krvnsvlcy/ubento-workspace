import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "plaid",
  "type": "http",
  "connection": {
    "provider": "plaid",
    "baseUrl": "https://production.plaid.com"
  },
  "schemas": {
    "ACHClass": {
      "type": "string"
    },
    "APIClientID": {
      "type": "string"
    },
    "APISecret": {
      "type": "string"
    },
    "APR": {
      "type": "object",
      "properties": {
        "apr_percentage": {
          "type": "number"
        },
        "apr_type": {
          "type": "string"
        },
        "balance_subject_to_apr": {
          "type": "number"
        },
        "interest_charge_amount": {
          "type": "number"
        }
      },
      "required": [
        "apr_percentage",
        "apr_type",
        "balance_subject_to_apr",
        "interest_charge_amount"
      ]
    },
    "AccessToken": {
      "type": "string"
    },
    "AccessTokenNullable": {
      "type": "string"
    },
    "AccountAccess": {
      "type": "object",
      "properties": {
        "account_product_access": {
          "type": "ref",
          "ref": "AccountProductAccessNullable"
        },
        "authorized": {
          "type": "boolean"
        },
        "unique_id": {
          "type": "string"
        }
      },
      "required": [
        "unique_id"
      ]
    },
    "AccountAssets": {
      "type": "ref",
      "ref": "AccountBase"
    },
    "AccountBalance": {
      "type": "object",
      "properties": {
        "available": {
          "type": "number"
        },
        "current": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "last_updated_datetime": {
          "type": "string"
        },
        "limit": {
          "type": "number"
        },
        "unofficial_currency_code": {
          "type": "string"
        }
      },
      "required": [
        "available",
        "current",
        "limit",
        "iso_currency_code",
        "unofficial_currency_code"
      ]
    },
    "AccountBase": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "balances": {
          "type": "ref",
          "ref": "AccountBalance"
        },
        "mask": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "official_name": {
          "type": "string"
        },
        "persistent_account_id": {
          "type": "string"
        },
        "subtype": {
          "type": "ref",
          "ref": "AccountSubtype"
        },
        "type": {
          "type": "ref",
          "ref": "AccountType"
        },
        "verification_status": {
          "type": "string"
        }
      },
      "required": [
        "account_id",
        "balances",
        "mask",
        "name",
        "official_name",
        "type",
        "subtype"
      ]
    },
    "AccountFilter": {
      "type": "object",
      "properties": {
        "credit": {
          "type": "ref",
          "ref": "AccountFilterSubtypes"
        },
        "depository": {
          "type": "ref",
          "ref": "AccountFilterSubtypes"
        },
        "investment": {
          "type": "ref",
          "ref": "AccountFilterSubtypes"
        },
        "loan": {
          "type": "ref",
          "ref": "AccountFilterSubtypes"
        }
      }
    },
    "AccountFilterSubtypes": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "AccountFiltersResponse": {
      "type": "object",
      "properties": {
        "credit": {
          "type": "ref",
          "ref": "CreditFilter"
        },
        "depository": {
          "type": "ref",
          "ref": "DepositoryFilter"
        },
        "investment": {
          "type": "ref",
          "ref": "InvestmentFilter"
        },
        "loan": {
          "type": "ref",
          "ref": "LoanFilter"
        }
      }
    },
    "AccountIdentity": {
      "type": "ref",
      "ref": "AccountBase"
    },
    "AccountIdentityMatchScore": {
      "type": "ref",
      "ref": "AccountBase"
    },
    "AccountIdsWithUpdatedIdentity": {
      "type": "object",
      "properties": {}
    },
    "AccountProductAccess": {
      "type": "object",
      "properties": {
        "account_data": {
          "type": "boolean"
        },
        "statements": {
          "type": "boolean"
        },
        "tax_documents": {
          "type": "boolean"
        }
      }
    },
    "AccountProductAccessNullable": {
      "type": "ref",
      "ref": "AccountProductAccess"
    },
    "AccountSelectionCardinality": {
      "type": "string"
    },
    "AccountSubtype": {
      "type": "string"
    },
    "AccountSubtypes": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "AccountSubtype"
      }
    },
    "AccountType": {
      "type": "string"
    },
    "AccountsBalanceGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "AccountsBalanceGetRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "AccountsBalanceGetRequestOptions": {
      "type": "object",
      "properties": {
        "account_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "min_last_updated_datetime": {
          "type": "ref",
          "ref": "MinLastUpdatedDatetime"
        }
      }
    },
    "AccountsGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "AccountsGetRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "AccountsGetRequestOptions": {
      "type": "object",
      "properties": {
        "account_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "AccountsGetResponse": {
      "type": "object",
      "properties": {
        "accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountBase"
          }
        },
        "item": {
          "type": "ref",
          "ref": "Item"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "accounts",
        "item",
        "request_id"
      ]
    },
    "ActionState": {
      "type": "string"
    },
    "Activity": {
      "type": "object",
      "properties": {
        "activity": {
          "type": "ref",
          "ref": "ActivityType"
        },
        "id": {
          "type": "string"
        },
        "initiated_date": {
          "type": "string"
        },
        "initiator": {
          "type": "string"
        },
        "scopes": {
          "type": "ref",
          "ref": "ScopesNullable"
        },
        "state": {
          "type": "ref",
          "ref": "ActionState"
        },
        "target_application_id": {
          "type": "ref",
          "ref": "ApplicationID"
        }
      },
      "required": [
        "activity",
        "initiated_date",
        "id",
        "initiator",
        "state"
      ]
    },
    "ActivityType": {
      "type": "string"
    },
    "Address": {
      "type": "object",
      "properties": {
        "data": {
          "type": "ref",
          "ref": "AddressData"
        },
        "primary": {
          "type": "boolean"
        }
      },
      "required": [
        "data"
      ]
    },
    "AddressData": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "street": {
          "type": "string"
        }
      },
      "required": [
        "city",
        "region",
        "street",
        "postal_code",
        "country"
      ]
    },
    "AddressDataNullable": {
      "type": "ref",
      "ref": "AddressData"
    },
    "AddressMatchScore": {
      "type": "object",
      "properties": {
        "is_postal_code_match": {
          "type": "boolean"
        },
        "score": {
          "type": "number"
        }
      }
    },
    "AddressNullable": {
      "type": "ref",
      "ref": "Address"
    },
    "AddressPurposeLabel": {
      "type": "string"
    },
    "Application": {
      "type": "object",
      "properties": {
        "application_id": {
          "type": "ref",
          "ref": "ApplicationID"
        },
        "application_url": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "company_legal_name": {
          "type": "string"
        },
        "country_code": {
          "type": "string"
        },
        "display_name": {
          "type": "string"
        },
        "join_date": {
          "type": "string"
        },
        "logo_url": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "reason_for_access": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "use_case": {
          "type": "string"
        }
      },
      "required": [
        "application_id",
        "join_date",
        "name",
        "display_name",
        "logo_url",
        "application_url",
        "reason_for_access",
        "use_case",
        "company_legal_name",
        "city",
        "region",
        "postal_code",
        "country_code"
      ]
    },
    "ApplicationGetRequest": {
      "type": "object",
      "properties": {
        "application_id": {
          "type": "ref",
          "ref": "ApplicationID"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "client_id",
        "secret",
        "application_id"
      ]
    },
    "ApplicationGetResponse": {
      "type": "object",
      "properties": {
        "application": {
          "type": "ref",
          "ref": "Application"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id",
        "application"
      ]
    },
    "ApplicationID": {
      "type": "string"
    },
    "Asset": {
      "type": "object",
      "properties": {
        "ASSET_DETAIL": {
          "type": "ref",
          "ref": "AssetDetail"
        },
        "ASSET_HOLDER": {
          "type": "ref",
          "ref": "AssetHolder"
        },
        "ASSET_OWNERS": {
          "type": "ref",
          "ref": "AssetOwners"
        },
        "ASSET_TRANSACTIONS": {
          "type": "ref",
          "ref": "AssetTransactions"
        },
        "VALIDATION_SOURCES": {
          "type": "ref",
          "ref": "ValidationSources"
        }
      },
      "required": [
        "ASSET_DETAIL",
        "ASSET_OWNERS",
        "ASSET_HOLDER",
        "ASSET_TRANSACTIONS",
        "VALIDATION_SOURCES"
      ]
    },
    "AssetDetail": {
      "type": "object",
      "properties": {
        "AssetAccountIdentifier": {
          "type": "string"
        },
        "AssetAsOfDate": {
          "type": "string"
        },
        "AssetAvailableBalanceAmount": {
          "type": "number"
        },
        "AssetCurrentBalanceAmount": {
          "type": "number"
        },
        "AssetDaysRequestedCount": {
          "type": "number"
        },
        "AssetDescription": {
          "type": "string"
        },
        "AssetOwnershipType": {
          "type": "string"
        },
        "AssetType": {
          "type": "ref",
          "ref": "AssetType"
        },
        "AssetTypeAdditionalDescription": {
          "type": "string"
        },
        "AssetUniqueIdentifier": {
          "type": "string"
        }
      },
      "required": [
        "AssetUniqueIdentifier",
        "AssetAccountIdentifier",
        "AssetAsOfDate",
        "AssetDescription",
        "AssetAvailableBalanceAmount",
        "AssetCurrentBalanceAmount",
        "AssetType",
        "AssetTypeAdditionalDescription",
        "AssetDaysRequestedCount",
        "AssetOwnershipType"
      ]
    },
    "AssetHolder": {
      "type": "object",
      "properties": {
        "NAME": {
          "type": "ref",
          "ref": "AssetHolderName"
        }
      },
      "required": [
        "NAME"
      ]
    },
    "AssetHolderName": {
      "type": "object",
      "properties": {
        "FullName": {
          "type": "string"
        }
      },
      "required": [
        "FullName"
      ]
    },
    "AssetOwner": {
      "type": "object",
      "properties": {
        "AssetOwnerText": {
          "type": "string"
        }
      },
      "required": [
        "AssetOwnerText"
      ]
    },
    "AssetOwners": {
      "type": "object",
      "properties": {
        "ASSET_OWNER": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AssetOwner"
          }
        }
      },
      "required": [
        "ASSET_OWNER"
      ]
    },
    "AssetReport": {
      "type": "object",
      "properties": {
        "asset_report_id": {
          "type": "ref",
          "ref": "AssetReportId"
        },
        "client_report_id": {
          "type": "string"
        },
        "date_generated": {
          "type": "string"
        },
        "days_requested": {
          "type": "number"
        },
        "items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AssetReportItem"
          }
        },
        "user": {
          "type": "ref",
          "ref": "AssetReportUser"
        }
      },
      "required": [
        "asset_report_id",
        "client_report_id",
        "date_generated",
        "days_requested",
        "user",
        "items"
      ]
    },
    "AssetReportAddOns": {
      "type": "string"
    },
    "AssetReportAuditCopyCreateRequest": {
      "type": "object",
      "properties": {
        "asset_report_token": {
          "type": "ref",
          "ref": "AssetReportToken"
        },
        "auditor_id": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "asset_report_token"
      ]
    },
    "AssetReportAuditCopyCreateResponse": {
      "type": "object",
      "properties": {
        "audit_copy_token": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "audit_copy_token",
        "request_id"
      ]
    },
    "AssetReportAuditCopyGetRequest": {
      "type": "object",
      "properties": {
        "audit_copy_token": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "audit_copy_token"
      ]
    },
    "AssetReportAuditCopyRemoveRequest": {
      "type": "object",
      "properties": {
        "audit_copy_token": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "audit_copy_token"
      ]
    },
    "AssetReportAuditCopyRemoveResponse": {
      "type": "object",
      "properties": {
        "removed": {
          "type": "boolean"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "removed",
        "request_id"
      ]
    },
    "AssetReportCreateRequest": {
      "type": "object",
      "properties": {
        "access_tokens": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccessToken"
          }
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "days_requested": {
          "type": "number"
        },
        "options": {
          "type": "ref",
          "ref": "AssetReportCreateRequestOptions"
        },
        "report_type": {
          "type": "ref",
          "ref": "FreddieReportType"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_tokens",
        "days_requested"
      ]
    },
    "AssetReportCreateRequestOptions": {
      "type": "object",
      "properties": {
        "add_ons": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AssetReportAddOns"
          }
        },
        "client_report_id": {
          "type": "string"
        },
        "include_fast_report": {
          "type": "boolean"
        },
        "products": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "user": {
          "type": "ref",
          "ref": "AssetReportUser"
        },
        "webhook": {
          "type": "string"
        }
      }
    },
    "AssetReportCreateResponse": {
      "type": "object",
      "properties": {
        "asset_report_id": {
          "type": "ref",
          "ref": "AssetReportId"
        },
        "asset_report_token": {
          "type": "ref",
          "ref": "AssetReportToken"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "asset_report_token",
        "asset_report_id",
        "request_id"
      ]
    },
    "AssetReportFilterRequest": {
      "type": "object",
      "properties": {
        "account_ids_to_exclude": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "asset_report_token": {
          "type": "ref",
          "ref": "AssetReportToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "asset_report_token",
        "account_ids_to_exclude"
      ]
    },
    "AssetReportFilterResponse": {
      "type": "object",
      "properties": {
        "asset_report_id": {
          "type": "ref",
          "ref": "AssetReportId"
        },
        "asset_report_token": {
          "type": "ref",
          "ref": "AssetReportToken"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "asset_report_token",
        "asset_report_id",
        "request_id"
      ]
    },
    "AssetReportFreddie": {
      "type": "object",
      "properties": {
        "LOANS": {
          "type": "ref",
          "ref": "Loans"
        },
        "PARTIES": {
          "type": "ref",
          "ref": "Parties"
        },
        "SERVICES": {
          "type": "ref",
          "ref": "Services"
        }
      },
      "required": [
        "LOANS",
        "PARTIES",
        "SERVICES"
      ]
    },
    "AssetReportFreddieGetRequest": {
      "type": "object",
      "properties": {
        "audit_copy_token": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "audit_copy_token"
      ]
    },
    "AssetReportFreddieGetResponse": {
      "type": "object",
      "properties": {
        "DEAL": {
          "type": "ref",
          "ref": "AssetReportFreddie"
        },
        "SchemaVersion": {
          "type": "number"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "DEAL",
        "request_id",
        "SchemaVersion"
      ]
    },
    "AssetReportGetRequest": {
      "type": "object",
      "properties": {
        "asset_report_token": {
          "type": "ref",
          "ref": "AssetReportToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "fast_report": {
          "type": "boolean"
        },
        "include_insights": {
          "type": "boolean"
        },
        "options": {
          "type": "ref",
          "ref": "AssetReportGetRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "asset_report_token"
      ]
    },
    "AssetReportGetRequestOptions": {
      "type": "object",
      "properties": {
        "days_to_include": {
          "type": "number"
        }
      }
    },
    "AssetReportGetResponse": {
      "type": "object",
      "properties": {
        "report": {
          "type": "ref",
          "ref": "AssetReport"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "warnings": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Warning"
          }
        }
      },
      "required": [
        "report",
        "warnings",
        "request_id"
      ]
    },
    "AssetReportId": {
      "type": "string"
    },
    "AssetReportItem": {
      "type": "object",
      "properties": {
        "accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountAssets"
          }
        },
        "date_last_updated": {
          "type": "string"
        },
        "institution_id": {
          "type": "string"
        },
        "institution_name": {
          "type": "string"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        }
      },
      "required": [
        "item_id",
        "institution_name",
        "institution_id",
        "date_last_updated",
        "accounts"
      ]
    },
    "AssetReportPDFGetRequest": {
      "type": "object",
      "properties": {
        "asset_report_token": {
          "type": "ref",
          "ref": "AssetReportToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "AssetReportPDFGetRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "asset_report_token"
      ]
    },
    "AssetReportPDFGetRequestOptions": {
      "type": "object",
      "properties": {
        "days_to_include": {
          "type": "number"
        }
      }
    },
    "AssetReportPDFGetResponse": {
      "type": "string"
    },
    "AssetReportRefreshAssetReportToken": {
      "type": "string"
    },
    "AssetReportRefreshRequest": {
      "type": "object",
      "properties": {
        "asset_report_token": {
          "type": "ref",
          "ref": "AssetReportRefreshAssetReportToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "days_requested": {
          "type": "number"
        },
        "options": {
          "type": "ref",
          "ref": "AssetReportRefreshRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "asset_report_token"
      ]
    },
    "AssetReportRefreshRequestOptions": {
      "type": "object",
      "properties": {
        "client_report_id": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "AssetReportUser"
        },
        "webhook": {
          "type": "string"
        }
      }
    },
    "AssetReportRefreshResponse": {
      "type": "object",
      "properties": {
        "asset_report_id": {
          "type": "ref",
          "ref": "AssetReportId"
        },
        "asset_report_token": {
          "type": "ref",
          "ref": "AssetReportToken"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "asset_report_id",
        "asset_report_token",
        "request_id"
      ]
    },
    "AssetReportRemoveRequest": {
      "type": "object",
      "properties": {
        "asset_report_token": {
          "type": "ref",
          "ref": "AssetReportToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "asset_report_token"
      ]
    },
    "AssetReportRemoveResponse": {
      "type": "object",
      "properties": {
        "removed": {
          "type": "boolean"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "removed",
        "request_id"
      ]
    },
    "AssetReportToken": {
      "type": "string"
    },
    "AssetReportTransaction": {
      "type": "ref",
      "ref": "TransactionBase"
    },
    "AssetReportUser": {
      "type": "object",
      "properties": {
        "client_user_id": {
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
        "middle_name": {
          "type": "string"
        },
        "phone_number": {
          "type": "string"
        },
        "ssn": {
          "type": "string"
        }
      }
    },
    "AssetTransaction": {
      "type": "object",
      "properties": {
        "ASSET_TRANSACTION_DESCRIPTON": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AssetTransactionDescription"
          }
        },
        "ASSET_TRANSACTION_DETAIL": {
          "type": "ref",
          "ref": "AssetTransactionDetail"
        }
      },
      "required": [
        "ASSET_TRANSACTION_DETAIL",
        "ASSET_TRANSACTION_DESCRIPTON"
      ]
    },
    "AssetTransactionCategoryType": {
      "type": "string"
    },
    "AssetTransactionDescription": {
      "type": "object",
      "properties": {
        "AssetTransactionDescription": {
          "type": "string"
        }
      },
      "required": [
        "AssetTransactionDescription"
      ]
    },
    "AssetTransactionDetail": {
      "type": "object",
      "properties": {
        "AssetTransactionAmount": {
          "type": "number"
        },
        "AssetTransactionCategoryType": {
          "type": "ref",
          "ref": "AssetTransactionCategoryType"
        },
        "AssetTransactionDate": {
          "type": "string"
        },
        "AssetTransactionPaidByName": {
          "type": "string"
        },
        "AssetTransactionPostDate": {
          "type": "string"
        },
        "AssetTransactionType": {
          "type": "ref",
          "ref": "AssetTransactionType"
        },
        "AssetTransactionTypeAdditionalDescription": {
          "type": "string"
        },
        "AssetTransactionUniqueIdentifier": {
          "type": "string"
        },
        "FinancialInstitutionTransactionIdentifier": {
          "type": "string"
        }
      },
      "required": [
        "AssetTransactionUniqueIdentifier",
        "AssetTransactionAmount",
        "AssetTransactionDate",
        "AssetTransactionPostDate",
        "AssetTransactionType",
        "AssetTransactionPaidByName",
        "AssetTransactionTypeAdditionalDescription",
        "AssetTransactionCategoryType",
        "FinancialInstitutionTransactionIdentifier"
      ]
    },
    "AssetTransactionType": {
      "type": "string"
    },
    "AssetTransactions": {
      "type": "object",
      "properties": {
        "ASSET_TRANSACTION": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AssetTransaction"
          }
        }
      },
      "required": [
        "ASSET_TRANSACTION"
      ]
    },
    "AssetType": {
      "type": "string"
    },
    "Assets": {
      "type": "object",
      "properties": {
        "ASSET": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Asset"
          }
        }
      },
      "required": [
        "ASSET"
      ]
    },
    "AssetsErrorWebhook": {
      "type": "object",
      "properties": {
        "asset_report_id": {
          "type": "string"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "error",
        "asset_report_id"
      ]
    },
    "AssetsProductReadyWebhook": {
      "type": "object",
      "properties": {
        "asset_report_id": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "asset_report_id"
      ]
    },
    "AuthGetNumbers": {
      "type": "object",
      "properties": {
        "ach": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "NumbersACH"
          }
        },
        "bacs": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "NumbersBACS"
          }
        },
        "eft": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "NumbersEFT"
          }
        },
        "international": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "NumbersInternational"
          }
        }
      },
      "required": [
        "ach",
        "eft",
        "international",
        "bacs"
      ]
    },
    "AuthGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "AuthGetRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "AuthGetRequestOptions": {
      "type": "object",
      "properties": {
        "account_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "AuthGetResponse": {
      "type": "object",
      "properties": {
        "accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountBase"
          }
        },
        "item": {
          "type": "ref",
          "ref": "Item"
        },
        "numbers": {
          "type": "ref",
          "ref": "AuthGetNumbers"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "accounts",
        "numbers",
        "item",
        "request_id"
      ]
    },
    "AuthMetadata": {
      "type": "object",
      "properties": {
        "supported_methods": {
          "type": "ref",
          "ref": "AuthSupportedMethods"
        }
      },
      "required": [
        "supported_methods"
      ]
    },
    "AuthSupportedMethods": {
      "type": "object",
      "properties": {
        "automated_micro_deposits": {
          "type": "boolean"
        },
        "instant_auth": {
          "type": "boolean"
        },
        "instant_match": {
          "type": "boolean"
        }
      },
      "required": [
        "instant_auth",
        "instant_match",
        "automated_micro_deposits"
      ]
    },
    "AutomaticallyVerifiedWebhook": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "account_id",
        "item_id",
        "environment"
      ]
    },
    "BankInitiatedReturnRisk": {
      "type": "object",
      "properties": {
        "risk_tier": {
          "type": "ref",
          "ref": "BankInitiatedRiskTier"
        },
        "score": {
          "type": "ref",
          "ref": "SignalScore"
        }
      },
      "required": [
        "risk_tier",
        "score"
      ]
    },
    "BankInitiatedRiskTier": {
      "type": "number"
    },
    "BankTransfer": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "ach_class": {
          "type": "ref",
          "ref": "ACHClass"
        },
        "amount": {
          "type": "ref",
          "ref": "BankTransferAmount"
        },
        "cancellable": {
          "type": "boolean"
        },
        "created": {
          "type": "string"
        },
        "custom_tag": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "direction": {
          "type": "ref",
          "ref": "BankTransferDirection"
        },
        "failure_reason": {
          "type": "ref",
          "ref": "BankTransferFailure"
        },
        "id": {
          "type": "ref",
          "ref": "BankTransferID"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "BankTransferMetadata"
        },
        "network": {
          "type": "ref",
          "ref": "BankTransferNetwork"
        },
        "origination_account_id": {
          "type": "string"
        },
        "status": {
          "type": "ref",
          "ref": "BankTransferStatus"
        },
        "type": {
          "type": "ref",
          "ref": "BankTransferType"
        },
        "user": {
          "type": "ref",
          "ref": "BankTransferUser"
        }
      },
      "required": [
        "id",
        "ach_class",
        "account_id",
        "type",
        "user",
        "amount",
        "iso_currency_code",
        "description",
        "created",
        "status",
        "network",
        "cancellable",
        "failure_reason",
        "custom_tag",
        "metadata",
        "origination_account_id",
        "direction"
      ]
    },
    "BankTransferAccessToken": {
      "type": "string"
    },
    "BankTransferAmount": {
      "type": "string"
    },
    "BankTransferBalance": {
      "type": "object",
      "properties": {
        "available": {
          "type": "string"
        },
        "transactable": {
          "type": "string"
        }
      },
      "required": [
        "available",
        "transactable"
      ]
    },
    "BankTransferBalanceGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "origination_account_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "BankTransferBalanceGetResponse": {
      "type": "object",
      "properties": {
        "balance": {
          "type": "ref",
          "ref": "BankTransferBalance"
        },
        "origination_account_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "balance",
        "origination_account_id",
        "request_id"
      ]
    },
    "BankTransferCancelRequest": {
      "type": "object",
      "properties": {
        "bank_transfer_id": {
          "type": "ref",
          "ref": "BankTransferID"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "bank_transfer_id"
      ]
    },
    "BankTransferCancelResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "BankTransferCreateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "BankTransferAccessToken"
        },
        "account_id": {
          "type": "string"
        },
        "ach_class": {
          "type": "ref",
          "ref": "ACHClass"
        },
        "amount": {
          "type": "ref",
          "ref": "BankTransferAmount"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "custom_tag": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "idempotency_key": {
          "type": "ref",
          "ref": "BankTransferIdempotencyKey"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "BankTransferMetadata"
        },
        "network": {
          "type": "ref",
          "ref": "BankTransferNetwork"
        },
        "origination_account_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "type": {
          "type": "ref",
          "ref": "BankTransferType"
        },
        "user": {
          "type": "ref",
          "ref": "BankTransferUser"
        }
      },
      "required": [
        "idempotency_key",
        "access_token",
        "account_id",
        "type",
        "network",
        "amount",
        "iso_currency_code",
        "description",
        "user"
      ]
    },
    "BankTransferCreateResponse": {
      "type": "object",
      "properties": {
        "bank_transfer": {
          "type": "ref",
          "ref": "BankTransfer"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "bank_transfer",
        "request_id"
      ]
    },
    "BankTransferDirection": {
      "type": "string"
    },
    "BankTransferEvent": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "bank_transfer_amount": {
          "type": "string"
        },
        "bank_transfer_id": {
          "type": "ref",
          "ref": "BankTransferID"
        },
        "bank_transfer_iso_currency_code": {
          "type": "string"
        },
        "bank_transfer_type": {
          "type": "ref",
          "ref": "BankTransferType"
        },
        "direction": {
          "type": "ref",
          "ref": "BankTransferDirection"
        },
        "event_id": {
          "type": "number"
        },
        "event_type": {
          "type": "ref",
          "ref": "BankTransferEventType"
        },
        "failure_reason": {
          "type": "ref",
          "ref": "BankTransferFailure"
        },
        "origination_account_id": {
          "type": "string"
        },
        "timestamp": {
          "type": "string"
        }
      },
      "required": [
        "event_id",
        "timestamp",
        "event_type",
        "account_id",
        "bank_transfer_id",
        "origination_account_id",
        "bank_transfer_type",
        "bank_transfer_amount",
        "bank_transfer_iso_currency_code",
        "failure_reason",
        "direction"
      ]
    },
    "BankTransferEventListBankTransferType": {
      "type": "string"
    },
    "BankTransferEventListDirection": {
      "type": "string"
    },
    "BankTransferEventListRequest": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "bank_transfer_id": {
          "type": "string"
        },
        "bank_transfer_type": {
          "type": "ref",
          "ref": "BankTransferEventListBankTransferType"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "direction": {
          "type": "ref",
          "ref": "BankTransferEventListDirection"
        },
        "end_date": {
          "type": "string"
        },
        "event_types": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "BankTransferEventType"
          }
        },
        "offset": {
          "type": "number"
        },
        "origination_account_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "start_date": {
          "type": "string"
        }
      }
    },
    "BankTransferEventListResponse": {
      "type": "object",
      "properties": {
        "bank_transfer_events": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "BankTransferEvent"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "bank_transfer_events",
        "request_id"
      ]
    },
    "BankTransferEventSyncRequest": {
      "type": "object",
      "properties": {
        "after_id": {
          "type": "number"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "after_id"
      ]
    },
    "BankTransferEventSyncResponse": {
      "type": "object",
      "properties": {
        "bank_transfer_events": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "BankTransferEvent"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "bank_transfer_events",
        "request_id"
      ]
    },
    "BankTransferEventType": {
      "type": "string"
    },
    "BankTransferFailure": {
      "type": "object",
      "properties": {
        "ach_return_code": {
          "type": "string"
        },
        "description": {
          "type": "string"
        }
      }
    },
    "BankTransferGetRequest": {
      "type": "object",
      "properties": {
        "bank_transfer_id": {
          "type": "ref",
          "ref": "BankTransferID"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "bank_transfer_id"
      ]
    },
    "BankTransferGetResponse": {
      "type": "object",
      "properties": {
        "bank_transfer": {
          "type": "ref",
          "ref": "BankTransfer"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "bank_transfer",
        "request_id"
      ]
    },
    "BankTransferID": {
      "type": "string"
    },
    "BankTransferIdempotencyKey": {
      "type": "string"
    },
    "BankTransferListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "direction": {
          "type": "ref",
          "ref": "BankTransferDirection"
        },
        "end_date": {
          "type": "string"
        },
        "offset": {
          "type": "number"
        },
        "origination_account_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "start_date": {
          "type": "string"
        }
      }
    },
    "BankTransferListResponse": {
      "type": "object",
      "properties": {
        "bank_transfers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "BankTransfer"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "bank_transfers",
        "request_id"
      ]
    },
    "BankTransferMetadata": {
      "type": "object",
      "properties": {}
    },
    "BankTransferMigrateAccountRequest": {
      "type": "object",
      "properties": {
        "account_number": {
          "type": "string"
        },
        "account_type": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "routing_number": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "wire_routing_number": {
          "type": "string"
        }
      },
      "required": [
        "account_number",
        "routing_number",
        "account_type"
      ]
    },
    "BankTransferMigrateAccountResponse": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "string"
        },
        "account_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "access_token",
        "account_id",
        "request_id"
      ]
    },
    "BankTransferNetwork": {
      "type": "string"
    },
    "BankTransferStatus": {
      "type": "string"
    },
    "BankTransferSweep": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "created_at",
        "amount",
        "iso_currency_code"
      ]
    },
    "BankTransferSweepGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "sweep_id": {
          "type": "string"
        }
      },
      "required": [
        "sweep_id"
      ]
    },
    "BankTransferSweepGetResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "sweep": {
          "type": "ref",
          "ref": "BankTransferSweep"
        }
      },
      "required": [
        "sweep",
        "request_id"
      ]
    },
    "BankTransferSweepListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "end_time": {
          "type": "string"
        },
        "origination_account_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "start_time": {
          "type": "string"
        }
      }
    },
    "BankTransferSweepListResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "sweeps": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "BankTransferSweep"
          }
        }
      },
      "required": [
        "sweeps",
        "request_id"
      ]
    },
    "BankTransferType": {
      "type": "string"
    },
    "BankTransferUser": {
      "type": "object",
      "properties": {
        "email_address": {
          "type": "string"
        },
        "legal_name": {
          "type": "string"
        },
        "routing_number": {
          "type": "string"
        }
      },
      "required": [
        "legal_name"
      ]
    },
    "BankTransfersEventsUpdateWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "environment"
      ]
    },
    "BankTransfersEventsUpdateWebhookForAuth": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "environment"
      ]
    },
    "CategoriesGetRequest": {
      "type": "object",
      "properties": {}
    },
    "CategoriesGetResponse": {
      "type": "object",
      "properties": {
        "categories": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Category"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "categories",
        "request_id"
      ]
    },
    "Category": {
      "type": "object",
      "properties": {
        "category_id": {
          "type": "string"
        },
        "group": {
          "type": "string"
        },
        "hierarchy": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "category_id",
        "group",
        "hierarchy"
      ]
    },
    "Cause": {
      "type": "ref",
      "ref": "PlaidError"
    },
    "City": {
      "type": "string"
    },
    "CityNullable": {
      "type": "string"
    },
    "ClientProvidedEnhancedTransaction": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number"
        },
        "description": {
          "type": "string"
        },
        "enhancements": {
          "type": "ref",
          "ref": "Enhancements"
        },
        "id": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "description",
        "amount",
        "iso_currency_code",
        "enhancements"
      ]
    },
    "ClientProvidedEnrichedTransaction": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number"
        },
        "description": {
          "type": "string"
        },
        "direction": {
          "type": "ref",
          "ref": "EnrichTransactionDirection"
        },
        "enrichments": {
          "type": "ref",
          "ref": "Enrichments"
        },
        "id": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "description",
        "amount",
        "iso_currency_code",
        "enrichments"
      ]
    },
    "ClientProvidedRawTransaction": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number"
        },
        "description": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "description",
        "amount",
        "iso_currency_code"
      ]
    },
    "ClientProvidedTransaction": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number"
        },
        "date_posted": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "direction": {
          "type": "ref",
          "ref": "EnrichTransactionDirection"
        },
        "id": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "location": {
          "type": "ref",
          "ref": "ClientProvidedTransactionLocation"
        },
        "mcc": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "description",
        "amount",
        "direction",
        "iso_currency_code"
      ]
    },
    "ClientProvidedTransactionLocation": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        }
      }
    },
    "ClientUserID": {
      "type": "string"
    },
    "ClientUserIDNullable": {
      "type": "string"
    },
    "ConnectedApplication": {
      "type": "object",
      "properties": {
        "application_id": {
          "type": "ref",
          "ref": "ApplicationID"
        },
        "application_url": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "display_name": {
          "type": "string"
        },
        "logo_url": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "reason_for_access": {
          "type": "string"
        },
        "scopes": {
          "type": "ref",
          "ref": "ScopesNullable"
        }
      },
      "required": [
        "application_id",
        "name",
        "created_at"
      ]
    },
    "ConsentPaymentIdempotencyKey": {
      "type": "string"
    },
    "Counterparty": {
      "type": "object",
      "properties": {
        "entity_id": {
          "type": "string"
        },
        "logo_url": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "CounterpartyType"
        },
        "website": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "type",
        "logo_url",
        "website"
      ]
    },
    "CounterpartyType": {
      "type": "string"
    },
    "CountryCode": {
      "type": "string"
    },
    "Credit1099": {
      "type": "object",
      "properties": {
        "april_amount": {
          "type": "number"
        },
        "august_amount": {
          "type": "number"
        },
        "card_not_present_transaction": {
          "type": "number"
        },
        "crop_insurance_proceeds": {
          "type": "number"
        },
        "december_amount": {
          "type": "number"
        },
        "document_id": {
          "type": "string"
        },
        "document_metadata": {
          "type": "ref",
          "ref": "CreditDocumentMetadata"
        },
        "excess_golden_parachute_payments": {
          "type": "number"
        },
        "february_amount": {
          "type": "number"
        },
        "federal_income_tax_withheld": {
          "type": "number"
        },
        "filer": {
          "type": "ref",
          "ref": "Credit1099Filer"
        },
        "fishing_boat_proceeds": {
          "type": "number"
        },
        "form_1099_type": {
          "type": "ref",
          "ref": "Form1099Type"
        },
        "gross_amount": {
          "type": "number"
        },
        "gross_proceeds_paid_to_an_attorney": {
          "type": "number"
        },
        "january_amount": {
          "type": "number"
        },
        "july_amount": {
          "type": "number"
        },
        "june_amount": {
          "type": "number"
        },
        "march_amount": {
          "type": "number"
        },
        "may_amount": {
          "type": "number"
        },
        "medical_and_healthcare_payments": {
          "type": "number"
        },
        "merchant_category_code": {
          "type": "string"
        },
        "nonemployee_compensation": {
          "type": "number"
        },
        "november_amount": {
          "type": "number"
        },
        "number_of_payment_transactions": {
          "type": "string"
        },
        "october_amount": {
          "type": "number"
        },
        "other_income": {
          "type": "number"
        },
        "payer": {
          "type": "ref",
          "ref": "Credit1099Payer"
        },
        "payer_made_direct_sales_of_5000_or_more_of_consumer_products_to_buyer": {
          "type": "string"
        },
        "payer_state_number": {
          "type": "string"
        },
        "payer_state_number_lower": {
          "type": "string"
        },
        "primary_state": {
          "type": "string"
        },
        "primary_state_id": {
          "type": "string"
        },
        "primary_state_income_tax": {
          "type": "number"
        },
        "pse_name": {
          "type": "string"
        },
        "pse_telephone_number": {
          "type": "string"
        },
        "recipient": {
          "type": "ref",
          "ref": "Credit1099Recipient"
        },
        "rents": {
          "type": "number"
        },
        "royalties": {
          "type": "number"
        },
        "secondary_state": {
          "type": "string"
        },
        "secondary_state_id": {
          "type": "string"
        },
        "secondary_state_income_tax": {
          "type": "number"
        },
        "section_409a_deferrals": {
          "type": "number"
        },
        "section_409a_income": {
          "type": "number"
        },
        "september_amount": {
          "type": "number"
        },
        "state_income": {
          "type": "number"
        },
        "state_income_lower": {
          "type": "number"
        },
        "state_tax_withheld": {
          "type": "number"
        },
        "state_tax_withheld_lower": {
          "type": "number"
        },
        "substitute_payments_in_lieu_of_dividends_or_interest": {
          "type": "number"
        },
        "tax_year": {
          "type": "string"
        },
        "transactions_reported": {
          "type": "string"
        }
      },
      "required": [
        "document_id"
      ]
    },
    "Credit1099Filer": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "CreditPayStubAddress"
        },
        "name": {
          "type": "string"
        },
        "tin": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      }
    },
    "Credit1099Payer": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "CreditPayStubAddress"
        },
        "name": {
          "type": "string"
        },
        "telephone_number": {
          "type": "string"
        },
        "tin": {
          "type": "string"
        }
      }
    },
    "Credit1099Recipient": {
      "type": "object",
      "properties": {
        "account_number": {
          "type": "string"
        },
        "address": {
          "type": "ref",
          "ref": "CreditPayStubAddress"
        },
        "facta_filing_requirement": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "second_tin_exists": {
          "type": "string"
        },
        "tin": {
          "type": "string"
        }
      }
    },
    "CreditAccount": {
      "type": "string"
    },
    "CreditAccountSubtype": {
      "type": "string"
    },
    "CreditAccountSubtypes": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "CreditAccountSubtype"
      }
    },
    "CreditAmountWithCurrency": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "ref",
          "ref": "CreditIsoCurrencyCode"
        },
        "unofficial_currency_code": {
          "type": "ref",
          "ref": "CreditUnofficialCurrencyCode"
        }
      }
    },
    "CreditAuditCopyTokenCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "report_tokens": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "report_tokens"
      ]
    },
    "CreditAuditCopyTokenCreateResponse": {
      "type": "object",
      "properties": {
        "audit_copy_token": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "audit_copy_token",
        "request_id"
      ]
    },
    "CreditAuditCopyTokenRemoveRequest": {
      "type": "object",
      "properties": {
        "audit_copy_token": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "audit_copy_token"
      ]
    },
    "CreditAuditCopyTokenRemoveResponse": {
      "type": "object",
      "properties": {
        "removed": {
          "type": "boolean"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "removed",
        "request_id"
      ]
    },
    "CreditAuditCopyTokenUpdateRequest": {
      "type": "object",
      "properties": {
        "audit_copy_token": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "report_tokens": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AssetReportToken"
          }
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "audit_copy_token",
        "report_tokens"
      ]
    },
    "CreditAuditCopyTokenUpdateResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "updated": {
          "type": "boolean"
        }
      },
      "required": [
        "request_id",
        "updated"
      ]
    },
    "CreditBankEmployer": {
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
    "CreditBankEmployment": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "bank_employment_id": {
          "type": "string"
        },
        "earliest_deposit_date": {
          "type": "string"
        },
        "employer": {
          "type": "ref",
          "ref": "CreditBankEmployer"
        },
        "latest_deposit_date": {
          "type": "string"
        }
      },
      "required": [
        "bank_employment_id",
        "account_id",
        "employer",
        "latest_deposit_date",
        "earliest_deposit_date"
      ]
    },
    "CreditBankEmploymentGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user_token": {
          "type": "ref",
          "ref": "UserToken"
        }
      },
      "required": [
        "user_token"
      ]
    },
    "CreditBankEmploymentGetResponse": {
      "type": "object",
      "properties": {
        "bank_employment_reports": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditBankEmploymentReport"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id",
        "bank_employment_reports"
      ]
    },
    "CreditBankEmploymentItem": {
      "type": "object",
      "properties": {
        "bank_employment_accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditBankIncomeAccount"
          }
        },
        "bank_employments": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditBankEmployment"
          }
        },
        "institution_id": {
          "type": "string"
        },
        "institution_name": {
          "type": "string"
        },
        "item_id": {
          "type": "string"
        },
        "last_updated_time": {
          "type": "string"
        }
      },
      "required": [
        "item_id",
        "last_updated_time",
        "institution_id",
        "institution_name",
        "bank_employments",
        "bank_employment_accounts"
      ]
    },
    "CreditBankEmploymentReport": {
      "type": "object",
      "properties": {
        "bank_employment_report_id": {
          "type": "string"
        },
        "days_requested": {
          "type": "number"
        },
        "generated_time": {
          "type": "string"
        },
        "items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditBankEmploymentItem"
          }
        },
        "warnings": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditBankEmploymentWarning"
          }
        }
      },
      "required": [
        "bank_employment_report_id",
        "generated_time",
        "days_requested",
        "items",
        "warnings"
      ]
    },
    "CreditBankEmploymentWarning": {
      "type": "object",
      "properties": {
        "cause": {
          "type": "ref",
          "ref": "CreditBankIncomeCause"
        },
        "warning_code": {
          "type": "ref",
          "ref": "CreditBankIncomeWarningCode"
        },
        "warning_type": {
          "type": "ref",
          "ref": "CreditBankEmploymentWarningType"
        }
      },
      "required": [
        "warning_type",
        "warning_code",
        "cause"
      ]
    },
    "CreditBankEmploymentWarningType": {
      "type": "string"
    },
    "CreditBankIncome": {
      "type": "object",
      "properties": {
        "bank_income_id": {
          "type": "string"
        },
        "bank_income_summary": {
          "type": "ref",
          "ref": "CreditBankIncomeSummary"
        },
        "days_requested": {
          "type": "number"
        },
        "generated_time": {
          "type": "string"
        },
        "items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditBankIncomeItem"
          }
        },
        "warnings": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditBankIncomeWarning"
          }
        }
      }
    },
    "CreditBankIncomeAccount": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "mask": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "official_name": {
          "type": "string"
        },
        "owners": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Owner"
          }
        },
        "subtype": {
          "type": "ref",
          "ref": "DepositoryAccountSubtype"
        },
        "type": {
          "type": "ref",
          "ref": "CreditBankIncomeAccountType"
        }
      },
      "required": [
        "account_id",
        "mask",
        "name",
        "official_name",
        "subtype",
        "type",
        "owners"
      ]
    },
    "CreditBankIncomeAccountType": {
      "type": "string"
    },
    "CreditBankIncomeCategory": {
      "type": "string"
    },
    "CreditBankIncomeCause": {
      "type": "object",
      "properties": {
        "display_message": {
          "type": "string"
        },
        "error_code": {
          "type": "string"
        },
        "error_message": {
          "type": "string"
        },
        "error_type": {
          "type": "ref",
          "ref": "CreditBankIncomeErrorType"
        },
        "item_id": {
          "type": "string"
        }
      },
      "required": [
        "error_type",
        "error_code",
        "error_message",
        "display_message",
        "item_id"
      ]
    },
    "CreditBankIncomeErrorType": {
      "type": "string"
    },
    "CreditBankIncomeGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "CreditBankIncomeGetRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user_token": {
          "type": "ref",
          "ref": "UserToken"
        }
      }
    },
    "CreditBankIncomeGetRequestOptions": {
      "type": "object",
      "properties": {
        "count": {
          "type": "number"
        }
      }
    },
    "CreditBankIncomeGetResponse": {
      "type": "object",
      "properties": {
        "bank_income": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditBankIncome"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "CreditBankIncomeHistoricalSummary": {
      "type": "object",
      "properties": {
        "end_date": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "start_date": {
          "type": "string"
        },
        "total_amount": {
          "type": "number"
        },
        "total_amounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditAmountWithCurrency"
          }
        },
        "transactions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditBankIncomeTransaction"
          }
        },
        "unofficial_currency_code": {
          "type": "string"
        }
      }
    },
    "CreditBankIncomeItem": {
      "type": "object",
      "properties": {
        "bank_income_accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditBankIncomeAccount"
          }
        },
        "bank_income_sources": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditBankIncomeSource"
          }
        },
        "institution_id": {
          "type": "string"
        },
        "institution_name": {
          "type": "string"
        },
        "item_id": {
          "type": "string"
        },
        "last_updated_time": {
          "type": "string"
        }
      }
    },
    "CreditBankIncomePDFGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user_token": {
          "type": "ref",
          "ref": "UserToken"
        }
      },
      "required": [
        "user_token"
      ]
    },
    "CreditBankIncomePDFGetResponse": {
      "type": "string"
    },
    "CreditBankIncomePayFrequency": {
      "type": "string"
    },
    "CreditBankIncomeRefreshRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "CreditBankIncomeRefreshRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user_token": {
          "type": "ref",
          "ref": "UserToken"
        }
      },
      "required": [
        "user_token"
      ]
    },
    "CreditBankIncomeRefreshRequestOptions": {
      "type": "object",
      "properties": {
        "days_requested": {
          "type": "number"
        },
        "webhook": {
          "type": "string"
        }
      }
    },
    "CreditBankIncomeRefreshResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "CreditBankIncomeSource": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "end_date": {
          "type": "string"
        },
        "historical_summary": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditBankIncomeHistoricalSummary"
          }
        },
        "income_category": {
          "type": "ref",
          "ref": "CreditBankIncomeCategory"
        },
        "income_description": {
          "type": "string"
        },
        "income_source_id": {
          "type": "string"
        },
        "pay_frequency": {
          "type": "ref",
          "ref": "CreditBankIncomePayFrequency"
        },
        "start_date": {
          "type": "string"
        },
        "total_amount": {
          "type": "number"
        },
        "transaction_count": {
          "type": "number"
        }
      }
    },
    "CreditBankIncomeSummary": {
      "type": "object",
      "properties": {
        "end_date": {
          "type": "string"
        },
        "historical_summary": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditBankIncomeHistoricalSummary"
          }
        },
        "income_categories_count": {
          "type": "number"
        },
        "income_sources_count": {
          "type": "number"
        },
        "income_transactions_count": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "start_date": {
          "type": "string"
        },
        "total_amount": {
          "type": "number"
        },
        "total_amounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditAmountWithCurrency"
          }
        },
        "unofficial_currency_code": {
          "type": "string"
        }
      }
    },
    "CreditBankIncomeTransaction": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number"
        },
        "check_number": {
          "type": "string"
        },
        "date": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "ref",
          "ref": "CreditIsoCurrencyCode"
        },
        "name": {
          "type": "string"
        },
        "original_description": {
          "type": "string"
        },
        "pending": {
          "type": "boolean"
        },
        "transaction_id": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "ref",
          "ref": "CreditUnofficialCurrencyCode"
        }
      }
    },
    "CreditBankIncomeWarning": {
      "type": "object",
      "properties": {
        "cause": {
          "type": "ref",
          "ref": "CreditBankIncomeCause"
        },
        "warning_code": {
          "type": "ref",
          "ref": "CreditBankIncomeWarningCode"
        },
        "warning_type": {
          "type": "ref",
          "ref": "CreditBankIncomeWarningType"
        }
      }
    },
    "CreditBankIncomeWarningCode": {
      "type": "string"
    },
    "CreditBankIncomeWarningType": {
      "type": "string"
    },
    "CreditCardLiability": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "aprs": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "APR"
          }
        },
        "is_overdue": {
          "type": "boolean"
        },
        "last_payment_amount": {
          "type": "number"
        },
        "last_payment_date": {
          "type": "string"
        },
        "last_statement_balance": {
          "type": "number"
        },
        "last_statement_issue_date": {
          "type": "string"
        },
        "minimum_payment_amount": {
          "type": "number"
        },
        "next_payment_due_date": {
          "type": "string"
        }
      },
      "required": [
        "account_id",
        "aprs",
        "is_overdue",
        "last_payment_amount",
        "last_payment_date",
        "last_statement_issue_date",
        "last_statement_balance",
        "minimum_payment_amount",
        "next_payment_due_date"
      ]
    },
    "CreditCategory": {
      "type": "object",
      "properties": {
        "detailed": {
          "type": "string"
        },
        "primary": {
          "type": "string"
        }
      },
      "required": [
        "primary",
        "detailed"
      ]
    },
    "CreditDocumentMetadata": {
      "type": "object",
      "properties": {
        "document_type": {
          "type": "ref",
          "ref": "CreditDocumentType"
        },
        "download_url": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "status": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "document_type",
        "download_url",
        "status"
      ]
    },
    "CreditDocumentType": {
      "type": "string"
    },
    "CreditEmployerVerification": {
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
    "CreditEmploymentEmployeeType": {
      "type": "string"
    },
    "CreditEmploymentGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user_token": {
          "type": "ref",
          "ref": "UserToken"
        }
      },
      "required": [
        "user_token"
      ]
    },
    "CreditEmploymentGetResponse": {
      "type": "object",
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditEmploymentItem"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "items",
        "request_id"
      ]
    },
    "CreditEmploymentItem": {
      "type": "object",
      "properties": {
        "employment_report_token": {
          "type": "string"
        },
        "employments": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditEmploymentVerification"
          }
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        }
      },
      "required": [
        "item_id",
        "employments"
      ]
    },
    "CreditEmploymentVerification": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "employee_type": {
          "type": "ref",
          "ref": "CreditEmploymentEmployeeType"
        },
        "employer": {
          "type": "ref",
          "ref": "CreditEmployerVerification"
        },
        "end_date": {
          "type": "string"
        },
        "last_paystub_date": {
          "type": "string"
        },
        "platform_ids": {
          "type": "ref",
          "ref": "CreditPlatformIds"
        },
        "start_date": {
          "type": "string"
        },
        "status": {
          "type": "ref",
          "ref": "CreditEmploymentVerificationStatus"
        },
        "title": {
          "type": "string"
        }
      },
      "required": [
        "account_id",
        "status",
        "start_date",
        "end_date",
        "employer",
        "title",
        "platform_ids",
        "employee_type",
        "last_paystub_date"
      ]
    },
    "CreditEmploymentVerificationStatus": {
      "type": "string"
    },
    "CreditFilter": {
      "type": "object",
      "properties": {
        "account_subtypes": {
          "type": "ref",
          "ref": "CreditAccountSubtypes"
        }
      },
      "required": [
        "account_subtypes"
      ]
    },
    "CreditFreddieMacAssetDetail_VOE_2_5": {
      "type": "object",
      "properties": {
        "AssetAccountIdentifier": {
          "type": "string"
        },
        "AssetAsOfDate": {
          "type": "string"
        },
        "AssetDaysRequestedCount": {
          "type": "number"
        },
        "AssetDescription": {
          "type": "string"
        },
        "AssetOwnershipType": {
          "type": "string"
        },
        "AssetType": {
          "type": "ref",
          "ref": "AssetType"
        },
        "AssetTypeAdditionalDescription": {
          "type": "string"
        },
        "AssetUniqueIdentifier": {
          "type": "string"
        }
      },
      "required": [
        "AssetUniqueIdentifier",
        "AssetAccountIdentifier",
        "AssetAsOfDate",
        "AssetDescription",
        "AssetType",
        "AssetTypeAdditionalDescription",
        "AssetDaysRequestedCount",
        "AssetOwnershipType"
      ]
    },
    "CreditFreddieMacAssetTransactionDetail_VOE_2_5": {
      "type": "object",
      "properties": {
        "AssetTransactionCategoryType": {
          "type": "ref",
          "ref": "AssetTransactionCategoryType"
        },
        "AssetTransactionDate": {
          "type": "string"
        },
        "AssetTransactionPaidByName": {
          "type": "string"
        },
        "AssetTransactionPaidToName": {
          "type": "string"
        },
        "AssetTransactionPostDate": {
          "type": "string"
        },
        "AssetTransactionType": {
          "type": "ref",
          "ref": "AssetTransactionType"
        },
        "AssetTransactionTypeAdditionalDescription": {
          "type": "string"
        },
        "AssetTransactionUniqueIdentifier": {
          "type": "string"
        },
        "FinancialInstitutionTransactionIdentifier": {
          "type": "string"
        }
      },
      "required": [
        "AssetTransactionUniqueIdentifier",
        "AssetTransactionDate",
        "AssetTransactionPostDate",
        "AssetTransactionType",
        "AssetTransactionPaidByName",
        "AssetTransactionPaidToName",
        "AssetTransactionTypeAdditionalDescription",
        "AssetTransactionCategoryType",
        "FinancialInstitutionTransactionIdentifier"
      ]
    },
    "CreditFreddieMacAssetTransaction_VOA_2_4": {
      "type": "object",
      "properties": {
        "ASSET_TRANSACTION_DESCRIPTION": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AssetTransactionDescription"
          }
        },
        "ASSET_TRANSACTION_DETAIL": {
          "type": "ref",
          "ref": "AssetTransactionDetail"
        }
      },
      "required": [
        "ASSET_TRANSACTION_DETAIL",
        "ASSET_TRANSACTION_DESCRIPTION"
      ]
    },
    "CreditFreddieMacAssetTransaction_VOE_2_5": {
      "type": "object",
      "properties": {
        "ASSET_TRANSACTION_DESCRIPTION": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AssetTransactionDescription"
          }
        },
        "ASSET_TRANSACTION_DETAIL": {
          "type": "ref",
          "ref": "CreditFreddieMacAssetTransactionDetail_VOE_2_5"
        }
      },
      "required": [
        "ASSET_TRANSACTION_DETAIL",
        "ASSET_TRANSACTION_DESCRIPTION"
      ]
    },
    "CreditFreddieMacAssetTransactions_VOA_2_4": {
      "type": "object",
      "properties": {
        "ASSET_TRANSACTION": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditFreddieMacAssetTransaction_VOA_2_4"
          }
        }
      },
      "required": [
        "ASSET_TRANSACTION"
      ]
    },
    "CreditFreddieMacAssetTransactions_VOE_2_5": {
      "type": "object",
      "properties": {
        "ASSET_TRANSACTION": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditFreddieMacAssetTransaction_VOE_2_5"
          }
        }
      },
      "required": [
        "ASSET_TRANSACTION"
      ]
    },
    "CreditFreddieMacAsset_VOA_2_4": {
      "type": "object",
      "properties": {
        "ASSET_DETAIL": {
          "type": "ref",
          "ref": "AssetDetail"
        },
        "ASSET_HOLDER": {
          "type": "ref",
          "ref": "AssetHolder"
        },
        "ASSET_OWNERS": {
          "type": "ref",
          "ref": "AssetOwners"
        },
        "ASSET_TRANSACTIONS": {
          "type": "ref",
          "ref": "CreditFreddieMacAssetTransactions_VOA_2_4"
        },
        "VALIDATION_SOURCES": {
          "type": "ref",
          "ref": "ValidationSources"
        }
      },
      "required": [
        "ASSET_DETAIL",
        "ASSET_OWNERS",
        "ASSET_HOLDER",
        "ASSET_TRANSACTIONS",
        "VALIDATION_SOURCES"
      ]
    },
    "CreditFreddieMacAsset_VOE_2_5": {
      "type": "object",
      "properties": {
        "ASSET_DETAIL": {
          "type": "ref",
          "ref": "CreditFreddieMacAssetDetail_VOE_2_5"
        },
        "ASSET_HOLDER": {
          "type": "ref",
          "ref": "AssetHolder"
        },
        "ASSET_OWNERS": {
          "type": "ref",
          "ref": "AssetOwners"
        },
        "ASSET_TRANSACTIONS": {
          "type": "ref",
          "ref": "CreditFreddieMacAssetTransactions_VOE_2_5"
        }
      },
      "required": [
        "ASSET_DETAIL",
        "ASSET_OWNERS",
        "ASSET_HOLDER",
        "ASSET_TRANSACTIONS"
      ]
    },
    "CreditFreddieMacAssets_VOA_2_4": {
      "type": "object",
      "properties": {
        "ASSET": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditFreddieMacAsset_VOA_2_4"
          }
        }
      },
      "required": [
        "ASSET"
      ]
    },
    "CreditFreddieMacAssets_VOE_2_5": {
      "type": "object",
      "properties": {
        "ASSET": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditFreddieMacAsset_VOE_2_5"
          }
        }
      },
      "required": [
        "ASSET"
      ]
    },
    "CreditFreddieMacIndividualName_VOA_2_4": {
      "type": "object",
      "properties": {
        "FirstName": {
          "type": "string"
        },
        "LastName": {
          "type": "string"
        },
        "MiddleName": {
          "type": "string"
        }
      },
      "required": [
        "FirstName",
        "LastName",
        "MiddleName"
      ]
    },
    "CreditFreddieMacLoanIdentifiers_VOA_2_4": {
      "type": "object",
      "properties": {
        "LOAN_IDENTIFIER": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LoanIdentifier"
          }
        }
      },
      "required": [
        "LOAN_IDENTIFIER"
      ]
    },
    "CreditFreddieMacLoan_VOA_2_4": {
      "type": "object",
      "properties": {
        "LOAN_IDENTIFIERS": {
          "type": "ref",
          "ref": "CreditFreddieMacLoanIdentifiers_VOA_2_4"
        },
        "LoanRoleType": {
          "type": "string"
        }
      },
      "required": [
        "LOAN_IDENTIFIERS",
        "LoanRoleType"
      ]
    },
    "CreditFreddieMacLoans_VOA_2_4": {
      "type": "object",
      "properties": {
        "LOAN": {
          "type": "ref",
          "ref": "CreditFreddieMacLoan_VOA_2_4"
        }
      },
      "required": [
        "LOAN"
      ]
    },
    "CreditFreddieMacParties_VOA_2_4": {
      "type": "object",
      "properties": {
        "PARTY": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditFreddieMacParty_VOA_2_4"
          }
        }
      },
      "required": [
        "PARTY"
      ]
    },
    "CreditFreddieMacPartyIndividual_VOA_2_4": {
      "type": "object",
      "properties": {
        "NAME": {
          "type": "ref",
          "ref": "CreditFreddieMacIndividualName_VOA_2_4"
        }
      },
      "required": [
        "NAME"
      ]
    },
    "CreditFreddieMacParty_VOA_2_4": {
      "type": "object",
      "properties": {
        "INDIVIDUAL": {
          "type": "ref",
          "ref": "CreditFreddieMacPartyIndividual_VOA_2_4"
        },
        "ROLES": {
          "type": "ref",
          "ref": "Roles"
        },
        "TAXPAYER_IDENTIFIERS": {
          "type": "ref",
          "ref": "TaxpayerIdentifiers"
        }
      },
      "required": [
        "INDIVIDUAL",
        "ROLES",
        "TAXPAYER_IDENTIFIERS"
      ]
    },
    "CreditFreddieMacReportingInformation_VOA_2_4": {
      "type": "object",
      "properties": {
        "ReportDateTime": {
          "type": "string"
        },
        "ReportIdentifierType": {
          "type": "string"
        },
        "ReportingInformationIdentifier": {
          "type": "string"
        }
      },
      "required": [
        "ReportingInformationIdentifier"
      ]
    },
    "CreditFreddieMacReportsGetRequest": {
      "type": "object",
      "properties": {
        "audit_copy_token": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "audit_copy_token"
      ]
    },
    "CreditFreddieMacReportsGetResponse": {
      "type": "object",
      "properties": {
        "VOA": {
          "type": "ref",
          "ref": "CreditFreddieMacVerificationOfAssets_VOA_2_4"
        },
        "VOE": {
          "type": "ref",
          "ref": "CreditFreddieVerificationOfEmployment_VOE_2_5"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "VOA",
        "request_id"
      ]
    },
    "CreditFreddieMacService_VOA_2_4": {
      "type": "object",
      "properties": {
        "STATUSES": {
          "type": "ref",
          "ref": "Statuses"
        },
        "VERIFICATION_OF_ASSET": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditFreddieMacVerificationOfAsset_VOA_2_4"
          }
        }
      },
      "required": [
        "VERIFICATION_OF_ASSET",
        "STATUSES"
      ]
    },
    "CreditFreddieMacService_VOE_2_5": {
      "type": "object",
      "properties": {
        "STATUSES": {
          "type": "ref",
          "ref": "Statuses"
        },
        "VERIFICATION_OF_ASSET": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditFreddieMacVerificationOfAsset_VOE_2_5"
          }
        }
      },
      "required": [
        "VERIFICATION_OF_ASSET",
        "STATUSES"
      ]
    },
    "CreditFreddieMacServices_VOA_2_4": {
      "type": "object",
      "properties": {
        "SERVICE": {
          "type": "ref",
          "ref": "CreditFreddieMacService_VOA_2_4"
        }
      },
      "required": [
        "SERVICE"
      ]
    },
    "CreditFreddieMacServices_VOE_2_5": {
      "type": "object",
      "properties": {
        "SERVICE": {
          "type": "ref",
          "ref": "CreditFreddieMacService_VOE_2_5"
        }
      },
      "required": [
        "SERVICE"
      ]
    },
    "CreditFreddieMacVerificationOfAssetResponse_VOA_2_4": {
      "type": "object",
      "properties": {
        "ASSETS": {
          "type": "ref",
          "ref": "CreditFreddieMacAssets_VOA_2_4"
        }
      },
      "required": [
        "ASSETS"
      ]
    },
    "CreditFreddieMacVerificationOfAssetResponse_VOE_2_5": {
      "type": "object",
      "properties": {
        "ASSETS": {
          "type": "ref",
          "ref": "CreditFreddieMacAssets_VOE_2_5"
        }
      },
      "required": [
        "ASSETS"
      ]
    },
    "CreditFreddieMacVerificationOfAsset_VOA_2_4": {
      "type": "object",
      "properties": {
        "REPORTING_INFORMATION": {
          "type": "ref",
          "ref": "CreditFreddieMacReportingInformation_VOA_2_4"
        },
        "SERVICE_PRODUCT_FULFILLMENT": {
          "type": "ref",
          "ref": "ServiceProductFulfillment"
        },
        "VERIFICATION_OF_ASSET_RESPONSE": {
          "type": "ref",
          "ref": "CreditFreddieMacVerificationOfAssetResponse_VOA_2_4"
        }
      },
      "required": [
        "REPORTING_INFORMATION",
        "SERVICE_PRODUCT_FULFILLMENT",
        "VERIFICATION_OF_ASSET_RESPONSE"
      ]
    },
    "CreditFreddieMacVerificationOfAsset_VOE_2_5": {
      "type": "object",
      "properties": {
        "REPORTING_INFORMATION": {
          "type": "ref",
          "ref": "CreditFreddieMacReportingInformation_VOA_2_4"
        },
        "SERVICE_PRODUCT_FULFILLMENT": {
          "type": "ref",
          "ref": "ServiceProductFulfillment"
        },
        "VERIFICATION_OF_ASSET_RESPONSE": {
          "type": "ref",
          "ref": "CreditFreddieMacVerificationOfAssetResponse_VOE_2_5"
        }
      },
      "required": [
        "REPORTING_INFORMATION",
        "SERVICE_PRODUCT_FULFILLMENT",
        "VERIFICATION_OF_ASSET_RESPONSE"
      ]
    },
    "CreditFreddieMacVerificationOfAssetsDeal_VOA_2_4": {
      "type": "object",
      "properties": {
        "LOANS": {
          "type": "ref",
          "ref": "CreditFreddieMacLoans_VOA_2_4"
        },
        "PARTIES": {
          "type": "ref",
          "ref": "CreditFreddieMacParties_VOA_2_4"
        },
        "SERVICES": {
          "type": "ref",
          "ref": "CreditFreddieMacServices_VOA_2_4"
        }
      },
      "required": [
        "LOANS",
        "PARTIES",
        "SERVICES"
      ]
    },
    "CreditFreddieMacVerificationOfAssets_VOA_2_4": {
      "type": "object",
      "properties": {
        "DEAL": {
          "type": "ref",
          "ref": "CreditFreddieMacVerificationOfAssetsDeal_VOA_2_4"
        },
        "SchemaVersion": {
          "type": "number"
        }
      },
      "required": [
        "DEAL",
        "SchemaVersion"
      ]
    },
    "CreditFreddieVerificationOfEmploymentDeal_VOE_2_5": {
      "type": "object",
      "properties": {
        "LOANS": {
          "type": "ref",
          "ref": "CreditFreddieMacLoans_VOA_2_4"
        },
        "PARTIES": {
          "type": "ref",
          "ref": "CreditFreddieMacParties_VOA_2_4"
        },
        "SERVICES": {
          "type": "ref",
          "ref": "CreditFreddieMacServices_VOE_2_5"
        }
      },
      "required": [
        "LOANS",
        "PARTIES",
        "SERVICES"
      ]
    },
    "CreditFreddieVerificationOfEmployment_VOE_2_5": {
      "type": "object",
      "properties": {
        "DEAL": {
          "type": "ref",
          "ref": "CreditFreddieVerificationOfEmploymentDeal_VOE_2_5"
        },
        "SchemaVersion": {
          "type": "number"
        }
      },
      "required": [
        "DEAL",
        "SchemaVersion"
      ]
    },
    "CreditIsoCurrencyCode": {
      "type": "string"
    },
    "CreditPayStub": {
      "type": "object",
      "properties": {
        "deductions": {
          "type": "ref",
          "ref": "CreditPayStubDeductions"
        },
        "document_id": {
          "type": "string"
        },
        "document_metadata": {
          "type": "ref",
          "ref": "CreditDocumentMetadata"
        },
        "earnings": {
          "type": "ref",
          "ref": "CreditPayStubEarnings"
        },
        "employee": {
          "type": "ref",
          "ref": "CreditPayStubEmployee"
        },
        "employer": {
          "type": "ref",
          "ref": "CreditPayStubEmployer"
        },
        "net_pay": {
          "type": "ref",
          "ref": "CreditPayStubNetPay"
        },
        "pay_period_details": {
          "type": "ref",
          "ref": "PayStubPayPeriodDetails"
        }
      },
      "required": [
        "deductions",
        "document_id",
        "document_metadata",
        "earnings",
        "employee",
        "employer",
        "net_pay",
        "pay_period_details"
      ]
    },
    "CreditPayStubAddress": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "street": {
          "type": "string"
        }
      },
      "required": [
        "city",
        "country",
        "postal_code",
        "region",
        "street"
      ]
    },
    "CreditPayStubDeductions": {
      "type": "object",
      "properties": {
        "breakdown": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PayStubDeductionsBreakdown"
          }
        },
        "total": {
          "type": "ref",
          "ref": "PayStubDeductionsTotal"
        }
      },
      "required": [
        "breakdown",
        "total"
      ]
    },
    "CreditPayStubEarnings": {
      "type": "object",
      "properties": {
        "breakdown": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PayStubEarningsBreakdown"
          }
        },
        "total": {
          "type": "ref",
          "ref": "PayStubEarningsTotal"
        }
      },
      "required": [
        "breakdown",
        "total"
      ]
    },
    "CreditPayStubEmployee": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "CreditPayStubAddress"
        },
        "marital_status": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "taxpayer_id": {
          "type": "ref",
          "ref": "PayStubTaxpayerID"
        }
      },
      "required": [
        "name",
        "address",
        "marital_status",
        "taxpayer_id"
      ]
    },
    "CreditPayStubEmployer": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "CreditPayStubAddress"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "address",
        "name"
      ]
    },
    "CreditPayStubNetPay": {
      "type": "object",
      "properties": {
        "current_amount": {
          "type": "number"
        },
        "description": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        },
        "ytd_amount": {
          "type": "number"
        }
      },
      "required": [
        "current_amount",
        "description",
        "iso_currency_code",
        "unofficial_currency_code",
        "ytd_amount"
      ]
    },
    "CreditPayStubPayBasisType": {
      "type": "string"
    },
    "CreditPayrollIncomeGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user_token": {
          "type": "ref",
          "ref": "UserToken"
        }
      }
    },
    "CreditPayrollIncomeGetResponse": {
      "type": "object",
      "properties": {
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PayrollItem"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "items",
        "request_id"
      ]
    },
    "CreditPayrollIncomePrecheckRequest": {
      "type": "object",
      "properties": {
        "access_tokens": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccessToken"
          }
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "employer": {
          "type": "ref",
          "ref": "IncomeVerificationPrecheckEmployer"
        },
        "payroll_institution": {
          "type": "ref",
          "ref": "IncomeVerificationPrecheckPayrollInstitution"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "us_military_info": {
          "type": "ref",
          "ref": "IncomeVerificationPrecheckMilitaryInfo"
        },
        "user_token": {
          "type": "ref",
          "ref": "UserToken"
        }
      }
    },
    "CreditPayrollIncomePrecheckResponse": {
      "type": "object",
      "properties": {
        "confidence": {
          "type": "ref",
          "ref": "IncomeVerificationPrecheckConfidence"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "confidence",
        "request_id"
      ]
    },
    "CreditPayrollIncomeRefreshRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user_token": {
          "type": "ref",
          "ref": "UserToken"
        }
      }
    },
    "CreditPayrollIncomeRefreshResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "verification_refresh_status": {
          "type": "ref",
          "ref": "CreditPayrollIncomeRefreshStatus"
        }
      },
      "required": [
        "request_id",
        "verification_refresh_status"
      ]
    },
    "CreditPayrollIncomeRefreshStatus": {
      "type": "string"
    },
    "CreditPayrollIncomeRiskSignalsGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user_token": {
          "type": "ref",
          "ref": "UserToken"
        }
      }
    },
    "CreditPayrollIncomeRiskSignalsGetResponse": {
      "type": "object",
      "properties": {
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "items": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PayrollRiskSignalsItem"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "items",
        "request_id"
      ]
    },
    "CreditPlatformIds": {
      "type": "object",
      "properties": {
        "employee_id": {
          "type": "string"
        },
        "payroll_id": {
          "type": "string"
        },
        "position_id": {
          "type": "string"
        }
      },
      "required": [
        "employee_id",
        "payroll_id",
        "position_id"
      ]
    },
    "CreditRelayCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "report_tokens": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "secondary_client_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "webhook": {
          "type": "string"
        }
      },
      "required": [
        "report_tokens",
        "secondary_client_id"
      ]
    },
    "CreditRelayCreateResponse": {
      "type": "object",
      "properties": {
        "relay_token": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "relay_token",
        "request_id"
      ]
    },
    "CreditRelayGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "relay_token": {
          "type": "string"
        },
        "report_type": {
          "type": "ref",
          "ref": "ReportType"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "relay_token",
        "report_type"
      ]
    },
    "CreditRelayRefreshRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "relay_token": {
          "type": "string"
        },
        "report_type": {
          "type": "ref",
          "ref": "ReportType"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "webhook": {
          "type": "string"
        }
      },
      "required": [
        "relay_token",
        "report_type"
      ]
    },
    "CreditRelayRefreshResponse": {
      "type": "object",
      "properties": {
        "asset_report_id": {
          "type": "ref",
          "ref": "AssetReportId"
        },
        "relay_token": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "relay_token",
        "request_id"
      ]
    },
    "CreditRelayRemoveRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "relay_token": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "relay_token"
      ]
    },
    "CreditRelayRemoveResponse": {
      "type": "object",
      "properties": {
        "removed": {
          "type": "boolean"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "removed",
        "request_id"
      ]
    },
    "CreditSession": {
      "type": "object",
      "properties": {
        "errors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditSessionError"
          }
        },
        "link_session_id": {
          "type": "string"
        },
        "results": {
          "type": "ref",
          "ref": "CreditSessionResults"
        },
        "session_start_time": {
          "type": "string"
        }
      }
    },
    "CreditSessionBankIncomeResult": {
      "type": "object",
      "properties": {
        "institution_id": {
          "type": "string"
        },
        "item_id": {
          "type": "string"
        },
        "status": {
          "type": "ref",
          "ref": "CreditSessionBankIncomeStatus"
        }
      }
    },
    "CreditSessionBankIncomeStatus": {
      "type": "string"
    },
    "CreditSessionDocumentIncomeResult": {
      "type": "object",
      "properties": {
        "num_paystubs_uploaded": {
          "type": "number"
        },
        "num_w2s_uploaded": {
          "type": "number"
        }
      },
      "required": [
        "num_paystubs_uploaded",
        "num_w2s_uploaded"
      ]
    },
    "CreditSessionError": {
      "type": "object",
      "properties": {
        "display_message": {
          "type": "string"
        },
        "error_code": {
          "type": "string"
        },
        "error_message": {
          "type": "string"
        },
        "error_type": {
          "type": "string"
        }
      }
    },
    "CreditSessionItemAddResult": {
      "type": "object",
      "properties": {
        "institution_id": {
          "type": "string"
        },
        "item_id": {
          "type": "string"
        },
        "public_token": {
          "type": "string"
        }
      }
    },
    "CreditSessionPayrollIncomeResult": {
      "type": "object",
      "properties": {
        "institution_id": {
          "type": "string"
        },
        "institution_name": {
          "type": "string"
        },
        "num_paystubs_retrieved": {
          "type": "number"
        },
        "num_w2s_retrieved": {
          "type": "number"
        }
      }
    },
    "CreditSessionResults": {
      "type": "object",
      "properties": {
        "bank_income_results": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditSessionBankIncomeResult"
          }
        },
        "document_income_results": {
          "type": "ref",
          "ref": "CreditSessionDocumentIncomeResult"
        },
        "item_add_results": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditSessionItemAddResult"
          }
        },
        "payroll_income_results": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditSessionPayrollIncomeResult"
          }
        }
      }
    },
    "CreditSessionsGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user_token": {
          "type": "ref",
          "ref": "UserToken"
        }
      },
      "required": [
        "user_token"
      ]
    },
    "CreditSessionsGetResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "sessions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditSession"
          }
        }
      },
      "required": [
        "request_id"
      ]
    },
    "CreditUnofficialCurrencyCode": {
      "type": "string"
    },
    "CreditW2": {
      "type": "object",
      "properties": {
        "allocated_tips": {
          "type": "string"
        },
        "box_12": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "W2Box12"
          }
        },
        "box_9": {
          "type": "string"
        },
        "dependent_care_benefits": {
          "type": "string"
        },
        "document_id": {
          "type": "string"
        },
        "document_metadata": {
          "type": "ref",
          "ref": "CreditDocumentMetadata"
        },
        "employee": {
          "type": "ref",
          "ref": "CreditPayStubEmployee"
        },
        "employer": {
          "type": "ref",
          "ref": "CreditPayStubEmployer"
        },
        "employer_id_number": {
          "type": "string"
        },
        "federal_income_tax_withheld": {
          "type": "string"
        },
        "medicare_tax_withheld": {
          "type": "string"
        },
        "medicare_wages_and_tips": {
          "type": "string"
        },
        "nonqualified_plans": {
          "type": "string"
        },
        "other": {
          "type": "string"
        },
        "retirement_plan": {
          "type": "string"
        },
        "social_security_tax_withheld": {
          "type": "string"
        },
        "social_security_tips": {
          "type": "string"
        },
        "social_security_wages": {
          "type": "string"
        },
        "state_and_local_wages": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "W2StateAndLocalWages"
          }
        },
        "statutory_employee": {
          "type": "string"
        },
        "tax_year": {
          "type": "string"
        },
        "third_party_sick_pay": {
          "type": "string"
        },
        "wages_tips_other_comp": {
          "type": "string"
        }
      },
      "required": [
        "document_metadata",
        "document_id",
        "employer",
        "employee",
        "tax_year",
        "employer_id_number",
        "wages_tips_other_comp",
        "federal_income_tax_withheld",
        "social_security_wages",
        "social_security_tax_withheld",
        "medicare_wages_and_tips",
        "medicare_tax_withheld",
        "social_security_tips",
        "allocated_tips",
        "box_9",
        "dependent_care_benefits",
        "nonqualified_plans",
        "box_12",
        "statutory_employee",
        "retirement_plan",
        "third_party_sick_pay",
        "other",
        "state_and_local_wages"
      ]
    },
    "Cursor": {
      "type": "string"
    },
    "CustomerInitiatedReturnRisk": {
      "type": "object",
      "properties": {
        "risk_tier": {
          "type": "ref",
          "ref": "CustomerInitiatedRiskTier"
        },
        "score": {
          "type": "ref",
          "ref": "SignalScore"
        }
      },
      "required": [
        "risk_tier",
        "score"
      ]
    },
    "CustomerInitiatedRiskTier": {
      "type": "number"
    },
    "DashboardUser": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "ref",
          "ref": "Timestamp"
        },
        "email_address": {
          "type": "ref",
          "ref": "EmailAddress"
        },
        "id": {
          "type": "ref",
          "ref": "DashboardUserID"
        },
        "status": {
          "type": "ref",
          "ref": "DashboardUserStatus"
        }
      },
      "required": [
        "id",
        "created_at",
        "email_address",
        "status"
      ]
    },
    "DashboardUserGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "dashboard_user_id": {
          "type": "ref",
          "ref": "DashboardUserID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "dashboard_user_id"
      ]
    },
    "DashboardUserGetResponse": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "ref",
          "ref": "Timestamp"
        },
        "email_address": {
          "type": "ref",
          "ref": "EmailAddress"
        },
        "id": {
          "type": "ref",
          "ref": "DashboardUserID"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "status": {
          "type": "ref",
          "ref": "DashboardUserStatus"
        }
      },
      "required": [
        "id",
        "created_at",
        "email_address",
        "status",
        "request_id"
      ]
    },
    "DashboardUserID": {
      "type": "string"
    },
    "DashboardUserIDNullable": {
      "type": "string"
    },
    "DashboardUserListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "DashboardUserListResponse": {
      "type": "object",
      "properties": {
        "dashboard_users": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DashboardUser"
          }
        },
        "next_cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "dashboard_users",
        "next_cursor",
        "request_id"
      ]
    },
    "DashboardUserStatus": {
      "type": "string"
    },
    "DateRange": {
      "type": "object",
      "properties": {
        "beginning": {
          "type": "ref",
          "ref": "ISO8601Date"
        },
        "ending": {
          "type": "ref",
          "ref": "ISO8601Date"
        }
      },
      "required": [
        "beginning",
        "ending"
      ]
    },
    "Deductions": {
      "type": "object",
      "properties": {
        "breakdown": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DeductionsBreakdown"
          }
        },
        "subtotals": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Total"
          }
        },
        "total": {
          "type": "ref",
          "ref": "DeductionsTotal"
        },
        "totals": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Total"
          }
        }
      },
      "required": [
        "breakdown",
        "total"
      ]
    },
    "DeductionsBreakdown": {
      "type": "object",
      "properties": {
        "current_amount": {
          "type": "number"
        },
        "description": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        },
        "ytd_amount": {
          "type": "number"
        }
      }
    },
    "DeductionsTotal": {
      "type": "object",
      "properties": {
        "current_amount": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        },
        "ytd_amount": {
          "type": "number"
        }
      }
    },
    "DefaultUpdateWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "item_id": {
          "type": "string"
        },
        "new_transactions": {
          "type": "number"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "new_transactions",
        "item_id",
        "environment"
      ]
    },
    "DepositSwitchAddressData": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "street": {
          "type": "string"
        }
      },
      "required": [
        "street",
        "city",
        "region",
        "postal_code",
        "country"
      ]
    },
    "DepositSwitchAltCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "country_code": {
          "type": "string"
        },
        "options": {
          "type": "ref",
          "ref": "DepositSwitchCreateRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "target_account": {
          "type": "ref",
          "ref": "DepositSwitchTargetAccount"
        },
        "target_user": {
          "type": "ref",
          "ref": "DepositSwitchTargetUser"
        }
      },
      "required": [
        "target_account",
        "target_user"
      ]
    },
    "DepositSwitchAltCreateResponse": {
      "type": "object",
      "properties": {
        "deposit_switch_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "deposit_switch_id",
        "request_id"
      ]
    },
    "DepositSwitchCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "country_code": {
          "type": "string"
        },
        "options": {
          "type": "ref",
          "ref": "DepositSwitchCreateRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "target_access_token": {
          "type": "string"
        },
        "target_account_id": {
          "type": "string"
        }
      },
      "required": [
        "target_access_token",
        "target_account_id"
      ]
    },
    "DepositSwitchCreateRequestOptions": {
      "type": "object",
      "properties": {
        "transaction_item_access_tokens": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccessToken"
          }
        },
        "webhook": {
          "type": "string"
        }
      }
    },
    "DepositSwitchCreateResponse": {
      "type": "object",
      "properties": {
        "deposit_switch_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "deposit_switch_id",
        "request_id"
      ]
    },
    "DepositSwitchGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "deposit_switch_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "deposit_switch_id"
      ]
    },
    "DepositSwitchGetResponse": {
      "type": "object",
      "properties": {
        "account_has_multiple_allocations": {
          "type": "boolean"
        },
        "amount_allocated": {
          "type": "number"
        },
        "date_completed": {
          "type": "string"
        },
        "date_created": {
          "type": "string"
        },
        "deposit_switch_id": {
          "type": "string"
        },
        "employer_id": {
          "type": "string"
        },
        "employer_name": {
          "type": "string"
        },
        "institution_id": {
          "type": "string"
        },
        "institution_name": {
          "type": "string"
        },
        "is_allocated_remainder": {
          "type": "boolean"
        },
        "percent_allocated": {
          "type": "number"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "state": {
          "type": "string"
        },
        "switch_method": {
          "type": "string"
        },
        "target_account_id": {
          "type": "string"
        },
        "target_item_id": {
          "type": "string"
        }
      },
      "required": [
        "deposit_switch_id",
        "target_account_id",
        "target_item_id",
        "state",
        "account_has_multiple_allocations",
        "is_allocated_remainder",
        "percent_allocated",
        "amount_allocated",
        "date_created",
        "date_completed",
        "request_id"
      ]
    },
    "DepositSwitchStateUpdateWebhook": {
      "type": "object",
      "properties": {
        "deposit_switch_id": {
          "type": "string"
        },
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "state": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      }
    },
    "DepositSwitchTargetAccount": {
      "type": "object",
      "properties": {
        "account_name": {
          "type": "string"
        },
        "account_number": {
          "type": "string"
        },
        "account_subtype": {
          "type": "string"
        },
        "routing_number": {
          "type": "string"
        }
      },
      "required": [
        "account_number",
        "routing_number",
        "account_name",
        "account_subtype"
      ]
    },
    "DepositSwitchTargetUser": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "DepositSwitchAddressData"
        },
        "email": {
          "type": "string"
        },
        "family_name": {
          "type": "string"
        },
        "given_name": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "tax_payer_id": {
          "type": "string"
        }
      },
      "required": [
        "given_name",
        "family_name",
        "phone",
        "email"
      ]
    },
    "DepositSwitchTokenCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "deposit_switch_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "deposit_switch_id"
      ]
    },
    "DepositSwitchTokenCreateResponse": {
      "type": "object",
      "properties": {
        "deposit_switch_token": {
          "type": "string"
        },
        "deposit_switch_token_expiration_time": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "deposit_switch_token",
        "deposit_switch_token_expiration_time",
        "request_id"
      ]
    },
    "DepositoryAccount": {
      "type": "string"
    },
    "DepositoryAccountSubtype": {
      "type": "string"
    },
    "DepositoryAccountSubtypes": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "DepositoryAccountSubtype"
      }
    },
    "DepositoryFilter": {
      "type": "object",
      "properties": {
        "account_subtypes": {
          "type": "ref",
          "ref": "DepositoryAccountSubtypes"
        }
      },
      "required": [
        "account_subtypes"
      ]
    },
    "DetailedOriginator": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "string"
        },
        "company_name": {
          "type": "string"
        },
        "transfer_diligence_status": {
          "type": "ref",
          "ref": "TransferDiligenceStatus"
        }
      },
      "required": [
        "client_id",
        "transfer_diligence_status",
        "company_name"
      ]
    },
    "DistributionBreakdown": {
      "type": "object",
      "properties": {
        "account_name": {
          "type": "string"
        },
        "bank_name": {
          "type": "string"
        },
        "current_amount": {
          "type": "number"
        },
        "current_pay": {
          "type": "ref",
          "ref": "Pay"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "mask": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        }
      }
    },
    "DocType": {
      "type": "string"
    },
    "DocumentAnalysis": {
      "type": "object",
      "properties": {
        "authenticity": {
          "type": "ref",
          "ref": "DocumentAuthenticityMatchCode"
        },
        "extracted_data": {
          "type": "ref",
          "ref": "PhysicalDocumentExtractedDataAnalysis"
        },
        "image_quality": {
          "type": "ref",
          "ref": "ImageQuality"
        }
      },
      "required": [
        "authenticity",
        "image_quality",
        "extracted_data"
      ]
    },
    "DocumentAuthenticityMatchCode": {
      "type": "string"
    },
    "DocumentDateOfBirthMatchCode": {
      "type": "string"
    },
    "DocumentImage__Back": {
      "type": "string"
    },
    "DocumentImage__CroppedBack": {
      "type": "string"
    },
    "DocumentImage__CroppedFront": {
      "type": "string"
    },
    "DocumentImage__Face": {
      "type": "string"
    },
    "DocumentImage__Front": {
      "type": "string"
    },
    "DocumentMetadata": {
      "type": "object",
      "properties": {
        "doc_id": {
          "type": "string"
        },
        "doc_type": {
          "type": "ref",
          "ref": "DocType"
        },
        "name": {
          "type": "string"
        },
        "status": {
          "type": "string"
        }
      }
    },
    "DocumentNameMatchCode": {
      "type": "string"
    },
    "DocumentRiskSignal": {
      "type": "object",
      "properties": {
        "actual_value": {
          "type": "string"
        },
        "expected_value": {
          "type": "string"
        },
        "field": {
          "type": "string"
        },
        "has_fraud_risk": {
          "type": "boolean"
        },
        "institution_metadata": {
          "type": "ref",
          "ref": "DocumentRiskSignalInstitutionMetadata"
        },
        "page_number": {
          "type": "number"
        },
        "signal_description": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "field",
        "has_fraud_risk",
        "institution_metadata",
        "expected_value",
        "actual_value",
        "signal_description",
        "page_number"
      ]
    },
    "DocumentRiskSignalInstitutionMetadata": {
      "type": "object",
      "properties": {
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        }
      },
      "required": [
        "item_id"
      ]
    },
    "DocumentRiskSignalsObject": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "multi_document_risk_signals": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MultiDocumentRiskSignal"
          }
        },
        "single_document_risk_signals": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SingleDocumentRiskSignal"
          }
        }
      },
      "required": [
        "account_id",
        "single_document_risk_signals",
        "multi_document_risk_signals"
      ]
    },
    "DocumentRiskSummary": {
      "type": "object",
      "properties": {
        "risk_score": {
          "type": "number"
        }
      },
      "required": [
        "risk_score"
      ]
    },
    "DocumentStatus": {
      "type": "string"
    },
    "DocumentaryVerification": {
      "type": "object",
      "properties": {
        "documents": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DocumentaryVerificationDocument"
          }
        },
        "status": {
          "type": "string"
        }
      },
      "required": [
        "status",
        "documents"
      ]
    },
    "DocumentaryVerificationDocument": {
      "type": "object",
      "properties": {
        "analysis": {
          "type": "ref",
          "ref": "DocumentAnalysis"
        },
        "attempt": {
          "type": "number"
        },
        "extracted_data": {
          "type": "ref",
          "ref": "PhysicalDocumentExtractedData"
        },
        "images": {
          "type": "ref",
          "ref": "PhysicalDocumentImages"
        },
        "redacted_at": {
          "type": "ref",
          "ref": "TimestampNullable"
        },
        "status": {
          "type": "ref",
          "ref": "DocumentStatus"
        }
      },
      "required": [
        "analysis",
        "attempt",
        "extracted_data",
        "images",
        "status",
        "redacted_at"
      ]
    },
    "Earnings": {
      "type": "object",
      "properties": {
        "breakdown": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EarningsBreakdown"
          }
        },
        "subtotals": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EarningsTotal"
          }
        },
        "total": {
          "type": "ref",
          "ref": "EarningsTotal"
        },
        "totals": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EarningsTotal"
          }
        }
      }
    },
    "EarningsBreakdown": {
      "type": "object",
      "properties": {
        "canonical_description": {
          "type": "ref",
          "ref": "EarningsBreakdownCanonicalDescription"
        },
        "current_amount": {
          "type": "number"
        },
        "description": {
          "type": "string"
        },
        "hours": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "rate": {
          "type": "number"
        },
        "unofficial_currency_code": {
          "type": "string"
        },
        "ytd_amount": {
          "type": "number"
        }
      }
    },
    "EarningsBreakdownCanonicalDescription": {
      "type": "string"
    },
    "EarningsTotal": {
      "type": "object",
      "properties": {
        "current_amount": {
          "type": "number"
        },
        "current_pay": {
          "type": "ref",
          "ref": "Pay"
        },
        "hours": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        },
        "ytd_amount": {
          "type": "number"
        },
        "ytd_pay": {
          "type": "ref",
          "ref": "Pay"
        }
      }
    },
    "Email": {
      "type": "object",
      "properties": {
        "data": {
          "type": "string"
        },
        "primary": {
          "type": "boolean"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "data",
        "primary",
        "type"
      ]
    },
    "EmailAddress": {
      "type": "string"
    },
    "EmailAddressMatchScore": {
      "type": "object",
      "properties": {
        "score": {
          "type": "number"
        }
      }
    },
    "EmailAddressNullable": {
      "type": "string"
    },
    "Employee": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "PaystubAddress"
        },
        "marital_status": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "taxpayer_id": {
          "type": "ref",
          "ref": "TaxpayerID"
        }
      },
      "required": [
        "name",
        "address"
      ]
    },
    "EmployeeIncomeSummaryFieldString": {
      "type": "ref",
      "ref": "IncomeSummaryFieldString"
    },
    "Employer": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "AddressDataNullable"
        },
        "confidence_score": {
          "type": "number"
        },
        "employer_id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "employer_id",
        "name",
        "address",
        "confidence_score"
      ]
    },
    "EmployerIncomeSummaryFieldString": {
      "type": "ref",
      "ref": "IncomeSummaryFieldString"
    },
    "EmployerVerification": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      }
    },
    "EmployersSearchRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "products": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "query": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "query",
        "products"
      ]
    },
    "EmployersSearchResponse": {
      "type": "object",
      "properties": {
        "employers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Employer"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "employers",
        "request_id"
      ]
    },
    "EmploymentDetails": {
      "type": "object",
      "properties": {
        "annual_salary": {
          "type": "ref",
          "ref": "Pay"
        },
        "hire_date": {
          "type": "string"
        }
      }
    },
    "EmploymentSourceType": {
      "type": "string"
    },
    "EmploymentVerification": {
      "type": "object",
      "properties": {
        "employer": {
          "type": "ref",
          "ref": "EmployerVerification"
        },
        "end_date": {
          "type": "string"
        },
        "platform_ids": {
          "type": "ref",
          "ref": "PlatformIds"
        },
        "start_date": {
          "type": "string"
        },
        "status": {
          "type": "ref",
          "ref": "EmploymentVerificationStatus"
        },
        "title": {
          "type": "string"
        }
      }
    },
    "EmploymentVerificationGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "EmploymentVerificationGetResponse": {
      "type": "object",
      "properties": {
        "employments": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EmploymentVerification"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "employments",
        "request_id"
      ]
    },
    "EmploymentVerificationStatus": {
      "type": "string"
    },
    "Enhancements": {
      "type": "object",
      "properties": {
        "category": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "category_id": {
          "type": "string"
        },
        "check_number": {
          "type": "string"
        },
        "counterparties": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Counterparty"
          }
        },
        "location": {
          "type": "ref",
          "ref": "Location"
        },
        "logo_url": {
          "type": "string"
        },
        "merchant_name": {
          "type": "string"
        },
        "payment_channel": {
          "type": "ref",
          "ref": "PaymentChannel"
        },
        "personal_finance_category": {
          "type": "ref",
          "ref": "PersonalFinanceCategory"
        },
        "personal_finance_category_icon_url": {
          "type": "string"
        },
        "website": {
          "type": "string"
        }
      },
      "required": [
        "payment_channel",
        "location",
        "category",
        "category_id"
      ]
    },
    "EnrichTransactionDirection": {
      "type": "string"
    },
    "Enrichments": {
      "type": "object",
      "properties": {
        "check_number": {
          "type": "string"
        },
        "counterparties": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Counterparty"
          }
        },
        "entity_id": {
          "type": "string"
        },
        "legacy_category": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "legacy_category_id": {
          "type": "string"
        },
        "location": {
          "type": "ref",
          "ref": "Location"
        },
        "logo_url": {
          "type": "string"
        },
        "merchant_name": {
          "type": "string"
        },
        "payment_channel": {
          "type": "ref",
          "ref": "PaymentChannel"
        },
        "personal_finance_category": {
          "type": "ref",
          "ref": "PersonalFinanceCategory"
        },
        "personal_finance_category_icon_url": {
          "type": "string"
        },
        "website": {
          "type": "string"
        }
      },
      "required": [
        "payment_channel",
        "location",
        "personal_finance_category",
        "personal_finance_category_icon_url",
        "logo_url",
        "website",
        "counterparties",
        "merchant_name"
      ]
    },
    "EntityDocument": {
      "type": "object",
      "properties": {
        "number": {
          "type": "ref",
          "ref": "WatchlistScreeningDocumentValue"
        },
        "type": {
          "type": "ref",
          "ref": "EntityDocumentType"
        }
      },
      "required": [
        "type",
        "number"
      ]
    },
    "EntityDocumentType": {
      "type": "string"
    },
    "EntityScreeningHitAnalysis": {
      "type": "object",
      "properties": {
        "documents": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        },
        "email_addresses": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        },
        "locations": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        },
        "names": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        },
        "phone_numbers": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        },
        "search_terms_version": {
          "type": "number"
        },
        "urls": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        }
      },
      "required": [
        "search_terms_version"
      ]
    },
    "EntityScreeningHitData": {
      "type": "object",
      "properties": {
        "documents": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityScreeningHitDocumentsItems"
          }
        },
        "email_addresses": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityScreeningHitEmailsItems"
          }
        },
        "locations": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GenericScreeningHitLocationItems"
          }
        },
        "names": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityScreeningHitNamesItems"
          }
        },
        "phone_numbers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityScreeningHitsPhoneNumberItems"
          }
        },
        "urls": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityScreeningHitUrlsItems"
          }
        }
      }
    },
    "EntityScreeningHitDocumentsItems": {
      "type": "object",
      "properties": {
        "analysis": {
          "type": "ref",
          "ref": "MatchSummary"
        },
        "data": {
          "type": "ref",
          "ref": "EntityDocument"
        }
      }
    },
    "EntityScreeningHitEmails": {
      "type": "object",
      "properties": {
        "email_address": {
          "type": "ref",
          "ref": "EmailAddress"
        }
      },
      "required": [
        "email_address"
      ]
    },
    "EntityScreeningHitEmailsItems": {
      "type": "object",
      "properties": {
        "analysis": {
          "type": "ref",
          "ref": "MatchSummary"
        },
        "data": {
          "type": "ref",
          "ref": "EntityScreeningHitEmails"
        }
      }
    },
    "EntityScreeningHitNames": {
      "type": "object",
      "properties": {
        "full": {
          "type": "string"
        },
        "is_primary": {
          "type": "boolean"
        },
        "weak_alias_determination": {
          "type": "ref",
          "ref": "WeakAliasDetermination"
        }
      },
      "required": [
        "full",
        "is_primary",
        "weak_alias_determination"
      ]
    },
    "EntityScreeningHitNamesItems": {
      "type": "object",
      "properties": {
        "analysis": {
          "type": "ref",
          "ref": "MatchSummary"
        },
        "data": {
          "type": "ref",
          "ref": "EntityScreeningHitNames"
        }
      }
    },
    "EntityScreeningHitPhoneNumbers": {
      "type": "object",
      "properties": {
        "phone_number": {
          "type": "ref",
          "ref": "WatchlistScreeningPhoneNumber"
        },
        "type": {
          "type": "ref",
          "ref": "PhoneType"
        }
      },
      "required": [
        "type",
        "phone_number"
      ]
    },
    "EntityScreeningHitUrls": {
      "type": "object",
      "properties": {
        "url": {
          "type": "ref",
          "ref": "URL"
        }
      },
      "required": [
        "url"
      ]
    },
    "EntityScreeningHitUrlsItems": {
      "type": "object",
      "properties": {
        "analysis": {
          "type": "ref",
          "ref": "MatchSummary"
        },
        "data": {
          "type": "ref",
          "ref": "EntityScreeningHitUrls"
        }
      }
    },
    "EntityScreeningHitsPhoneNumberItems": {
      "type": "object",
      "properties": {
        "analysis": {
          "type": "ref",
          "ref": "MatchSummary"
        },
        "data": {
          "type": "ref",
          "ref": "EntityScreeningHitPhoneNumbers"
        }
      }
    },
    "EntityScreeningStatusUpdatedWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "screening_id": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "screening_id",
        "environment"
      ]
    },
    "EntityWatchlistCode": {
      "type": "string"
    },
    "EntityWatchlistProgram": {
      "type": "object",
      "properties": {
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "created_at": {
          "type": "ref",
          "ref": "Timestamp"
        },
        "id": {
          "type": "ref",
          "ref": "EntityWatchlistProgramID"
        },
        "is_archived": {
          "type": "ref",
          "ref": "ProgramArchived"
        },
        "is_rescanning_enabled": {
          "type": "boolean"
        },
        "lists_enabled": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityWatchlistCode"
          }
        },
        "name": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningProgramName"
        },
        "name_sensitivity": {
          "type": "ref",
          "ref": "ProgramNameSensitivity"
        }
      },
      "required": [
        "id",
        "created_at",
        "is_rescanning_enabled",
        "lists_enabled",
        "name",
        "name_sensitivity",
        "audit_trail",
        "is_archived"
      ]
    },
    "EntityWatchlistProgramID": {
      "type": "string"
    },
    "EntityWatchlistScreening": {
      "type": "object",
      "properties": {
        "assignee": {
          "type": "ref",
          "ref": "DashboardUserIDNullable"
        },
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserIDNullable"
        },
        "id": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningID"
        },
        "search_terms": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningSearchTerms"
        },
        "status": {
          "type": "ref",
          "ref": "WatchlistScreeningStatus"
        }
      },
      "required": [
        "id",
        "search_terms",
        "assignee",
        "status",
        "client_user_id",
        "audit_trail"
      ]
    },
    "EntityWatchlistScreeningHit": {
      "type": "object",
      "properties": {
        "analysis": {
          "type": "ref",
          "ref": "EntityScreeningHitAnalysis"
        },
        "data": {
          "type": "ref",
          "ref": "EntityScreeningHitData"
        },
        "first_active": {
          "type": "ref",
          "ref": "Timestamp"
        },
        "historical_since": {
          "type": "ref",
          "ref": "TimestampNullable"
        },
        "id": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningHitID"
        },
        "inactive_since": {
          "type": "ref",
          "ref": "TimestampNullable"
        },
        "list_code": {
          "type": "ref",
          "ref": "EntityWatchlistCode"
        },
        "plaid_uid": {
          "type": "ref",
          "ref": "InternalUID"
        },
        "review_status": {
          "type": "ref",
          "ref": "WatchlistScreeningHitStatus"
        },
        "source_uid": {
          "type": "ref",
          "ref": "SourceUID"
        }
      },
      "required": [
        "id",
        "review_status",
        "first_active",
        "inactive_since",
        "historical_since",
        "list_code",
        "plaid_uid",
        "source_uid"
      ]
    },
    "EntityWatchlistScreeningHitID": {
      "type": "string"
    },
    "EntityWatchlistScreeningID": {
      "type": "string"
    },
    "EntityWatchlistScreeningName": {
      "type": "string"
    },
    "EntityWatchlistScreeningProgramName": {
      "type": "string"
    },
    "EntityWatchlistScreeningReview": {
      "type": "object",
      "properties": {
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "comment": {
          "type": "ref",
          "ref": "ReviewComment"
        },
        "confirmed_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityWatchlistScreeningHitID"
          }
        },
        "dismissed_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityWatchlistScreeningHitID"
          }
        },
        "id": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningReviewID"
        }
      },
      "required": [
        "id",
        "confirmed_hits",
        "dismissed_hits",
        "comment",
        "audit_trail"
      ]
    },
    "EntityWatchlistScreeningReviewID": {
      "type": "string"
    },
    "EntityWatchlistScreeningSearchTerms": {
      "type": "object",
      "properties": {
        "country": {
          "type": "ref",
          "ref": "GenericCountryCodeNullable"
        },
        "document_number": {
          "type": "ref",
          "ref": "WatchlistScreeningDocumentValueNullable"
        },
        "email_address": {
          "type": "ref",
          "ref": "EmailAddressNullable"
        },
        "entity_watchlist_program_id": {
          "type": "ref",
          "ref": "EntityWatchlistProgramID"
        },
        "legal_name": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningName"
        },
        "phone_number": {
          "type": "ref",
          "ref": "WatchlistScreeningPhoneNumberNullable"
        },
        "url": {
          "type": "ref",
          "ref": "URLNullable"
        },
        "version": {
          "type": "number"
        }
      },
      "required": [
        "entity_watchlist_program_id",
        "legal_name",
        "document_number",
        "email_address",
        "country",
        "phone_number",
        "url",
        "version"
      ]
    },
    "EntityWatchlistSearchTerms": {
      "type": "object",
      "properties": {
        "country": {
          "type": "ref",
          "ref": "GenericCountryCodeNullable"
        },
        "document_number": {
          "type": "ref",
          "ref": "WatchlistScreeningDocumentValueNullable"
        },
        "email_address": {
          "type": "ref",
          "ref": "EmailAddressNullable"
        },
        "entity_watchlist_program_id": {
          "type": "ref",
          "ref": "EntityWatchlistProgramID"
        },
        "legal_name": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningName"
        },
        "phone_number": {
          "type": "ref",
          "ref": "WatchlistScreeningPhoneNumberNullable"
        },
        "url": {
          "type": "ref",
          "ref": "URLNullable"
        }
      },
      "required": [
        "entity_watchlist_program_id",
        "legal_name"
      ]
    },
    "ExpirationDate": {
      "type": "string"
    },
    "ExternalPaymentInitiationConsentOptions": {
      "type": "object",
      "properties": {
        "bacs": {
          "type": "ref",
          "ref": "PaymentInitiationOptionalRestrictionBacs"
        },
        "iban": {
          "type": "string"
        },
        "request_refund_details": {
          "type": "boolean"
        }
      }
    },
    "ExternalPaymentOptions": {
      "type": "object",
      "properties": {
        "bacs": {
          "type": "ref",
          "ref": "PaymentInitiationOptionalRestrictionBacs"
        },
        "iban": {
          "type": "string"
        },
        "request_refund_details": {
          "type": "boolean"
        },
        "scheme": {
          "type": "ref",
          "ref": "PaymentScheme"
        }
      }
    },
    "ExternalPaymentRefundDetails": {
      "type": "object",
      "properties": {
        "bacs": {
          "type": "ref",
          "ref": "RecipientBACSNullable"
        },
        "iban": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "iban",
        "bacs"
      ]
    },
    "ExternalPaymentScheduleBase": {
      "type": "object",
      "properties": {
        "adjusted_start_date": {
          "type": "string"
        },
        "end_date": {
          "type": "string"
        },
        "interval": {
          "type": "ref",
          "ref": "PaymentScheduleInterval"
        },
        "interval_execution_day": {
          "type": "number"
        },
        "start_date": {
          "type": "string"
        }
      }
    },
    "ExternalPaymentScheduleGet": {
      "type": "ref",
      "ref": "ExternalPaymentScheduleBase"
    },
    "ExternalPaymentScheduleRequest": {
      "type": "ref",
      "ref": "ExternalPaymentScheduleBase"
    },
    "FDXContentTypes": {
      "type": "string"
    },
    "FDXFiAttribute": {
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
    "FDXHateoasLink": {
      "type": "object",
      "properties": {
        "action": {
          "type": "ref",
          "ref": "FDXHateoasLinkAction"
        },
        "href": {
          "type": "string"
        },
        "rel": {
          "type": "string"
        },
        "types": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "FDXContentTypes"
          }
        }
      },
      "required": [
        "href"
      ]
    },
    "FDXHateoasLinkAction": {
      "type": "string"
    },
    "FDXNotification": {
      "type": "object",
      "properties": {
        "category": {
          "type": "ref",
          "ref": "FDXNotificationCategory"
        },
        "notificationId": {
          "type": "string"
        },
        "notificationPayload": {
          "type": "ref",
          "ref": "FDXNotificationPayload"
        },
        "priority": {
          "type": "ref",
          "ref": "FDXNotificationPriority"
        },
        "publisher": {
          "type": "ref",
          "ref": "FDXParty"
        },
        "sentOn": {
          "type": "ref",
          "ref": "FDXTimestamp"
        },
        "severity": {
          "type": "ref",
          "ref": "FDXNotificationSeverity"
        },
        "subscriber": {
          "type": "ref",
          "ref": "FDXParty"
        },
        "type": {
          "type": "ref",
          "ref": "FDXNotificationType"
        },
        "url": {
          "type": "ref",
          "ref": "FDXHateoasLink"
        }
      },
      "required": [
        "notificationId",
        "type",
        "sentOn",
        "category",
        "publisher",
        "notificationPayload"
      ]
    },
    "FDXNotificationCategory": {
      "type": "string"
    },
    "FDXNotificationPayload": {
      "type": "object",
      "properties": {
        "customFields": {
          "type": "ref",
          "ref": "FDXFiAttribute"
        },
        "id": {
          "type": "string"
        },
        "idType": {
          "type": "ref",
          "ref": "FDXNotificationPayloadIdType"
        }
      }
    },
    "FDXNotificationPayloadIdType": {
      "type": "string"
    },
    "FDXNotificationPriority": {
      "type": "string"
    },
    "FDXNotificationSeverity": {
      "type": "string"
    },
    "FDXNotificationType": {
      "type": "string"
    },
    "FDXParty": {
      "type": "object",
      "properties": {
        "homeUri": {
          "type": "string"
        },
        "logoUri": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "registeredEntityId": {
          "type": "string"
        },
        "registeredEntityName": {
          "type": "string"
        },
        "registry": {
          "type": "ref",
          "ref": "FDXPartyRegistry"
        },
        "type": {
          "type": "ref",
          "ref": "FDXPartyType"
        }
      },
      "required": [
        "name",
        "type"
      ]
    },
    "FDXPartyRegistry": {
      "type": "string"
    },
    "FDXPartyType": {
      "type": "string"
    },
    "FDXTimestamp": {
      "type": "string"
    },
    "FallbackAuthMicrodepositAutoVerifiedWebhook": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "string"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "account_id",
        "item_id",
        "environment"
      ]
    },
    "FallbackAuthMicrodepositVerificationExpiredWebhook": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "string"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "account_id",
        "item_id",
        "environment"
      ]
    },
    "FamilyNameField": {
      "type": "string"
    },
    "Form1099Type": {
      "type": "string"
    },
    "FreddieReportType": {
      "type": "string"
    },
    "GenericCountryCode": {
      "type": "string"
    },
    "GenericCountryCodeNullable": {
      "type": "string"
    },
    "GenericScreeningHitLocationItems": {
      "type": "object",
      "properties": {
        "analysis": {
          "type": "ref",
          "ref": "MatchSummary"
        },
        "data": {
          "type": "ref",
          "ref": "WatchlistScreeningHitLocations"
        }
      }
    },
    "GivenNameField": {
      "type": "string"
    },
    "HealthIncident": {
      "type": "object",
      "properties": {
        "end_date": {
          "type": "string"
        },
        "incident_updates": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "IncidentUpdate"
          }
        },
        "start_date": {
          "type": "string"
        },
        "title": {
          "type": "string"
        }
      },
      "required": [
        "start_date",
        "title",
        "incident_updates"
      ]
    },
    "HistoricalBalance": {
      "type": "object",
      "properties": {
        "current": {
          "type": "number"
        },
        "date": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        }
      },
      "required": [
        "date",
        "current",
        "iso_currency_code",
        "unofficial_currency_code"
      ]
    },
    "HistoricalUpdateWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "new_transactions": {
          "type": "number"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "new_transactions",
        "item_id",
        "environment"
      ]
    },
    "Holding": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "cost_basis": {
          "type": "number"
        },
        "institution_price": {
          "type": "number"
        },
        "institution_price_as_of": {
          "type": "string"
        },
        "institution_price_datetime": {
          "type": "string"
        },
        "institution_value": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "quantity": {
          "type": "number"
        },
        "security_id": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        }
      },
      "required": [
        "account_id",
        "security_id",
        "institution_price",
        "institution_value",
        "cost_basis",
        "quantity",
        "iso_currency_code",
        "unofficial_currency_code"
      ]
    },
    "HoldingsDefaultUpdateWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "new_holdings": {
          "type": "number"
        },
        "updated_holdings": {
          "type": "number"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "item_id",
        "new_holdings",
        "updated_holdings",
        "environment"
      ]
    },
    "HoldingsOverride": {
      "type": "object",
      "properties": {
        "cost_basis": {
          "type": "number"
        },
        "currency": {
          "type": "string"
        },
        "institution_price": {
          "type": "number"
        },
        "institution_price_as_of": {
          "type": "string"
        },
        "quantity": {
          "type": "number"
        },
        "security": {
          "type": "ref",
          "ref": "SecurityOverride"
        }
      },
      "required": [
        "institution_price",
        "quantity",
        "currency",
        "security"
      ]
    },
    "IDNumberType": {
      "type": "string"
    },
    "IDNumberValue": {
      "type": "string"
    },
    "IPAddress": {
      "type": "string"
    },
    "ISO8601Date": {
      "type": "string"
    },
    "ISO8601DateNullable": {
      "type": "string"
    },
    "IdempotencyFlag": {
      "type": "boolean"
    },
    "IdentityDefaultUpdateWebhook": {
      "type": "object",
      "properties": {
        "account_ids_with_updated_identity": {
          "type": "ref",
          "ref": "AccountIdsWithUpdatedIdentity"
        },
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "item_id",
        "error",
        "account_ids_with_updated_identity",
        "environment"
      ]
    },
    "IdentityGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "IdentityGetRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "IdentityGetRequestOptions": {
      "type": "object",
      "properties": {
        "account_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "IdentityGetResponse": {
      "type": "object",
      "properties": {
        "accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountIdentity"
          }
        },
        "item": {
          "type": "ref",
          "ref": "Item"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "accounts",
        "item",
        "request_id"
      ]
    },
    "IdentityMatchRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "IdentityMatchRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user": {
          "type": "ref",
          "ref": "IdentityMatchUser"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "IdentityMatchRequestOptions": {
      "type": "object",
      "properties": {
        "account_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "IdentityMatchResponse": {
      "type": "object",
      "properties": {
        "accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountIdentityMatchScore"
          }
        },
        "item": {
          "type": "ref",
          "ref": "Item"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "accounts",
        "item",
        "request_id"
      ]
    },
    "IdentityMatchUser": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "AddressDataNullable"
        },
        "email_address": {
          "type": "string"
        },
        "legal_name": {
          "type": "string"
        },
        "phone_number": {
          "type": "string"
        }
      }
    },
    "IdentityUpdateTypes": {
      "type": "string"
    },
    "IdentityVerification": {
      "type": "object",
      "properties": {
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserID"
        },
        "completed_at": {
          "type": "ref",
          "ref": "TimestampNullable"
        },
        "created_at": {
          "type": "ref",
          "ref": "Timestamp"
        },
        "documentary_verification": {
          "type": "ref",
          "ref": "DocumentaryVerification"
        },
        "id": {
          "type": "ref",
          "ref": "IdentityVerificationID"
        },
        "kyc_check": {
          "type": "ref",
          "ref": "KYCCheckDetails"
        },
        "previous_attempt_id": {
          "type": "ref",
          "ref": "PreviousIdentityVerificationAttemptID"
        },
        "redacted_at": {
          "type": "ref",
          "ref": "TimestampNullable"
        },
        "shareable_url": {
          "type": "ref",
          "ref": "ShareableURL"
        },
        "status": {
          "type": "ref",
          "ref": "IdentityVerificationStatus"
        },
        "steps": {
          "type": "ref",
          "ref": "IdentityVerificationStepSummary"
        },
        "template": {
          "type": "ref",
          "ref": "IdentityVerificationTemplateReference"
        },
        "user": {
          "type": "ref",
          "ref": "IdentityVerificationUserData"
        },
        "watchlist_screening_id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualIDNullable"
        }
      },
      "required": [
        "id",
        "client_user_id",
        "created_at",
        "completed_at",
        "previous_attempt_id",
        "shareable_url",
        "template",
        "user",
        "status",
        "steps",
        "documentary_verification",
        "kyc_check",
        "watchlist_screening_id",
        "redacted_at"
      ]
    },
    "IdentityVerificationConsent": {
      "type": "boolean"
    },
    "IdentityVerificationCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "gave_consent": {
          "type": "ref",
          "ref": "IdentityVerificationConsent"
        },
        "is_idempotent": {
          "type": "ref",
          "ref": "IdempotencyFlag"
        },
        "is_shareable": {
          "type": "boolean"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "template_id": {
          "type": "ref",
          "ref": "IdentityVerificationTemplateID"
        },
        "user": {
          "type": "ref",
          "ref": "IdentityVerificationRequestUser"
        }
      },
      "required": [
        "is_shareable",
        "template_id",
        "user",
        "gave_consent"
      ]
    },
    "IdentityVerificationCreateResponse": {
      "type": "object",
      "properties": {
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserID"
        },
        "completed_at": {
          "type": "ref",
          "ref": "TimestampNullable"
        },
        "created_at": {
          "type": "ref",
          "ref": "Timestamp"
        },
        "documentary_verification": {
          "type": "ref",
          "ref": "DocumentaryVerification"
        },
        "id": {
          "type": "ref",
          "ref": "IdentityVerificationID"
        },
        "kyc_check": {
          "type": "ref",
          "ref": "KYCCheckDetails"
        },
        "previous_attempt_id": {
          "type": "ref",
          "ref": "PreviousIdentityVerificationAttemptID"
        },
        "redacted_at": {
          "type": "ref",
          "ref": "TimestampNullable"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "shareable_url": {
          "type": "ref",
          "ref": "ShareableURL"
        },
        "status": {
          "type": "ref",
          "ref": "IdentityVerificationStatus"
        },
        "steps": {
          "type": "ref",
          "ref": "IdentityVerificationStepSummary"
        },
        "template": {
          "type": "ref",
          "ref": "IdentityVerificationTemplateReference"
        },
        "user": {
          "type": "ref",
          "ref": "IdentityVerificationUserData"
        },
        "watchlist_screening_id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualIDNullable"
        }
      },
      "required": [
        "id",
        "client_user_id",
        "created_at",
        "completed_at",
        "previous_attempt_id",
        "shareable_url",
        "template",
        "user",
        "status",
        "steps",
        "documentary_verification",
        "kyc_check",
        "watchlist_screening_id",
        "redacted_at",
        "request_id"
      ]
    },
    "IdentityVerificationGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "identity_verification_id": {
          "type": "ref",
          "ref": "IdentityVerificationID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "identity_verification_id"
      ]
    },
    "IdentityVerificationGetResponse": {
      "type": "object",
      "properties": {
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserID"
        },
        "completed_at": {
          "type": "ref",
          "ref": "TimestampNullable"
        },
        "created_at": {
          "type": "ref",
          "ref": "Timestamp"
        },
        "documentary_verification": {
          "type": "ref",
          "ref": "DocumentaryVerification"
        },
        "id": {
          "type": "ref",
          "ref": "IdentityVerificationID"
        },
        "kyc_check": {
          "type": "ref",
          "ref": "KYCCheckDetails"
        },
        "previous_attempt_id": {
          "type": "ref",
          "ref": "PreviousIdentityVerificationAttemptID"
        },
        "redacted_at": {
          "type": "ref",
          "ref": "TimestampNullable"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "shareable_url": {
          "type": "ref",
          "ref": "ShareableURL"
        },
        "status": {
          "type": "ref",
          "ref": "IdentityVerificationStatus"
        },
        "steps": {
          "type": "ref",
          "ref": "IdentityVerificationStepSummary"
        },
        "template": {
          "type": "ref",
          "ref": "IdentityVerificationTemplateReference"
        },
        "user": {
          "type": "ref",
          "ref": "IdentityVerificationUserData"
        },
        "watchlist_screening_id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualIDNullable"
        }
      },
      "required": [
        "id",
        "client_user_id",
        "created_at",
        "completed_at",
        "previous_attempt_id",
        "shareable_url",
        "template",
        "user",
        "status",
        "steps",
        "documentary_verification",
        "kyc_check",
        "watchlist_screening_id",
        "redacted_at",
        "request_id"
      ]
    },
    "IdentityVerificationID": {
      "type": "string"
    },
    "IdentityVerificationListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserID"
        },
        "cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "template_id": {
          "type": "ref",
          "ref": "IdentityVerificationTemplateID"
        }
      },
      "required": [
        "template_id",
        "client_user_id"
      ]
    },
    "IdentityVerificationListResponse": {
      "type": "object",
      "properties": {
        "identity_verifications": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "IdentityVerification"
          }
        },
        "next_cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "identity_verifications",
        "next_cursor",
        "request_id"
      ]
    },
    "IdentityVerificationRequestUser": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "UserAddress"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserID"
        },
        "date_of_birth": {
          "type": "ref",
          "ref": "ISO8601Date"
        },
        "email_address": {
          "type": "ref",
          "ref": "EmailAddress"
        },
        "id_number": {
          "type": "ref",
          "ref": "UserIDNumber"
        },
        "name": {
          "type": "ref",
          "ref": "UserName"
        },
        "phone_number": {
          "type": "ref",
          "ref": "IdentityVerificationUserPhoneNumber"
        }
      },
      "required": [
        "client_user_id"
      ]
    },
    "IdentityVerificationRetriedWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "identity_verification_id": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "identity_verification_id",
        "environment"
      ]
    },
    "IdentityVerificationRetryRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "steps": {
          "type": "ref",
          "ref": "IdentityVerificationRetryRequestStepsObject"
        },
        "strategy": {
          "type": "ref",
          "ref": "Strategy"
        },
        "template_id": {
          "type": "ref",
          "ref": "IdentityVerificationTemplateID"
        }
      },
      "required": [
        "client_user_id",
        "strategy",
        "template_id"
      ]
    },
    "IdentityVerificationRetryRequestStepsObject": {
      "type": "object",
      "properties": {
        "documentary_verification": {
          "type": "boolean"
        },
        "kyc_check": {
          "type": "boolean"
        },
        "selfie_check": {
          "type": "boolean"
        },
        "verify_sms": {
          "type": "boolean"
        }
      },
      "required": [
        "verify_sms",
        "kyc_check",
        "documentary_verification",
        "selfie_check"
      ]
    },
    "IdentityVerificationRetryResponse": {
      "type": "object",
      "properties": {
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserID"
        },
        "completed_at": {
          "type": "ref",
          "ref": "TimestampNullable"
        },
        "created_at": {
          "type": "ref",
          "ref": "Timestamp"
        },
        "documentary_verification": {
          "type": "ref",
          "ref": "DocumentaryVerification"
        },
        "id": {
          "type": "ref",
          "ref": "IdentityVerificationID"
        },
        "kyc_check": {
          "type": "ref",
          "ref": "KYCCheckDetails"
        },
        "previous_attempt_id": {
          "type": "ref",
          "ref": "PreviousIdentityVerificationAttemptID"
        },
        "redacted_at": {
          "type": "ref",
          "ref": "TimestampNullable"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "shareable_url": {
          "type": "ref",
          "ref": "ShareableURL"
        },
        "status": {
          "type": "ref",
          "ref": "IdentityVerificationStatus"
        },
        "steps": {
          "type": "ref",
          "ref": "IdentityVerificationStepSummary"
        },
        "template": {
          "type": "ref",
          "ref": "IdentityVerificationTemplateReference"
        },
        "user": {
          "type": "ref",
          "ref": "IdentityVerificationUserData"
        },
        "watchlist_screening_id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualIDNullable"
        }
      },
      "required": [
        "id",
        "client_user_id",
        "created_at",
        "completed_at",
        "previous_attempt_id",
        "shareable_url",
        "template",
        "user",
        "status",
        "steps",
        "documentary_verification",
        "kyc_check",
        "watchlist_screening_id",
        "redacted_at",
        "request_id"
      ]
    },
    "IdentityVerificationStatus": {
      "type": "string"
    },
    "IdentityVerificationStatusUpdatedWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "identity_verification_id": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "identity_verification_id",
        "environment"
      ]
    },
    "IdentityVerificationStepStatus": {
      "type": "string"
    },
    "IdentityVerificationStepSummary": {
      "type": "object",
      "properties": {
        "accept_tos": {
          "type": "ref",
          "ref": "IdentityVerificationStepStatus"
        },
        "documentary_verification": {
          "type": "ref",
          "ref": "IdentityVerificationStepStatus"
        },
        "kyc_check": {
          "type": "ref",
          "ref": "IdentityVerificationStepStatus"
        },
        "risk_check": {
          "type": "ref",
          "ref": "IdentityVerificationStepStatus"
        },
        "selfie_check": {
          "type": "ref",
          "ref": "IdentityVerificationStepStatus"
        },
        "verify_sms": {
          "type": "ref",
          "ref": "IdentityVerificationStepStatus"
        },
        "watchlist_screening": {
          "type": "ref",
          "ref": "IdentityVerificationStepStatus"
        }
      },
      "required": [
        "accept_tos",
        "verify_sms",
        "kyc_check",
        "documentary_verification",
        "selfie_check",
        "watchlist_screening",
        "risk_check"
      ]
    },
    "IdentityVerificationStepUpdatedWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "identity_verification_id": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "identity_verification_id",
        "environment"
      ]
    },
    "IdentityVerificationTemplateID": {
      "type": "string"
    },
    "IdentityVerificationTemplateReference": {
      "type": "object",
      "properties": {
        "id": {
          "type": "ref",
          "ref": "IdentityVerificationTemplateID"
        },
        "version": {
          "type": "ref",
          "ref": "IdentityVerificationTemplateVersion"
        }
      },
      "required": [
        "id",
        "version"
      ]
    },
    "IdentityVerificationTemplateVersion": {
      "type": "number"
    },
    "IdentityVerificationUserAddress": {
      "type": "object",
      "properties": {
        "city": {
          "type": "ref",
          "ref": "CityNullable"
        },
        "country": {
          "type": "ref",
          "ref": "GenericCountryCode"
        },
        "postal_code": {
          "type": "ref",
          "ref": "PostalCodeNullable"
        },
        "region": {
          "type": "ref",
          "ref": "RegionNullable"
        },
        "street": {
          "type": "ref",
          "ref": "StreetNullable"
        },
        "street2": {
          "type": "ref",
          "ref": "Street2"
        }
      },
      "required": [
        "street",
        "street2",
        "city",
        "region",
        "postal_code",
        "country"
      ]
    },
    "IdentityVerificationUserData": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "IdentityVerificationUserAddress"
        },
        "date_of_birth": {
          "type": "ref",
          "ref": "ISO8601DateNullable"
        },
        "email_address": {
          "type": "ref",
          "ref": "EmailAddressNullable"
        },
        "id_number": {
          "type": "ref",
          "ref": "UserIDNumber"
        },
        "ip_address": {
          "type": "ref",
          "ref": "IPAddress"
        },
        "name": {
          "type": "ref",
          "ref": "UserName"
        },
        "phone_number": {
          "type": "ref",
          "ref": "IdentityVerificationUserPhoneNumber"
        }
      },
      "required": [
        "date_of_birth",
        "email_address",
        "ip_address",
        "name",
        "address",
        "id_number"
      ]
    },
    "IdentityVerificationUserPhoneNumber": {
      "type": "string"
    },
    "ImageQuality": {
      "type": "string"
    },
    "IncidentUpdate": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "updated_date": {
          "type": "string"
        }
      }
    },
    "IncomeBreakdown": {
      "type": "object",
      "properties": {
        "hours": {
          "type": "number"
        },
        "rate": {
          "type": "number"
        },
        "total": {
          "type": "number"
        },
        "type": {
          "type": "ref",
          "ref": "IncomeBreakdownType"
        }
      },
      "required": [
        "type",
        "rate",
        "hours",
        "total"
      ]
    },
    "IncomeBreakdownType": {
      "type": "string"
    },
    "IncomeOverride": {
      "type": "object",
      "properties": {
        "paystubs": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PaystubOverride"
          }
        }
      }
    },
    "IncomeSummary": {
      "type": "object",
      "properties": {
        "employee_name": {
          "type": "ref",
          "ref": "EmployeeIncomeSummaryFieldString"
        },
        "employer_name": {
          "type": "ref",
          "ref": "EmployerIncomeSummaryFieldString"
        },
        "pay_frequency": {
          "type": "ref",
          "ref": "PayFrequency"
        },
        "projected_wage": {
          "type": "ref",
          "ref": "ProjectedIncomeSummaryFieldNumber"
        },
        "verified_transaction": {
          "type": "ref",
          "ref": "TransactionData"
        },
        "ytd_gross_income": {
          "type": "ref",
          "ref": "YTDGrossIncomeSummaryFieldNumber"
        },
        "ytd_net_income": {
          "type": "ref",
          "ref": "YTDNetIncomeSummaryFieldNumber"
        }
      },
      "required": [
        "employer_name",
        "employee_name",
        "ytd_gross_income",
        "ytd_net_income",
        "pay_frequency",
        "projected_wage",
        "verified_transaction"
      ]
    },
    "IncomeSummaryFieldNumber": {
      "type": "object",
      "properties": {
        "value": {
          "type": "number"
        },
        "verification_status": {
          "type": "ref",
          "ref": "VerificationStatus"
        }
      },
      "required": [
        "value",
        "verification_status"
      ]
    },
    "IncomeSummaryFieldString": {
      "type": "object",
      "properties": {
        "value": {
          "type": "string"
        },
        "verification_status": {
          "type": "ref",
          "ref": "VerificationStatus"
        }
      },
      "required": [
        "value",
        "verification_status"
      ]
    },
    "IncomeVerificationCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "IncomeVerificationCreateRequestOptions"
        },
        "precheck_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "webhook": {
          "type": "string"
        }
      },
      "required": [
        "webhook"
      ]
    },
    "IncomeVerificationCreateRequestOptions": {
      "type": "object",
      "properties": {
        "access_tokens": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccessToken"
          }
        }
      }
    },
    "IncomeVerificationCreateResponse": {
      "type": "object",
      "properties": {
        "income_verification_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "income_verification_id",
        "request_id"
      ]
    },
    "IncomeVerificationDocumentsDownloadRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessTokenNullable"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "document_id": {
          "type": "string"
        },
        "income_verification_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "IncomeVerificationPayrollFlowType": {
      "type": "string"
    },
    "IncomeVerificationPaystubsGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessTokenNullable"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "income_verification_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "IncomeVerificationPaystubsGetResponse": {
      "type": "object",
      "properties": {
        "document_metadata": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DocumentMetadata"
          }
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "paystubs": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Paystub"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "paystubs",
        "request_id"
      ]
    },
    "IncomeVerificationPrecheckConfidence": {
      "type": "string"
    },
    "IncomeVerificationPrecheckEmployer": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "IncomeVerificationPrecheckEmployerAddress"
        },
        "name": {
          "type": "string"
        },
        "tax_id": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      }
    },
    "IncomeVerificationPrecheckEmployerAddress": {
      "type": "ref",
      "ref": "IncomeVerificationPrecheckEmployerAddressData"
    },
    "IncomeVerificationPrecheckEmployerAddressData": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "street": {
          "type": "string"
        }
      }
    },
    "IncomeVerificationPrecheckMilitaryInfo": {
      "type": "object",
      "properties": {
        "branch": {
          "type": "string"
        },
        "is_active_duty": {
          "type": "boolean"
        }
      }
    },
    "IncomeVerificationPrecheckPayrollInstitution": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      }
    },
    "IncomeVerificationPrecheckRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "employer": {
          "type": "ref",
          "ref": "IncomeVerificationPrecheckEmployer"
        },
        "payroll_institution": {
          "type": "ref",
          "ref": "IncomeVerificationPrecheckPayrollInstitution"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "transactions_access_token": {
          "type": "ref",
          "ref": "AccessTokenNullable"
        },
        "transactions_access_tokens": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccessToken"
          }
        },
        "us_military_info": {
          "type": "ref",
          "ref": "IncomeVerificationPrecheckMilitaryInfo"
        },
        "user": {
          "type": "ref",
          "ref": "IncomeVerificationPrecheckUser"
        }
      }
    },
    "IncomeVerificationPrecheckResponse": {
      "type": "object",
      "properties": {
        "confidence": {
          "type": "ref",
          "ref": "IncomeVerificationPrecheckConfidence"
        },
        "precheck_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "precheck_id",
        "confidence",
        "request_id"
      ]
    },
    "IncomeVerificationPrecheckUser": {
      "type": "object",
      "properties": {
        "email_address": {
          "type": "string"
        },
        "first_name": {
          "type": "string"
        },
        "home_address": {
          "type": "ref",
          "ref": "SignalAddressData"
        },
        "last_name": {
          "type": "string"
        }
      }
    },
    "IncomeVerificationSourceType": {
      "type": "string"
    },
    "IncomeVerificationStatusWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "item_id": {
          "type": "string"
        },
        "user_id": {
          "type": "ref",
          "ref": "UserId"
        },
        "verification_status": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "item_id",
        "verification_status",
        "environment"
      ]
    },
    "IncomeVerificationTaxformsGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessTokenNullable"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "income_verification_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "IncomeVerificationTaxformsGetResponse": {
      "type": "object",
      "properties": {
        "document_metadata": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DocumentMetadata"
          }
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "taxforms": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Taxform"
          }
        }
      },
      "required": [
        "taxforms",
        "document_metadata"
      ]
    },
    "IncomeVerificationWebhookStatus": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        }
      },
      "required": [
        "id"
      ]
    },
    "IndividualName": {
      "type": "object",
      "properties": {
        "FirstName": {
          "type": "string"
        },
        "LastName": {
          "type": "string"
        }
      },
      "required": [
        "FirstName",
        "LastName"
      ]
    },
    "IndividualScreeningHitNames": {
      "type": "object",
      "properties": {
        "full": {
          "type": "string"
        },
        "is_primary": {
          "type": "boolean"
        },
        "weak_alias_determination": {
          "type": "ref",
          "ref": "WeakAliasDetermination"
        }
      },
      "required": [
        "full",
        "is_primary",
        "weak_alias_determination"
      ]
    },
    "IndividualWatchlistCode": {
      "type": "string"
    },
    "IndividualWatchlistProgram": {
      "type": "object",
      "properties": {
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "created_at": {
          "type": "ref",
          "ref": "Timestamp"
        },
        "id": {
          "type": "ref",
          "ref": "WatchlistProgramID"
        },
        "is_archived": {
          "type": "ref",
          "ref": "ProgramArchived"
        },
        "is_rescanning_enabled": {
          "type": "boolean"
        },
        "lists_enabled": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "IndividualWatchlistCode"
          }
        },
        "name": {
          "type": "ref",
          "ref": "IndividualWatchlistScreeningProgramName"
        },
        "name_sensitivity": {
          "type": "ref",
          "ref": "ProgramNameSensitivity"
        }
      },
      "required": [
        "id",
        "created_at",
        "is_rescanning_enabled",
        "lists_enabled",
        "name",
        "name_sensitivity",
        "audit_trail",
        "is_archived"
      ]
    },
    "IndividualWatchlistScreeningProgramName": {
      "type": "string"
    },
    "InflowModel": {
      "type": "object",
      "properties": {
        "income_amount": {
          "type": "number"
        },
        "payment_day_of_month": {
          "type": "number"
        },
        "statement_day_of_month": {
          "type": "string"
        },
        "transaction_name": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "income_amount",
        "payment_day_of_month",
        "transaction_name",
        "statement_day_of_month"
      ]
    },
    "InitialUpdateWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "string"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "new_transactions": {
          "type": "number"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "new_transactions",
        "item_id",
        "environment"
      ]
    },
    "Institution": {
      "type": "object",
      "properties": {
        "auth_metadata": {
          "type": "ref",
          "ref": "AuthMetadata"
        },
        "country_codes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CountryCode"
          }
        },
        "institution_id": {
          "type": "string"
        },
        "logo": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "oauth": {
          "type": "boolean"
        },
        "payment_initiation_metadata": {
          "type": "ref",
          "ref": "PaymentInitiationMetadata"
        },
        "primary_color": {
          "type": "string"
        },
        "products": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Products"
          }
        },
        "routing_numbers": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "status": {
          "type": "ref",
          "ref": "InstitutionStatus"
        },
        "url": {
          "type": "string"
        }
      },
      "required": [
        "institution_id",
        "name",
        "products",
        "country_codes",
        "routing_numbers",
        "oauth"
      ]
    },
    "InstitutionStatus": {
      "type": "object",
      "properties": {
        "auth": {
          "type": "ref",
          "ref": "ProductStatus"
        },
        "health_incidents": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "HealthIncident"
          }
        },
        "identity": {
          "type": "ref",
          "ref": "ProductStatus"
        },
        "investments": {
          "type": "ref",
          "ref": "ProductStatus"
        },
        "investments_updates": {
          "type": "ref",
          "ref": "ProductStatus"
        },
        "item_logins": {
          "type": "ref",
          "ref": "ProductStatus"
        },
        "liabilities": {
          "type": "ref",
          "ref": "ProductStatus"
        },
        "liabilities_updates": {
          "type": "ref",
          "ref": "ProductStatus"
        },
        "transactions_updates": {
          "type": "ref",
          "ref": "ProductStatus"
        }
      }
    },
    "InstitutionSupportedNetworks": {
      "type": "object",
      "properties": {
        "rtp": {
          "type": "ref",
          "ref": "TransferCapabilitiesGetRTP"
        }
      },
      "required": [
        "rtp"
      ]
    },
    "InstitutionsGetByIdRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "country_codes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CountryCode"
          }
        },
        "institution_id": {
          "type": "string"
        },
        "options": {
          "type": "ref",
          "ref": "InstitutionsGetByIdRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "institution_id",
        "country_codes"
      ]
    },
    "InstitutionsGetByIdRequestOptions": {
      "type": "object",
      "properties": {
        "include_auth_metadata": {
          "type": "boolean"
        },
        "include_optional_metadata": {
          "type": "boolean"
        },
        "include_payment_initiation_metadata": {
          "type": "boolean"
        },
        "include_status": {
          "type": "boolean"
        }
      }
    },
    "InstitutionsGetByIdResponse": {
      "type": "object",
      "properties": {
        "institution": {
          "type": "ref",
          "ref": "Institution"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "institution",
        "request_id"
      ]
    },
    "InstitutionsGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "country_codes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CountryCode"
          }
        },
        "offset": {
          "type": "number"
        },
        "options": {
          "type": "ref",
          "ref": "InstitutionsGetRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "count",
        "offset",
        "country_codes"
      ]
    },
    "InstitutionsGetRequestOptions": {
      "type": "object",
      "properties": {
        "include_auth_metadata": {
          "type": "boolean"
        },
        "include_optional_metadata": {
          "type": "boolean"
        },
        "include_payment_initiation_metadata": {
          "type": "boolean"
        },
        "oauth": {
          "type": "boolean"
        },
        "products": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Products"
          }
        },
        "routing_numbers": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "InstitutionsGetResponse": {
      "type": "object",
      "properties": {
        "institutions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Institution"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "total": {
          "type": "number"
        }
      },
      "required": [
        "institutions",
        "total",
        "request_id"
      ]
    },
    "InstitutionsSearchAccountFilter": {
      "type": "object",
      "properties": {
        "credit": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountSubtype"
          }
        },
        "depository": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountSubtype"
          }
        },
        "investment": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountSubtype"
          }
        },
        "loan": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountSubtype"
          }
        }
      }
    },
    "InstitutionsSearchPaymentInitiationOptions": {
      "type": "object",
      "properties": {
        "consent_id": {
          "type": "string"
        },
        "payment_id": {
          "type": "string"
        }
      }
    },
    "InstitutionsSearchRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "country_codes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CountryCode"
          }
        },
        "options": {
          "type": "ref",
          "ref": "InstitutionsSearchRequestOptions"
        },
        "products": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Products"
          }
        },
        "query": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "query",
        "products",
        "country_codes"
      ]
    },
    "InstitutionsSearchRequestOptions": {
      "type": "object",
      "properties": {
        "include_auth_metadata": {
          "type": "boolean"
        },
        "include_optional_metadata": {
          "type": "boolean"
        },
        "include_payment_initiation_metadata": {
          "type": "boolean"
        },
        "oauth": {
          "type": "boolean"
        },
        "payment_initiation": {
          "type": "ref",
          "ref": "InstitutionsSearchPaymentInitiationOptions"
        }
      }
    },
    "InstitutionsSearchResponse": {
      "type": "object",
      "properties": {
        "institutions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Institution"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "institutions",
        "request_id"
      ]
    },
    "InternalUID": {
      "type": "string"
    },
    "InvestmentAccountSubtype": {
      "type": "string"
    },
    "InvestmentAccountSubtypeStandalone": {
      "type": "string"
    },
    "InvestmentAccountSubtypes": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "InvestmentAccountSubtype"
      }
    },
    "InvestmentFilter": {
      "type": "object",
      "properties": {
        "account_subtypes": {
          "type": "ref",
          "ref": "InvestmentAccountSubtypes"
        }
      },
      "required": [
        "account_subtypes"
      ]
    },
    "InvestmentHoldingsGetRequestOptions": {
      "type": "object",
      "properties": {
        "account_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "InvestmentTransaction": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "amount": {
          "type": "number"
        },
        "cancel_transaction_id": {
          "type": "string"
        },
        "date": {
          "type": "string"
        },
        "fees": {
          "type": "number"
        },
        "investment_transaction_id": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "price": {
          "type": "number"
        },
        "quantity": {
          "type": "number"
        },
        "security_id": {
          "type": "string"
        },
        "subtype": {
          "type": "ref",
          "ref": "InvestmentTransactionSubtype"
        },
        "type": {
          "type": "ref",
          "ref": "InvestmentTransactionType"
        },
        "unofficial_currency_code": {
          "type": "string"
        }
      },
      "required": [
        "investment_transaction_id",
        "account_id",
        "security_id",
        "date",
        "name",
        "quantity",
        "amount",
        "price",
        "fees",
        "type",
        "subtype",
        "iso_currency_code",
        "unofficial_currency_code"
      ]
    },
    "InvestmentTransactionSubtype": {
      "type": "string"
    },
    "InvestmentTransactionType": {
      "type": "string"
    },
    "InvestmentsDefaultUpdateWebhook": {
      "type": "object",
      "properties": {
        "canceled_investments_transactions": {
          "type": "number"
        },
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "new_investments_transactions": {
          "type": "number"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "item_id",
        "new_investments_transactions",
        "canceled_investments_transactions",
        "environment"
      ]
    },
    "InvestmentsHoldingsGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "InvestmentHoldingsGetRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "InvestmentsHoldingsGetResponse": {
      "type": "object",
      "properties": {
        "accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountBase"
          }
        },
        "holdings": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Holding"
          }
        },
        "item": {
          "type": "ref",
          "ref": "Item"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "securities": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Security"
          }
        }
      },
      "required": [
        "accounts",
        "holdings",
        "securities",
        "item",
        "request_id"
      ]
    },
    "InvestmentsTransactionsGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "end_date": {
          "type": "string"
        },
        "options": {
          "type": "ref",
          "ref": "InvestmentsTransactionsGetRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "start_date": {
          "type": "string"
        }
      },
      "required": [
        "access_token",
        "start_date",
        "end_date"
      ]
    },
    "InvestmentsTransactionsGetRequestOptions": {
      "type": "object",
      "properties": {
        "account_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "count": {
          "type": "number"
        },
        "offset": {
          "type": "number"
        }
      }
    },
    "InvestmentsTransactionsGetResponse": {
      "type": "object",
      "properties": {
        "accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountBase"
          }
        },
        "investment_transactions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "InvestmentTransaction"
          }
        },
        "item": {
          "type": "ref",
          "ref": "Item"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "securities": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Security"
          }
        },
        "total_investment_transactions": {
          "type": "number"
        }
      },
      "required": [
        "item",
        "accounts",
        "securities",
        "investment_transactions",
        "total_investment_transactions",
        "request_id"
      ]
    },
    "Investments_TransactionsOverride": {
      "type": "object",
      "properties": {
        "currency": {
          "type": "string"
        },
        "date": {
          "type": "string"
        },
        "fees": {
          "type": "number"
        },
        "name": {
          "type": "string"
        },
        "price": {
          "type": "number"
        },
        "quantity": {
          "type": "number"
        },
        "security": {
          "type": "ref",
          "ref": "SecurityOverride"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "date",
        "name",
        "quantity",
        "price",
        "type",
        "currency"
      ]
    },
    "IssuingCountry": {
      "type": "string"
    },
    "Item": {
      "type": "object",
      "properties": {
        "available_products": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Products"
          }
        },
        "billed_products": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Products"
          }
        },
        "consent_expiration_time": {
          "type": "string"
        },
        "consented_products": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Products"
          }
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "institution_id": {
          "type": "string"
        },
        "item_id": {
          "type": "string"
        },
        "products": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Products"
          }
        },
        "update_type": {
          "type": "string"
        },
        "webhook": {
          "type": "string"
        }
      },
      "required": [
        "item_id",
        "webhook",
        "error",
        "available_products",
        "billed_products",
        "consent_expiration_time",
        "update_type"
      ]
    },
    "ItemAccessTokenInvalidateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "ItemAccessTokenInvalidateResponse": {
      "type": "object",
      "properties": {
        "new_access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "new_access_token",
        "request_id"
      ]
    },
    "ItemActivityListRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "cursor": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "ItemActivityListResponse": {
      "type": "object",
      "properties": {
        "activities": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Activity"
          }
        },
        "cursor": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "activities"
      ]
    },
    "ItemApplicationListRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessTokenNullable"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "ItemApplicationListResponse": {
      "type": "object",
      "properties": {
        "applications": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ConnectedApplication"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "applications"
      ]
    },
    "ItemApplicationListUserAuth": {
      "type": "object",
      "properties": {
        "fi_username_hash": {
          "type": "string"
        },
        "user_id": {
          "type": "string"
        }
      }
    },
    "ItemApplicationScopesUpdateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "application_id": {
          "type": "ref",
          "ref": "ApplicationID"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "context": {
          "type": "ref",
          "ref": "ScopesContext"
        },
        "scopes": {
          "type": "ref",
          "ref": "Scopes"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "state": {
          "type": "ref",
          "ref": "ScopesState"
        }
      },
      "required": [
        "application_id",
        "access_token",
        "scopes",
        "context"
      ]
    },
    "ItemApplicationScopesUpdateResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "ItemErrorWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "item_id",
        "error",
        "environment"
      ]
    },
    "ItemGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "ItemGetResponse": {
      "type": "object",
      "properties": {
        "item": {
          "type": "ref",
          "ref": "Item"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "status": {
          "type": "ref",
          "ref": "ItemStatusNullable"
        }
      },
      "required": [
        "item",
        "request_id"
      ]
    },
    "ItemId": {
      "type": "string"
    },
    "ItemImportRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "ItemImportRequestOptions"
        },
        "products": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Products"
          }
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user_auth": {
          "type": "ref",
          "ref": "ItemImportRequestUserAuth"
        }
      },
      "required": [
        "products",
        "user_auth"
      ]
    },
    "ItemImportRequestOptions": {
      "type": "object",
      "properties": {
        "webhook": {
          "type": "string"
        }
      }
    },
    "ItemImportRequestUserAuth": {
      "type": "object",
      "properties": {
        "auth_token": {
          "type": "string"
        },
        "user_id": {
          "type": "string"
        }
      },
      "required": [
        "user_id",
        "auth_token"
      ]
    },
    "ItemImportResponse": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "access_token",
        "request_id"
      ]
    },
    "ItemProductReadyWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "item_id",
        "environment"
      ]
    },
    "ItemPublicTokenCreateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "ItemPublicTokenCreateResponse": {
      "type": "object",
      "properties": {
        "expiration": {
          "type": "string"
        },
        "public_token": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "public_token",
        "request_id"
      ]
    },
    "ItemPublicTokenExchangeRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "public_token": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "public_token"
      ]
    },
    "ItemPublicTokenExchangeResponse": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "item_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "access_token",
        "item_id",
        "request_id"
      ]
    },
    "ItemRemoveRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "ItemRemoveResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "ItemStatus": {
      "type": "object",
      "properties": {
        "investments": {
          "type": "ref",
          "ref": "ItemStatusInvestments"
        },
        "last_webhook": {
          "type": "ref",
          "ref": "ItemStatusLastWebhook"
        },
        "transactions": {
          "type": "ref",
          "ref": "ItemStatusTransactions"
        }
      }
    },
    "ItemStatusInvestments": {
      "type": "object",
      "properties": {
        "last_failed_update": {
          "type": "string"
        },
        "last_successful_update": {
          "type": "string"
        }
      }
    },
    "ItemStatusLastWebhook": {
      "type": "object",
      "properties": {
        "code_sent": {
          "type": "string"
        },
        "sent_at": {
          "type": "string"
        }
      }
    },
    "ItemStatusNullable": {
      "type": "ref",
      "ref": "ItemStatus"
    },
    "ItemStatusTransactions": {
      "type": "object",
      "properties": {
        "last_failed_update": {
          "type": "string"
        },
        "last_successful_update": {
          "type": "string"
        }
      }
    },
    "ItemWebhookUpdateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "webhook": {
          "type": "string"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "ItemWebhookUpdateResponse": {
      "type": "object",
      "properties": {
        "item": {
          "type": "ref",
          "ref": "Item"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "item",
        "request_id"
      ]
    },
    "JWKPublicKey": {
      "type": "object",
      "properties": {
        "alg": {
          "type": "string"
        },
        "created_at": {
          "type": "number"
        },
        "crv": {
          "type": "string"
        },
        "expired_at": {
          "type": "number"
        },
        "kid": {
          "type": "string"
        },
        "kty": {
          "type": "string"
        },
        "use": {
          "type": "string"
        },
        "x": {
          "type": "string"
        },
        "y": {
          "type": "string"
        }
      },
      "required": [
        "alg",
        "kid",
        "kty",
        "crv",
        "x",
        "y",
        "use",
        "created_at",
        "expired_at"
      ]
    },
    "JWTHeader": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        }
      },
      "required": [
        "id"
      ]
    },
    "KYCCheckAddressSummary": {
      "type": "object",
      "properties": {
        "po_box": {
          "type": "ref",
          "ref": "POBoxStatus"
        },
        "summary": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        },
        "type": {
          "type": "ref",
          "ref": "AddressPurposeLabel"
        }
      },
      "required": [
        "summary",
        "po_box",
        "type"
      ]
    },
    "KYCCheckDateOfBirthSummary": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        }
      },
      "required": [
        "summary"
      ]
    },
    "KYCCheckDetails": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "KYCCheckAddressSummary"
        },
        "date_of_birth": {
          "type": "ref",
          "ref": "KYCCheckDateOfBirthSummary"
        },
        "id_number": {
          "type": "ref",
          "ref": "KYCCheckIDNumberSummary"
        },
        "name": {
          "type": "ref",
          "ref": "KYCCheckNameSummary"
        },
        "phone_number": {
          "type": "ref",
          "ref": "KYCCheckPhoneSummary"
        },
        "status": {
          "type": "string"
        }
      },
      "required": [
        "status",
        "phone_number",
        "address",
        "name",
        "date_of_birth",
        "id_number"
      ]
    },
    "KYCCheckIDNumberSummary": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        }
      },
      "required": [
        "summary"
      ]
    },
    "KYCCheckNameSummary": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        }
      },
      "required": [
        "summary"
      ]
    },
    "KYCCheckPhoneSummary": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        }
      },
      "required": [
        "summary"
      ]
    },
    "LiabilitiesAccountIdsWithUpdatedLiabilities": {
      "type": "object",
      "properties": {}
    },
    "LiabilitiesDefaultUpdateWebhook": {
      "type": "object",
      "properties": {
        "account_ids_with_new_liabilities": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "account_ids_with_updated_liabilities": {
          "type": "ref",
          "ref": "LiabilitiesAccountIdsWithUpdatedLiabilities"
        },
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "item_id",
        "error",
        "account_ids_with_new_liabilities",
        "account_ids_with_updated_liabilities",
        "environment"
      ]
    },
    "LiabilitiesGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "LiabilitiesGetRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "LiabilitiesGetRequestOptions": {
      "type": "object",
      "properties": {
        "account_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "LiabilitiesGetResponse": {
      "type": "object",
      "properties": {
        "accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountBase"
          }
        },
        "item": {
          "type": "ref",
          "ref": "Item"
        },
        "liabilities": {
          "type": "ref",
          "ref": "LiabilitiesObject"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "accounts",
        "item",
        "liabilities",
        "request_id"
      ]
    },
    "LiabilitiesObject": {
      "type": "object",
      "properties": {
        "credit": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditCardLiability"
          }
        },
        "mortgage": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "MortgageLiability"
          }
        },
        "student": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "StudentLoan"
          }
        }
      },
      "required": [
        "credit",
        "mortgage",
        "student"
      ]
    },
    "LiabilityOverride": {
      "type": "object",
      "properties": {
        "balance_transfer_apr": {
          "type": "number"
        },
        "cash_apr": {
          "type": "number"
        },
        "expected_payoff_date": {
          "type": "string"
        },
        "guarantor": {
          "type": "string"
        },
        "interest_capitalization_grace_period_months": {
          "type": "number"
        },
        "is_federal": {
          "type": "boolean"
        },
        "is_overdue": {
          "type": "boolean"
        },
        "last_payment_amount": {
          "type": "number"
        },
        "loan_name": {
          "type": "string"
        },
        "loan_status": {
          "type": "ref",
          "ref": "StudentLoanStatus"
        },
        "minimum_payment_amount": {
          "type": "number"
        },
        "nominal_apr": {
          "type": "number"
        },
        "origination_date": {
          "type": "string"
        },
        "payment_reference_number": {
          "type": "string"
        },
        "principal": {
          "type": "number"
        },
        "pslf_status": {
          "type": "ref",
          "ref": "PSLFStatus"
        },
        "purchase_apr": {
          "type": "number"
        },
        "repayment_model": {
          "type": "ref",
          "ref": "StudentLoanRepaymentModel"
        },
        "repayment_plan_description": {
          "type": "string"
        },
        "repayment_plan_type": {
          "type": "string"
        },
        "sequence_number": {
          "type": "string"
        },
        "servicer_address": {
          "type": "ref",
          "ref": "Address"
        },
        "special_apr": {
          "type": "number"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "purchase_apr",
        "cash_apr",
        "balance_transfer_apr",
        "special_apr",
        "last_payment_amount",
        "minimum_payment_amount",
        "is_overdue",
        "origination_date",
        "principal",
        "nominal_apr",
        "interest_capitalization_grace_period_months",
        "repayment_model",
        "expected_payoff_date",
        "guarantor",
        "is_federal",
        "loan_name",
        "loan_status",
        "payment_reference_number",
        "pslf_status",
        "repayment_plan_description",
        "repayment_plan_type",
        "sequence_number",
        "servicer_address"
      ]
    },
    "LinkCallbackMetadata": {
      "type": "object",
      "properties": {
        "accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LinkDeliveryAccount"
          }
        },
        "event_name": {
          "type": "string"
        },
        "institution": {
          "type": "ref",
          "ref": "LinkDeliveryInstitution"
        },
        "link_session_id": {
          "type": "string"
        },
        "request_id": {
          "type": "string"
        },
        "status": {
          "type": "string"
        }
      }
    },
    "LinkDeliveryAccount": {
      "type": "object",
      "properties": {
        "class_type": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "mask": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "subtype": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "verification_status": {
          "type": "ref",
          "ref": "LinkDeliveryVerificationStatus"
        }
      }
    },
    "LinkDeliveryCallbackWebhook": {
      "type": "object",
      "properties": {
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "link_callback_metadata": {
          "type": "ref",
          "ref": "LinkCallbackMetadata"
        },
        "link_delivery_session_id": {
          "type": "string"
        },
        "timestamp": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "link_delivery_session_id",
        "timestamp",
        "link_callback_metadata"
      ]
    },
    "LinkDeliveryCommunicationMethod": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string"
        },
        "method": {
          "type": "ref",
          "ref": "LinkDeliveryDeliveryMethod"
        }
      }
    },
    "LinkDeliveryCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "communication_methods": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LinkDeliveryCommunicationMethod"
          }
        },
        "link_token": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "link_token",
        "communication_methods"
      ]
    },
    "LinkDeliveryCreateResponse": {
      "type": "object",
      "properties": {
        "link_delivery_session_id": {
          "type": "string"
        },
        "link_delivery_url": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "link_delivery_url",
        "link_delivery_session_id",
        "request_id"
      ]
    },
    "LinkDeliveryDeliveryMethod": {
      "type": "string"
    },
    "LinkDeliveryGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "link_delivery_session_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "link_delivery_session_id"
      ]
    },
    "LinkDeliveryGetResponse": {
      "type": "object",
      "properties": {
        "access_tokens": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccessToken"
          }
        },
        "completed_at": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "item_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ItemId"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "status": {
          "type": "ref",
          "ref": "LinkDeliverySessionStatus"
        }
      },
      "required": [
        "status",
        "created_at",
        "request_id"
      ]
    },
    "LinkDeliveryInstitution": {
      "type": "object",
      "properties": {
        "institution_id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "LinkDeliveryMetadata": {
      "type": "object",
      "properties": {
        "communication_method": {
          "type": "ref",
          "ref": "LinkDeliveryWebhookCommunicationMethod"
        },
        "delivery_status": {
          "type": "ref",
          "ref": "LinkDeliveryWebhookDeliveryStatus"
        }
      }
    },
    "LinkDeliverySessionStatus": {
      "type": "string"
    },
    "LinkDeliveryVerificationStatus": {
      "type": "string"
    },
    "LinkDeliveryWebhookCommunicationMethod": {
      "type": "string"
    },
    "LinkDeliveryWebhookDeliveryStatus": {
      "type": "string"
    },
    "LinkOAuthCorrelationIdExchangeRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "link_correlation_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "link_correlation_id"
      ]
    },
    "LinkOAuthCorrelationIdExchangeResponse": {
      "type": "object",
      "properties": {
        "link_token": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "link_token",
        "request_id"
      ]
    },
    "LinkTokenAccountFilters": {
      "type": "object",
      "properties": {
        "credit": {
          "type": "ref",
          "ref": "CreditFilter"
        },
        "depository": {
          "type": "ref",
          "ref": "DepositoryFilter"
        },
        "investment": {
          "type": "ref",
          "ref": "InvestmentFilter"
        },
        "loan": {
          "type": "ref",
          "ref": "LoanFilter"
        }
      }
    },
    "LinkTokenCreateCreditFilter": {
      "type": "object",
      "properties": {
        "account_subtypes": {
          "type": "ref",
          "ref": "CreditAccountSubtypes"
        }
      }
    },
    "LinkTokenCreateDepositoryFilter": {
      "type": "object",
      "properties": {
        "account_subtypes": {
          "type": "ref",
          "ref": "DepositoryAccountSubtypes"
        }
      }
    },
    "LinkTokenCreateInstitutionData": {
      "type": "object",
      "properties": {
        "routing_number": {
          "type": "string"
        }
      }
    },
    "LinkTokenCreateInvestmentFilter": {
      "type": "object",
      "properties": {
        "account_subtypes": {
          "type": "ref",
          "ref": "InvestmentAccountSubtypes"
        }
      }
    },
    "LinkTokenCreateLoanFilter": {
      "type": "object",
      "properties": {
        "account_subtypes": {
          "type": "ref",
          "ref": "LoanAccountSubtypes"
        }
      }
    },
    "LinkTokenCreateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "string"
        },
        "account_filters": {
          "type": "ref",
          "ref": "LinkTokenAccountFilters"
        },
        "additional_consented_products": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Products"
          }
        },
        "android_package_name": {
          "type": "string"
        },
        "auth": {
          "type": "ref",
          "ref": "LinkTokenCreateRequestAuth"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_name": {
          "type": "string"
        },
        "country_codes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CountryCode"
          }
        },
        "deposit_switch": {
          "type": "ref",
          "ref": "LinkTokenCreateRequestDepositSwitch"
        },
        "employment": {
          "type": "ref",
          "ref": "LinkTokenCreateRequestEmployment"
        },
        "eu_config": {
          "type": "ref",
          "ref": "LinkTokenEUConfig"
        },
        "identity_verification": {
          "type": "ref",
          "ref": "LinkTokenCreateRequestIdentityVerification"
        },
        "income_verification": {
          "type": "ref",
          "ref": "LinkTokenCreateRequestIncomeVerification"
        },
        "institution_data": {
          "type": "ref",
          "ref": "LinkTokenCreateInstitutionData"
        },
        "institution_id": {
          "type": "string"
        },
        "investments": {
          "type": "ref",
          "ref": "LinkTokenInvestments"
        },
        "language": {
          "type": "string"
        },
        "link_customization_name": {
          "type": "string"
        },
        "payment_initiation": {
          "type": "ref",
          "ref": "LinkTokenCreateRequestPaymentInitiation"
        },
        "products": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Products"
          }
        },
        "redirect_uri": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "transfer": {
          "type": "ref",
          "ref": "LinkTokenCreateRequestTransfer"
        },
        "update": {
          "type": "ref",
          "ref": "LinkTokenCreateRequestUpdate"
        },
        "user": {
          "type": "ref",
          "ref": "LinkTokenCreateRequestUser"
        },
        "user_token": {
          "type": "string"
        },
        "webhook": {
          "type": "string"
        }
      },
      "required": [
        "client_name",
        "language",
        "country_codes",
        "user"
      ]
    },
    "LinkTokenCreateRequestAccountSubtypes": {
      "type": "object",
      "properties": {
        "credit": {
          "type": "ref",
          "ref": "LinkTokenCreateCreditFilter"
        },
        "depository": {
          "type": "ref",
          "ref": "LinkTokenCreateDepositoryFilter"
        },
        "investment": {
          "type": "ref",
          "ref": "LinkTokenCreateInvestmentFilter"
        },
        "loan": {
          "type": "ref",
          "ref": "LinkTokenCreateLoanFilter"
        }
      }
    },
    "LinkTokenCreateRequestAuth": {
      "type": "object",
      "properties": {
        "auth_type_select_enabled": {
          "type": "boolean"
        },
        "automated_microdeposits_enabled": {
          "type": "boolean"
        },
        "flow_type": {
          "type": "string"
        },
        "instant_match_enabled": {
          "type": "boolean"
        },
        "same_day_microdeposits_enabled": {
          "type": "boolean"
        }
      }
    },
    "LinkTokenCreateRequestDepositSwitch": {
      "type": "object",
      "properties": {
        "deposit_switch_id": {
          "type": "string"
        }
      },
      "required": [
        "deposit_switch_id"
      ]
    },
    "LinkTokenCreateRequestEmployment": {
      "type": "object",
      "properties": {
        "bank_employment": {
          "type": "ref",
          "ref": "LinkTokenCreateRequestEmploymentBankIncome"
        },
        "employment_source_types": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EmploymentSourceType"
          }
        }
      }
    },
    "LinkTokenCreateRequestEmploymentBankIncome": {
      "type": "object",
      "properties": {
        "days_requested": {
          "type": "number"
        }
      },
      "required": [
        "days_requested"
      ]
    },
    "LinkTokenCreateRequestIdentityVerification": {
      "type": "object",
      "properties": {
        "consent": {
          "type": "ref",
          "ref": "IdentityVerificationConsent"
        },
        "gave_consent": {
          "type": "ref",
          "ref": "IdentityVerificationConsent"
        },
        "template_id": {
          "type": "ref",
          "ref": "IdentityVerificationTemplateID"
        }
      },
      "required": [
        "template_id"
      ]
    },
    "LinkTokenCreateRequestIncomeVerification": {
      "type": "object",
      "properties": {
        "access_tokens": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccessToken"
          }
        },
        "asset_report_id": {
          "type": "string"
        },
        "bank_income": {
          "type": "ref",
          "ref": "LinkTokenCreateRequestIncomeVerificationBankIncome"
        },
        "income_source_types": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "IncomeVerificationSourceType"
          }
        },
        "income_verification_id": {
          "type": "string"
        },
        "payroll_income": {
          "type": "ref",
          "ref": "LinkTokenCreateRequestIncomeVerificationPayrollIncome"
        },
        "precheck_id": {
          "type": "string"
        },
        "stated_income_sources": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LinkTokenCreateRequestUserStatedIncomeSource"
          }
        }
      }
    },
    "LinkTokenCreateRequestIncomeVerificationBankIncome": {
      "type": "object",
      "properties": {
        "days_requested": {
          "type": "number"
        },
        "enable_multiple_items": {
          "type": "boolean"
        }
      },
      "required": [
        "days_requested"
      ]
    },
    "LinkTokenCreateRequestIncomeVerificationPayrollIncome": {
      "type": "object",
      "properties": {
        "flow_types": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "IncomeVerificationPayrollFlowType"
          }
        },
        "is_update_mode": {
          "type": "boolean"
        }
      }
    },
    "LinkTokenCreateRequestPaymentInitiation": {
      "type": "object",
      "properties": {
        "consent_id": {
          "type": "string"
        },
        "payment_id": {
          "type": "string"
        }
      }
    },
    "LinkTokenCreateRequestTransfer": {
      "type": "object",
      "properties": {
        "intent_id": {
          "type": "string"
        },
        "payment_profile_token": {
          "type": "string"
        }
      }
    },
    "LinkTokenCreateRequestUpdate": {
      "type": "object",
      "properties": {
        "account_selection_enabled": {
          "type": "boolean"
        }
      }
    },
    "LinkTokenCreateRequestUser": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "UserAddress"
        },
        "client_user_id": {
          "type": "string"
        },
        "date_of_birth": {
          "type": "string"
        },
        "email_address": {
          "type": "string"
        },
        "email_address_verified_time": {
          "type": "string"
        },
        "id_number": {
          "type": "ref",
          "ref": "UserIDNumber"
        },
        "legal_name": {
          "type": "string"
        },
        "name": {
          "type": "ref",
          "ref": "UserName"
        },
        "phone_number": {
          "type": "string"
        },
        "phone_number_verified_time": {
          "type": "string"
        },
        "ssn": {
          "type": "string"
        }
      },
      "required": [
        "client_user_id"
      ]
    },
    "LinkTokenCreateRequestUserStatedIncomeSource": {
      "type": "object",
      "properties": {
        "category": {
          "type": "ref",
          "ref": "UserStatedIncomeSourceCategory"
        },
        "employer": {
          "type": "string"
        },
        "pay_annual": {
          "type": "number"
        },
        "pay_frequency": {
          "type": "ref",
          "ref": "UserStatedIncomeSourceFrequency"
        },
        "pay_per_cycle": {
          "type": "number"
        },
        "pay_type": {
          "type": "ref",
          "ref": "UserStatedIncomeSourcePayType"
        }
      }
    },
    "LinkTokenCreateResponse": {
      "type": "object",
      "properties": {
        "expiration": {
          "type": "string"
        },
        "link_token": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "link_token",
        "expiration",
        "request_id"
      ]
    },
    "LinkTokenEUConfig": {
      "type": "object",
      "properties": {
        "headless": {
          "type": "boolean"
        }
      }
    },
    "LinkTokenGetMetadataResponse": {
      "type": "object",
      "properties": {
        "account_filters": {
          "type": "ref",
          "ref": "AccountFiltersResponse"
        },
        "client_name": {
          "type": "string"
        },
        "country_codes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CountryCode"
          }
        },
        "initial_products": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Products"
          }
        },
        "institution_data": {
          "type": "ref",
          "ref": "LinkTokenCreateInstitutionData"
        },
        "language": {
          "type": "string"
        },
        "redirect_uri": {
          "type": "string"
        },
        "webhook": {
          "type": "string"
        }
      },
      "required": [
        "initial_products",
        "webhook",
        "country_codes",
        "language",
        "redirect_uri",
        "client_name"
      ]
    },
    "LinkTokenGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "link_token": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "link_token"
      ]
    },
    "LinkTokenGetResponse": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "string"
        },
        "expiration": {
          "type": "string"
        },
        "link_token": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "LinkTokenGetMetadataResponse"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "link_token",
        "created_at",
        "expiration",
        "metadata",
        "request_id"
      ]
    },
    "LinkTokenInvestments": {
      "type": "object",
      "properties": {
        "allow_unverified_crypto_wallets": {
          "type": "boolean"
        }
      }
    },
    "LinkUserDeliveryStatusWebhook": {
      "type": "object",
      "properties": {
        "link_delivery_metadata": {
          "type": "ref",
          "ref": "LinkDeliveryMetadata"
        },
        "link_delivery_session_id": {
          "type": "string"
        },
        "timestamp": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "link_delivery_session_id",
        "timestamp",
        "link_delivery_metadata"
      ]
    },
    "Loan": {
      "type": "object",
      "properties": {
        "LOAN_IDENTIFIERS": {
          "type": "ref",
          "ref": "LoanIdentifiers"
        }
      },
      "required": [
        "LOAN_IDENTIFIERS"
      ]
    },
    "LoanAccount": {
      "type": "string"
    },
    "LoanAccountSubtype": {
      "type": "string"
    },
    "LoanAccountSubtypes": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "LoanAccountSubtype"
      }
    },
    "LoanFilter": {
      "type": "object",
      "properties": {
        "account_subtypes": {
          "type": "ref",
          "ref": "LoanAccountSubtypes"
        }
      },
      "required": [
        "account_subtypes"
      ]
    },
    "LoanIdentifier": {
      "type": "object",
      "properties": {
        "LoanIdentifier": {
          "type": "string"
        },
        "LoanIdentifierType": {
          "type": "ref",
          "ref": "LoanIdentifierType"
        }
      },
      "required": [
        "LoanIdentifier",
        "LoanIdentifierType"
      ]
    },
    "LoanIdentifierType": {
      "type": "string"
    },
    "LoanIdentifiers": {
      "type": "object",
      "properties": {
        "LOAN_IDENTIFIER": {
          "type": "ref",
          "ref": "LoanIdentifier"
        }
      },
      "required": [
        "LOAN_IDENTIFIER"
      ]
    },
    "Loans": {
      "type": "object",
      "properties": {
        "LOAN": {
          "type": "ref",
          "ref": "Loan"
        }
      },
      "required": [
        "LOAN"
      ]
    },
    "Location": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "lat": {
          "type": "number"
        },
        "lon": {
          "type": "number"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "store_number": {
          "type": "string"
        }
      },
      "required": [
        "address",
        "city",
        "region",
        "postal_code",
        "country",
        "lat",
        "lon",
        "store_number"
      ]
    },
    "MFA": {
      "type": "object",
      "properties": {
        "question_rounds": {
          "type": "number"
        },
        "questions_per_round": {
          "type": "number"
        },
        "selection_rounds": {
          "type": "number"
        },
        "selections_per_question": {
          "type": "number"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "question_rounds",
        "questions_per_round",
        "selection_rounds",
        "selections_per_question"
      ]
    },
    "MatchSummary": {
      "type": "object",
      "properties": {
        "summary": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        }
      },
      "required": [
        "summary"
      ]
    },
    "MatchSummaryCode": {
      "type": "string"
    },
    "Meta": {
      "type": "object",
      "properties": {
        "limit": {
          "type": "number"
        },
        "mask": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "official_name": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "official_name",
        "limit",
        "mask"
      ]
    },
    "MinLastUpdatedDatetime": {
      "type": "string"
    },
    "MortgageInterestRate": {
      "type": "object",
      "properties": {
        "percentage": {
          "type": "number"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "percentage",
        "type"
      ]
    },
    "MortgageLiability": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "account_number": {
          "type": "string"
        },
        "current_late_fee": {
          "type": "number"
        },
        "escrow_balance": {
          "type": "number"
        },
        "has_pmi": {
          "type": "boolean"
        },
        "has_prepayment_penalty": {
          "type": "boolean"
        },
        "interest_rate": {
          "type": "ref",
          "ref": "MortgageInterestRate"
        },
        "last_payment_amount": {
          "type": "number"
        },
        "last_payment_date": {
          "type": "string"
        },
        "loan_term": {
          "type": "string"
        },
        "loan_type_description": {
          "type": "string"
        },
        "maturity_date": {
          "type": "string"
        },
        "next_monthly_payment": {
          "type": "number"
        },
        "next_payment_due_date": {
          "type": "string"
        },
        "origination_date": {
          "type": "string"
        },
        "origination_principal_amount": {
          "type": "number"
        },
        "past_due_amount": {
          "type": "number"
        },
        "property_address": {
          "type": "ref",
          "ref": "MortgagePropertyAddress"
        },
        "ytd_interest_paid": {
          "type": "number"
        },
        "ytd_principal_paid": {
          "type": "number"
        }
      },
      "required": [
        "account_id",
        "account_number",
        "current_late_fee",
        "escrow_balance",
        "has_pmi",
        "has_prepayment_penalty",
        "interest_rate",
        "last_payment_amount",
        "last_payment_date",
        "loan_type_description",
        "loan_term",
        "maturity_date",
        "next_monthly_payment",
        "next_payment_due_date",
        "origination_date",
        "origination_principal_amount",
        "past_due_amount",
        "property_address",
        "ytd_interest_paid",
        "ytd_principal_paid"
      ]
    },
    "MortgagePropertyAddress": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "street": {
          "type": "string"
        }
      },
      "required": [
        "city",
        "country",
        "postal_code",
        "region",
        "street"
      ]
    },
    "MultiDocumentRiskSignal": {
      "type": "object",
      "properties": {
        "document_references": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RiskSignalDocumentReference"
          }
        },
        "risk_signals": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DocumentRiskSignal"
          }
        }
      },
      "required": [
        "document_references",
        "risk_signals"
      ]
    },
    "NameMatchScore": {
      "type": "object",
      "properties": {
        "is_business_name_detected": {
          "type": "boolean"
        },
        "is_first_name_or_last_name_match": {
          "type": "boolean"
        },
        "is_nickname_match": {
          "type": "boolean"
        },
        "score": {
          "type": "number"
        }
      }
    },
    "NetPay": {
      "type": "object",
      "properties": {
        "current_amount": {
          "type": "number"
        },
        "description": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "total": {
          "type": "ref",
          "ref": "Total"
        },
        "unofficial_currency_code": {
          "type": "string"
        },
        "ytd_amount": {
          "type": "number"
        }
      }
    },
    "NewAccountsAvailableWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      }
    },
    "Numbers": {
      "type": "object",
      "properties": {
        "account": {
          "type": "string"
        },
        "ach_routing": {
          "type": "string"
        },
        "ach_wire_routing": {
          "type": "string"
        },
        "bacs_sort_code": {
          "type": "string"
        },
        "eft_branch": {
          "type": "string"
        },
        "eft_institution": {
          "type": "string"
        },
        "international_bic": {
          "type": "string"
        },
        "international_iban": {
          "type": "string"
        }
      }
    },
    "NumbersACH": {
      "type": "object",
      "properties": {
        "account": {
          "type": "string"
        },
        "account_id": {
          "type": "string"
        },
        "can_transfer_in": {
          "type": "boolean"
        },
        "can_transfer_out": {
          "type": "boolean"
        },
        "routing": {
          "type": "string"
        },
        "wire_routing": {
          "type": "string"
        }
      },
      "required": [
        "account_id",
        "account",
        "routing",
        "wire_routing"
      ]
    },
    "NumbersACHNullable": {
      "type": "ref",
      "ref": "NumbersACH"
    },
    "NumbersBACS": {
      "type": "object",
      "properties": {
        "account": {
          "type": "string"
        },
        "account_id": {
          "type": "string"
        },
        "sort_code": {
          "type": "string"
        }
      },
      "required": [
        "account_id",
        "account",
        "sort_code"
      ]
    },
    "NumbersBACSNullable": {
      "type": "ref",
      "ref": "NumbersBACS"
    },
    "NumbersEFT": {
      "type": "object",
      "properties": {
        "account": {
          "type": "string"
        },
        "account_id": {
          "type": "string"
        },
        "branch": {
          "type": "string"
        },
        "institution": {
          "type": "string"
        }
      },
      "required": [
        "account_id",
        "account",
        "institution",
        "branch"
      ]
    },
    "NumbersEFTNullable": {
      "type": "ref",
      "ref": "NumbersEFT"
    },
    "NumbersIBAN": {
      "type": "string"
    },
    "NumbersIBANNullable": {
      "type": "ref",
      "ref": "NumbersIBAN"
    },
    "NumbersInternational": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "bic": {
          "type": "string"
        },
        "iban": {
          "type": "string"
        }
      },
      "required": [
        "account_id",
        "iban",
        "bic"
      ]
    },
    "NumbersInternationalIBAN": {
      "type": "object",
      "properties": {
        "bic": {
          "type": "string"
        },
        "iban": {
          "type": "ref",
          "ref": "NumbersIBAN"
        }
      },
      "required": [
        "iban",
        "bic"
      ]
    },
    "NumbersInternationalNullable": {
      "type": "ref",
      "ref": "NumbersInternational"
    },
    "Originator": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "string"
        },
        "transfer_diligence_status": {
          "type": "ref",
          "ref": "TransferDiligenceStatus"
        }
      },
      "required": [
        "client_id",
        "transfer_diligence_status"
      ]
    },
    "OverrideAccountType": {
      "type": "string"
    },
    "OverrideAccounts": {
      "type": "object",
      "properties": {
        "currency": {
          "type": "string"
        },
        "force_available_balance": {
          "type": "number"
        },
        "holdings": {
          "type": "ref",
          "ref": "HoldingsOverride"
        },
        "identity": {
          "type": "ref",
          "ref": "OwnerOverride"
        },
        "income": {
          "type": "ref",
          "ref": "IncomeOverride"
        },
        "inflow_model": {
          "type": "ref",
          "ref": "InflowModel"
        },
        "investment_transactions": {
          "type": "ref",
          "ref": "Investments_TransactionsOverride"
        },
        "liability": {
          "type": "ref",
          "ref": "LiabilityOverride"
        },
        "meta": {
          "type": "ref",
          "ref": "Meta"
        },
        "numbers": {
          "type": "ref",
          "ref": "Numbers"
        },
        "starting_balance": {
          "type": "number"
        },
        "subtype": {
          "type": "ref",
          "ref": "AccountSubtype"
        },
        "transactions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TransactionOverride"
          }
        },
        "type": {
          "type": "ref",
          "ref": "OverrideAccountType"
        }
      },
      "required": [
        "type",
        "subtype",
        "starting_balance",
        "force_available_balance",
        "currency",
        "meta",
        "numbers",
        "transactions",
        "identity",
        "liability",
        "inflow_model"
      ]
    },
    "Owner": {
      "type": "object",
      "properties": {
        "addresses": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Address"
          }
        },
        "emails": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Email"
          }
        },
        "names": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "phone_numbers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PhoneNumber"
          }
        }
      },
      "required": [
        "names",
        "phone_numbers",
        "emails",
        "addresses"
      ]
    },
    "OwnerOverride": {
      "type": "object",
      "properties": {
        "addresses": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Address"
          }
        },
        "emails": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Email"
          }
        },
        "names": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "phone_numbers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PhoneNumber"
          }
        }
      },
      "required": [
        "names",
        "phone_numbers",
        "emails",
        "addresses"
      ]
    },
    "OwnershipType": {
      "type": "object",
      "properties": {}
    },
    "POBoxStatus": {
      "type": "string"
    },
    "PSLFStatus": {
      "type": "object",
      "properties": {
        "estimated_eligibility_date": {
          "type": "string"
        },
        "payments_made": {
          "type": "number"
        },
        "payments_remaining": {
          "type": "number"
        }
      },
      "required": [
        "estimated_eligibility_date",
        "payments_made",
        "payments_remaining"
      ]
    },
    "Parties": {
      "type": "object",
      "properties": {
        "PARTY": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Party"
          }
        }
      },
      "required": [
        "PARTY"
      ]
    },
    "PartnerCustomerCreateRequest": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "PartnerEndCustomerAddress"
        },
        "application_name": {
          "type": "string"
        },
        "assets_under_management": {
          "type": "ref",
          "ref": "PartnerEndCustomerAssetsUnderManagement"
        },
        "billing_contact": {
          "type": "ref",
          "ref": "PartnerEndCustomerBillingContact"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "company_name": {
          "type": "string"
        },
        "create_link_customization": {
          "type": "boolean"
        },
        "customer_support_info": {
          "type": "ref",
          "ref": "PartnerEndCustomerCustomerSupportInfo"
        },
        "is_bank_addendum_completed": {
          "type": "boolean"
        },
        "is_diligence_attested": {
          "type": "boolean"
        },
        "legal_entity_name": {
          "type": "string"
        },
        "logo": {
          "type": "string"
        },
        "products": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Products"
          }
        },
        "redirect_uris": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "technical_contact": {
          "type": "ref",
          "ref": "PartnerEndCustomerTechnicalContact"
        },
        "website": {
          "type": "string"
        }
      },
      "required": [
        "company_name",
        "is_diligence_attested",
        "products",
        "legal_entity_name",
        "website",
        "application_name",
        "address",
        "is_bank_addendum_completed"
      ]
    },
    "PartnerCustomerCreateResponse": {
      "type": "object",
      "properties": {
        "end_customer": {
          "type": "ref",
          "ref": "PartnerEndCustomerWithSecrets"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      }
    },
    "PartnerCustomerEnableRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "end_customer_client_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "end_customer_client_id"
      ]
    },
    "PartnerCustomerEnableResponse": {
      "type": "object",
      "properties": {
        "production_secret": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      }
    },
    "PartnerCustomerGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "end_customer_client_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "end_customer_client_id"
      ]
    },
    "PartnerCustomerGetResponse": {
      "type": "object",
      "properties": {
        "end_customer": {
          "type": "ref",
          "ref": "PartnerEndCustomer"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      }
    },
    "PartnerCustomerOAuthInstitutionsGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "end_customer_client_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "end_customer_client_id"
      ]
    },
    "PartnerCustomerOAuthInstitutionsGetResponse": {
      "type": "object",
      "properties": {
        "flowdown_status": {
          "type": "ref",
          "ref": "PartnerEndCustomerFlowdownStatus"
        },
        "institutions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PartnerEndCustomerOAuthInstitution"
          }
        },
        "questionnaire_status": {
          "type": "ref",
          "ref": "PartnerEndCustomerQuestionnaireStatus"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      }
    },
    "PartnerCustomerRemoveRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "end_customer_client_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "end_customer_client_id"
      ]
    },
    "PartnerCustomerRemoveResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      }
    },
    "PartnerEndCustomer": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "string"
        },
        "company_name": {
          "type": "string"
        },
        "status": {
          "type": "ref",
          "ref": "PartnerEndCustomerStatus"
        }
      }
    },
    "PartnerEndCustomerAddress": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country_code": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "street": {
          "type": "string"
        }
      }
    },
    "PartnerEndCustomerAssetsUnderManagement": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        }
      },
      "required": [
        "amount",
        "iso_currency_code"
      ]
    },
    "PartnerEndCustomerBillingContact": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "family_name": {
          "type": "string"
        },
        "given_name": {
          "type": "string"
        }
      }
    },
    "PartnerEndCustomerCustomerSupportInfo": {
      "type": "object",
      "properties": {
        "contact_url": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "link_update_url": {
          "type": "string"
        },
        "phone_number": {
          "type": "string"
        }
      }
    },
    "PartnerEndCustomerFlowdownStatus": {
      "type": "string"
    },
    "PartnerEndCustomerOAuthInstitution": {
      "type": "object",
      "properties": {
        "classic_disablement_date": {
          "type": "string"
        },
        "environments": {
          "type": "ref",
          "ref": "PartnerEndCustomerOAuthInstitutionEnvironments"
        },
        "institution_id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "production_enablement_date": {
          "type": "string"
        }
      }
    },
    "PartnerEndCustomerOAuthInstitutionApplicationStatus": {
      "type": "string"
    },
    "PartnerEndCustomerOAuthInstitutionEnvironments": {
      "type": "object",
      "properties": {
        "development": {
          "type": "ref",
          "ref": "PartnerEndCustomerOAuthInstitutionApplicationStatus"
        },
        "production": {
          "type": "ref",
          "ref": "PartnerEndCustomerOAuthInstitutionApplicationStatus"
        }
      }
    },
    "PartnerEndCustomerOAuthStatusUpdatedValues": {
      "type": "string"
    },
    "PartnerEndCustomerOAuthStatusUpdatedWebhook": {
      "type": "object",
      "properties": {
        "end_customer_client_id": {
          "type": "string"
        },
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "institution_id": {
          "type": "string"
        },
        "institution_name": {
          "type": "string"
        },
        "status": {
          "type": "ref",
          "ref": "PartnerEndCustomerOAuthStatusUpdatedValues"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "end_customer_client_id",
        "environment",
        "institution_id",
        "institution_name",
        "status"
      ]
    },
    "PartnerEndCustomerQuestionnaireStatus": {
      "type": "string"
    },
    "PartnerEndCustomerSecrets": {
      "type": "object",
      "properties": {
        "development": {
          "type": "string"
        },
        "sandbox": {
          "type": "string"
        }
      }
    },
    "PartnerEndCustomerStatus": {
      "type": "string"
    },
    "PartnerEndCustomerTechnicalContact": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "family_name": {
          "type": "string"
        },
        "given_name": {
          "type": "string"
        }
      }
    },
    "PartnerEndCustomerWithSecrets": {
      "type": "ref",
      "ref": "PartnerEndCustomer"
    },
    "Party": {
      "type": "object",
      "properties": {
        "INDIVIDUAL": {
          "type": "ref",
          "ref": "PartyIndividual"
        },
        "ROLES": {
          "type": "ref",
          "ref": "Roles"
        },
        "TAXPAYER_IDENTIFIERS": {
          "type": "ref",
          "ref": "TaxpayerIdentifiers"
        }
      },
      "required": [
        "INDIVIDUAL",
        "ROLES",
        "TAXPAYER_IDENTIFIERS"
      ]
    },
    "PartyIndividual": {
      "type": "object",
      "properties": {
        "NAME": {
          "type": "ref",
          "ref": "IndividualName"
        }
      },
      "required": [
        "NAME"
      ]
    },
    "PartyRoleType": {
      "type": "string"
    },
    "Pay": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number"
        },
        "currency": {
          "type": "string"
        }
      }
    },
    "PayFrequency": {
      "type": "object",
      "properties": {
        "value": {
          "type": "ref",
          "ref": "PayFrequencyValue"
        },
        "verification_status": {
          "type": "ref",
          "ref": "VerificationStatus"
        }
      },
      "required": [
        "value",
        "verification_status"
      ]
    },
    "PayFrequencyValue": {
      "type": "string"
    },
    "PayPeriodDetails": {
      "type": "object",
      "properties": {
        "check_amount": {
          "type": "number"
        },
        "distribution_breakdown": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DistributionBreakdown"
          }
        },
        "end_date": {
          "type": "string"
        },
        "gross_earnings": {
          "type": "number"
        },
        "pay_date": {
          "type": "string"
        },
        "pay_day": {
          "type": "string"
        },
        "pay_frequency": {
          "type": "string"
        },
        "start_date": {
          "type": "string"
        }
      }
    },
    "PayStubDeductionsBreakdown": {
      "type": "object",
      "properties": {
        "current_amount": {
          "type": "number"
        },
        "description": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        },
        "ytd_amount": {
          "type": "number"
        }
      },
      "required": [
        "current_amount",
        "description",
        "iso_currency_code",
        "unofficial_currency_code",
        "ytd_amount"
      ]
    },
    "PayStubDeductionsTotal": {
      "type": "object",
      "properties": {
        "current_amount": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        },
        "ytd_amount": {
          "type": "number"
        }
      },
      "required": [
        "current_amount",
        "iso_currency_code",
        "unofficial_currency_code",
        "ytd_amount"
      ]
    },
    "PayStubDistributionBreakdown": {
      "type": "object",
      "properties": {
        "account_name": {
          "type": "string"
        },
        "bank_name": {
          "type": "string"
        },
        "current_amount": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "mask": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        }
      },
      "required": [
        "account_name",
        "bank_name",
        "current_amount",
        "iso_currency_code",
        "mask",
        "type",
        "unofficial_currency_code"
      ]
    },
    "PayStubEarningsBreakdown": {
      "type": "object",
      "properties": {
        "canonical_description": {
          "type": "ref",
          "ref": "PayStubEarningsBreakdownCanonicalDescription"
        },
        "current_amount": {
          "type": "number"
        },
        "description": {
          "type": "string"
        },
        "hours": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "rate": {
          "type": "number"
        },
        "unofficial_currency_code": {
          "type": "string"
        },
        "ytd_amount": {
          "type": "number"
        }
      },
      "required": [
        "canonical_description",
        "current_amount",
        "description",
        "hours",
        "iso_currency_code",
        "rate",
        "unofficial_currency_code",
        "ytd_amount"
      ]
    },
    "PayStubEarningsBreakdownCanonicalDescription": {
      "type": "string"
    },
    "PayStubEarningsTotal": {
      "type": "object",
      "properties": {
        "current_amount": {
          "type": "number"
        },
        "hours": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        },
        "ytd_amount": {
          "type": "number"
        }
      },
      "required": [
        "current_amount",
        "hours",
        "iso_currency_code",
        "unofficial_currency_code",
        "ytd_amount"
      ]
    },
    "PayStubPayPeriodDetails": {
      "type": "object",
      "properties": {
        "distribution_breakdown": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PayStubDistributionBreakdown"
          }
        },
        "end_date": {
          "type": "string"
        },
        "gross_earnings": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "pay_amount": {
          "type": "number"
        },
        "pay_basis": {
          "type": "ref",
          "ref": "CreditPayStubPayBasisType"
        },
        "pay_date": {
          "type": "string"
        },
        "pay_frequency": {
          "type": "string"
        },
        "start_date": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        }
      },
      "required": [
        "pay_amount",
        "distribution_breakdown",
        "end_date",
        "gross_earnings",
        "iso_currency_code",
        "pay_date",
        "pay_frequency",
        "start_date",
        "unofficial_currency_code"
      ]
    },
    "PayStubTaxpayerID": {
      "type": "object",
      "properties": {
        "id_mask": {
          "type": "string"
        },
        "id_type": {
          "type": "string"
        }
      },
      "required": [
        "id_type",
        "id_mask"
      ]
    },
    "PaymentAmount": {
      "type": "object",
      "properties": {
        "currency": {
          "type": "ref",
          "ref": "PaymentAmountCurrency"
        },
        "value": {
          "type": "number"
        }
      },
      "required": [
        "currency",
        "value"
      ]
    },
    "PaymentAmountCurrency": {
      "type": "string"
    },
    "PaymentAmountNullable": {
      "type": "object",
      "properties": {
        "currency": {
          "type": "ref",
          "ref": "PaymentAmountCurrency"
        },
        "value": {
          "type": "number"
        }
      },
      "required": [
        "currency",
        "value"
      ]
    },
    "PaymentAmountRefunded": {
      "type": "ref",
      "ref": "PaymentAmountNullable"
    },
    "PaymentAmountToRefund": {
      "type": "ref",
      "ref": "PaymentAmountNullable"
    },
    "PaymentChannel": {
      "type": "string"
    },
    "PaymentConsentMaxPaymentAmount": {
      "type": "ref",
      "ref": "PaymentAmount"
    },
    "PaymentConsentPeriodicAlignment": {
      "type": "string"
    },
    "PaymentConsentPeriodicAmount": {
      "type": "object",
      "properties": {
        "alignment": {
          "type": "ref",
          "ref": "PaymentConsentPeriodicAlignment"
        },
        "amount": {
          "type": "ref",
          "ref": "PaymentConsentPeriodicAmountAmount"
        },
        "interval": {
          "type": "ref",
          "ref": "PaymentConsentPeriodicInterval"
        }
      },
      "required": [
        "amount",
        "interval",
        "alignment"
      ]
    },
    "PaymentConsentPeriodicAmountAmount": {
      "type": "ref",
      "ref": "PaymentAmount"
    },
    "PaymentConsentPeriodicInterval": {
      "type": "string"
    },
    "PaymentConsentValidDateTime": {
      "type": "object",
      "properties": {
        "from": {
          "type": "string"
        },
        "to": {
          "type": "string"
        }
      }
    },
    "PaymentInitiationAddress": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "street": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "street",
        "city",
        "postal_code",
        "country"
      ]
    },
    "PaymentInitiationConsent": {
      "type": "object",
      "properties": {
        "consent_id": {
          "type": "string"
        },
        "constraints": {
          "type": "ref",
          "ref": "PaymentInitiationConsentConstraints"
        },
        "created_at": {
          "type": "string"
        },
        "recipient_id": {
          "type": "string"
        },
        "reference": {
          "type": "string"
        },
        "scopes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PaymentInitiationConsentScope"
          }
        },
        "status": {
          "type": "ref",
          "ref": "PaymentInitiationConsentStatus"
        }
      },
      "required": [
        "consent_id",
        "status",
        "created_at",
        "recipient_id",
        "reference",
        "constraints",
        "scopes"
      ]
    },
    "PaymentInitiationConsentConstraints": {
      "type": "object",
      "properties": {
        "max_payment_amount": {
          "type": "ref",
          "ref": "PaymentConsentMaxPaymentAmount"
        },
        "periodic_amounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PaymentConsentPeriodicAmount"
          }
        },
        "valid_date_time": {
          "type": "ref",
          "ref": "PaymentConsentValidDateTime"
        }
      },
      "required": [
        "max_payment_amount",
        "periodic_amounts"
      ]
    },
    "PaymentInitiationConsentCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "constraints": {
          "type": "ref",
          "ref": "PaymentInitiationConsentConstraints"
        },
        "options": {
          "type": "ref",
          "ref": "ExternalPaymentInitiationConsentOptions"
        },
        "recipient_id": {
          "type": "string"
        },
        "reference": {
          "type": "string"
        },
        "scopes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PaymentInitiationConsentScope"
          }
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "recipient_id",
        "reference",
        "scopes",
        "constraints"
      ]
    },
    "PaymentInitiationConsentCreateResponse": {
      "type": "object",
      "properties": {
        "consent_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "status": {
          "type": "ref",
          "ref": "PaymentInitiationConsentStatus"
        }
      },
      "required": [
        "consent_id",
        "status",
        "request_id"
      ]
    },
    "PaymentInitiationConsentGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "consent_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "consent_id"
      ]
    },
    "PaymentInitiationConsentGetResponse": {
      "type": "ref",
      "ref": "PaymentInitiationConsent"
    },
    "PaymentInitiationConsentPaymentExecuteRequest": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "ref",
          "ref": "PaymentAmount"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "consent_id": {
          "type": "string"
        },
        "idempotency_key": {
          "type": "ref",
          "ref": "ConsentPaymentIdempotencyKey"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "consent_id",
        "amount",
        "idempotency_key"
      ]
    },
    "PaymentInitiationConsentPaymentExecuteResponse": {
      "type": "object",
      "properties": {
        "payment_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "status": {
          "type": "ref",
          "ref": "PaymentInitiationPaymentStatus"
        }
      },
      "required": [
        "payment_id",
        "status",
        "request_id"
      ]
    },
    "PaymentInitiationConsentRevokeRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "consent_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "consent_id"
      ]
    },
    "PaymentInitiationConsentRevokeResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      }
    },
    "PaymentInitiationConsentScope": {
      "type": "string"
    },
    "PaymentInitiationConsentStatus": {
      "type": "string"
    },
    "PaymentInitiationMaximumPaymentAmount": {
      "type": "object",
      "properties": {}
    },
    "PaymentInitiationMetadata": {
      "type": "object",
      "properties": {
        "maximum_payment_amount": {
          "type": "ref",
          "ref": "PaymentInitiationMaximumPaymentAmount"
        },
        "standing_order_metadata": {
          "type": "ref",
          "ref": "PaymentInitiationStandingOrderMetadata"
        },
        "supports_international_payments": {
          "type": "boolean"
        },
        "supports_refund_details": {
          "type": "boolean"
        },
        "supports_sepa_instant": {
          "type": "boolean"
        }
      },
      "required": [
        "supports_international_payments",
        "supports_sepa_instant",
        "maximum_payment_amount",
        "supports_refund_details",
        "standing_order_metadata"
      ]
    },
    "PaymentInitiationOptionalRestrictionBacs": {
      "type": "ref",
      "ref": "RecipientBACS"
    },
    "PaymentInitiationPayment": {
      "type": "object",
      "properties": {
        "adjusted_reference": {
          "type": "string"
        },
        "adjusted_scheme": {
          "type": "ref",
          "ref": "PaymentScheme"
        },
        "amount": {
          "type": "ref",
          "ref": "PaymentAmount"
        },
        "amount_refunded": {
          "type": "ref",
          "ref": "PaymentAmountRefunded"
        },
        "bacs": {
          "type": "ref",
          "ref": "SenderBACSNullable"
        },
        "consent_id": {
          "type": "string"
        },
        "iban": {
          "type": "string"
        },
        "last_status_update": {
          "type": "string"
        },
        "payment_id": {
          "type": "string"
        },
        "recipient_id": {
          "type": "string"
        },
        "reference": {
          "type": "string"
        },
        "refund_details": {
          "type": "ref",
          "ref": "ExternalPaymentRefundDetails"
        },
        "refund_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "schedule": {
          "type": "ref",
          "ref": "ExternalPaymentScheduleGet"
        },
        "scheme": {
          "type": "ref",
          "ref": "PaymentScheme"
        },
        "status": {
          "type": "ref",
          "ref": "PaymentInitiationPaymentStatus"
        },
        "transaction_id": {
          "type": "string"
        },
        "wallet_id": {
          "type": "string"
        }
      },
      "required": [
        "payment_id",
        "amount",
        "status",
        "recipient_id",
        "reference",
        "last_status_update",
        "bacs",
        "iban"
      ]
    },
    "PaymentInitiationPaymentCreateRequest": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "ref",
          "ref": "PaymentAmount"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "ExternalPaymentOptions"
        },
        "recipient_id": {
          "type": "string"
        },
        "reference": {
          "type": "string"
        },
        "schedule": {
          "type": "ref",
          "ref": "ExternalPaymentScheduleRequest"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "recipient_id",
        "reference",
        "amount"
      ]
    },
    "PaymentInitiationPaymentCreateResponse": {
      "type": "object",
      "properties": {
        "payment_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "status": {
          "type": "ref",
          "ref": "PaymentInitiationPaymentCreateStatus"
        }
      },
      "required": [
        "payment_id",
        "status",
        "request_id"
      ]
    },
    "PaymentInitiationPaymentCreateStatus": {
      "type": "string"
    },
    "PaymentInitiationPaymentGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "payment_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "payment_id"
      ]
    },
    "PaymentInitiationPaymentGetResponse": {
      "type": "ref",
      "ref": "PaymentInitiationPayment"
    },
    "PaymentInitiationPaymentListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "consent_id": {
          "type": "string"
        },
        "count": {
          "type": "number"
        },
        "cursor": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "PaymentInitiationPaymentListResponse": {
      "type": "object",
      "properties": {
        "next_cursor": {
          "type": "string"
        },
        "payments": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PaymentInitiationPayment"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "payments",
        "next_cursor",
        "request_id"
      ]
    },
    "PaymentInitiationPaymentReverseRequest": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "ref",
          "ref": "PaymentAmountToRefund"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "idempotency_key": {
          "type": "ref",
          "ref": "WalletTransactionIdempotencyKey"
        },
        "payment_id": {
          "type": "string"
        },
        "reference": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "payment_id",
        "idempotency_key",
        "reference"
      ]
    },
    "PaymentInitiationPaymentReverseResponse": {
      "type": "object",
      "properties": {
        "refund_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "status": {
          "type": "ref",
          "ref": "WalletTransactionStatus"
        }
      },
      "required": [
        "refund_id",
        "request_id",
        "status"
      ]
    },
    "PaymentInitiationPaymentStatus": {
      "type": "string"
    },
    "PaymentInitiationPaymentTokenCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "payment_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "payment_id"
      ]
    },
    "PaymentInitiationPaymentTokenCreateResponse": {
      "type": "object",
      "properties": {
        "payment_token": {
          "type": "string"
        },
        "payment_token_expiration_time": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "payment_token",
        "payment_token_expiration_time",
        "request_id"
      ]
    },
    "PaymentInitiationRecipient": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "PaymentInitiationAddress"
        },
        "bacs": {
          "type": "ref",
          "ref": "RecipientBACSNullable"
        },
        "iban": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "recipient_id": {
          "type": "string"
        }
      },
      "required": [
        "recipient_id",
        "name"
      ]
    },
    "PaymentInitiationRecipientCreateRequest": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "PaymentInitiationAddress"
        },
        "bacs": {
          "type": "ref",
          "ref": "RecipientBACSNullable"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "iban": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "name"
      ]
    },
    "PaymentInitiationRecipientCreateResponse": {
      "type": "object",
      "properties": {
        "recipient_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "recipient_id",
        "request_id"
      ]
    },
    "PaymentInitiationRecipientGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "recipient_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "recipient_id"
      ]
    },
    "PaymentInitiationRecipientGetResponse": {
      "type": "ref",
      "ref": "PaymentInitiationRecipient"
    },
    "PaymentInitiationRecipientListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "PaymentInitiationRecipientListResponse": {
      "type": "object",
      "properties": {
        "recipients": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PaymentInitiationRecipient"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "recipients",
        "request_id"
      ]
    },
    "PaymentInitiationStandingOrderMetadata": {
      "type": "object",
      "properties": {
        "supports_standing_order_end_date": {
          "type": "boolean"
        },
        "supports_standing_order_negative_execution_days": {
          "type": "boolean"
        },
        "valid_standing_order_intervals": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PaymentScheduleInterval"
          }
        }
      },
      "required": [
        "supports_standing_order_end_date",
        "supports_standing_order_negative_execution_days",
        "valid_standing_order_intervals"
      ]
    },
    "PaymentMeta": {
      "type": "object",
      "properties": {
        "by_order_of": {
          "type": "string"
        },
        "payee": {
          "type": "string"
        },
        "payer": {
          "type": "string"
        },
        "payment_method": {
          "type": "string"
        },
        "payment_processor": {
          "type": "string"
        },
        "ppd_id": {
          "type": "string"
        },
        "reason": {
          "type": "string"
        },
        "reference_number": {
          "type": "string"
        }
      },
      "required": [
        "reference_number",
        "ppd_id",
        "payee",
        "by_order_of",
        "payer",
        "payment_method",
        "payment_processor",
        "reason"
      ]
    },
    "PaymentProfileCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "PaymentProfileCreateResponse": {
      "type": "object",
      "properties": {
        "payment_profile_token": {
          "type": "ref",
          "ref": "PaymentProfileToken"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "payment_profile_token",
        "request_id"
      ]
    },
    "PaymentProfileGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "payment_profile_token": {
          "type": "ref",
          "ref": "PaymentProfileToken"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "payment_profile_token"
      ]
    },
    "PaymentProfileGetResponse": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "string"
        },
        "deleted_at": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "status": {
          "type": "ref",
          "ref": "PaymentProfileStatus"
        },
        "updated_at": {
          "type": "string"
        }
      },
      "required": [
        "request_id",
        "status",
        "created_at",
        "updated_at",
        "deleted_at"
      ]
    },
    "PaymentProfileRemoveRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "payment_profile_token": {
          "type": "ref",
          "ref": "PaymentProfileToken"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "payment_profile_token"
      ]
    },
    "PaymentProfileRemoveResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "PaymentProfileStatus": {
      "type": "string"
    },
    "PaymentProfileToken": {
      "type": "string"
    },
    "PaymentScheduleInterval": {
      "type": "string"
    },
    "PaymentScheme": {
      "type": "string"
    },
    "PaymentStatusUpdateWebhook": {
      "type": "object",
      "properties": {
        "adjusted_reference": {
          "type": "string"
        },
        "adjusted_start_date": {
          "type": "string"
        },
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "new_payment_status": {
          "type": "ref",
          "ref": "PaymentInitiationPaymentStatus"
        },
        "old_payment_status": {
          "type": "ref",
          "ref": "PaymentInitiationPaymentStatus"
        },
        "original_reference": {
          "type": "string"
        },
        "original_start_date": {
          "type": "string"
        },
        "payment_id": {
          "type": "string"
        },
        "timestamp": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "payment_id",
        "new_payment_status",
        "old_payment_status",
        "original_reference",
        "original_start_date",
        "adjusted_start_date",
        "timestamp",
        "environment"
      ]
    },
    "PayrollIncomeAccountData": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "pay_frequency": {
          "type": "string"
        },
        "rate_of_pay": {
          "type": "ref",
          "ref": "PayrollIncomeRateOfPay"
        }
      },
      "required": [
        "account_id",
        "rate_of_pay",
        "pay_frequency"
      ]
    },
    "PayrollIncomeObject": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "form1099s": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Credit1099"
          }
        },
        "pay_stubs": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditPayStub"
          }
        },
        "w2s": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CreditW2"
          }
        }
      },
      "required": [
        "account_id",
        "pay_stubs",
        "w2s",
        "form1099s"
      ]
    },
    "PayrollIncomeRateOfPay": {
      "type": "object",
      "properties": {
        "pay_amount": {
          "type": "number"
        },
        "pay_rate": {
          "type": "string"
        }
      }
    },
    "PayrollItem": {
      "type": "object",
      "properties": {
        "accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PayrollIncomeAccountData"
          }
        },
        "institution_id": {
          "type": "string"
        },
        "institution_name": {
          "type": "string"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "payroll_income": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PayrollIncomeObject"
          }
        },
        "status": {
          "type": "ref",
          "ref": "PayrollItemStatus"
        },
        "updated_at": {
          "type": "string"
        }
      },
      "required": [
        "item_id",
        "institution_id",
        "institution_name",
        "payroll_income",
        "status",
        "accounts",
        "updated_at"
      ]
    },
    "PayrollItemStatus": {
      "type": "object",
      "properties": {
        "processing_status": {
          "type": "string"
        }
      }
    },
    "PayrollRiskSignalsItem": {
      "type": "object",
      "properties": {
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "verification_risk_signals": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DocumentRiskSignalsObject"
          }
        }
      },
      "required": [
        "item_id",
        "verification_risk_signals"
      ]
    },
    "Paystub": {
      "type": "object",
      "properties": {
        "deductions": {
          "type": "ref",
          "ref": "Deductions"
        },
        "doc_id": {
          "type": "string"
        },
        "earnings": {
          "type": "ref",
          "ref": "Earnings"
        },
        "employee": {
          "type": "ref",
          "ref": "Employee"
        },
        "employer": {
          "type": "ref",
          "ref": "PaystubEmployer"
        },
        "employment_details": {
          "type": "ref",
          "ref": "EmploymentDetails"
        },
        "income_breakdown": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "IncomeBreakdown"
          }
        },
        "net_pay": {
          "type": "ref",
          "ref": "NetPay"
        },
        "pay_period_details": {
          "type": "ref",
          "ref": "PayPeriodDetails"
        },
        "paystub_details": {
          "type": "ref",
          "ref": "PaystubDetails"
        },
        "ytd_earnings": {
          "type": "ref",
          "ref": "PaystubYTDDetails"
        }
      },
      "required": [
        "deductions",
        "doc_id",
        "earnings",
        "employee",
        "employer",
        "net_pay",
        "pay_period_details"
      ]
    },
    "PaystubAddress": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "line1": {
          "type": "string"
        },
        "line2": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "state_code": {
          "type": "string"
        },
        "street": {
          "type": "string"
        }
      }
    },
    "PaystubDeduction": {
      "type": "object",
      "properties": {
        "is_pretax": {
          "type": "boolean"
        },
        "total": {
          "type": "number"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "is_pretax",
        "total"
      ]
    },
    "PaystubDetails": {
      "type": "object",
      "properties": {
        "pay_date": {
          "type": "string"
        },
        "pay_frequency": {
          "type": "ref",
          "ref": "PaystubPayFrequency"
        },
        "pay_period_end_date": {
          "type": "string"
        },
        "pay_period_start_date": {
          "type": "string"
        },
        "paystub_provider": {
          "type": "string"
        }
      }
    },
    "PaystubEmployer": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "PaystubAddress"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "name"
      ]
    },
    "PaystubOverride": {
      "type": "object",
      "properties": {
        "employee": {
          "type": "ref",
          "ref": "PaystubOverrideEmployee"
        },
        "employer": {
          "type": "ref",
          "ref": "PaystubOverrideEmployer"
        },
        "income_breakdown": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "IncomeBreakdown"
          }
        },
        "pay_period_details": {
          "type": "ref",
          "ref": "PayPeriodDetails"
        }
      }
    },
    "PaystubOverrideEmployee": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "PaystubOverrideEmployeeAddress"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "PaystubOverrideEmployeeAddress": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "street": {
          "type": "string"
        }
      }
    },
    "PaystubOverrideEmployer": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      }
    },
    "PaystubPayFrequency": {
      "type": "string"
    },
    "PaystubYTDDetails": {
      "type": "object",
      "properties": {
        "gross_earnings": {
          "type": "number"
        },
        "net_earnings": {
          "type": "number"
        }
      }
    },
    "PendingExpirationWebhook": {
      "type": "object",
      "properties": {
        "consent_expiration_time": {
          "type": "string"
        },
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "item_id",
        "consent_expiration_time",
        "environment"
      ]
    },
    "PersonalFinanceCategory": {
      "type": "object",
      "properties": {
        "detailed": {
          "type": "string"
        },
        "primary": {
          "type": "string"
        }
      },
      "required": [
        "primary",
        "detailed"
      ]
    },
    "PhoneNumber": {
      "type": "object",
      "properties": {
        "data": {
          "type": "string"
        },
        "primary": {
          "type": "boolean"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "data",
        "primary",
        "type"
      ]
    },
    "PhoneNumberMatchScore": {
      "type": "object",
      "properties": {
        "score": {
          "type": "number"
        }
      }
    },
    "PhoneType": {
      "type": "string"
    },
    "PhysicalDocumentCategory": {
      "type": "string"
    },
    "PhysicalDocumentExtractedData": {
      "type": "object",
      "properties": {
        "category": {
          "type": "ref",
          "ref": "PhysicalDocumentCategory"
        },
        "expiration_date": {
          "type": "ref",
          "ref": "ISO8601DateNullable"
        },
        "id_number": {
          "type": "ref",
          "ref": "PhysicalDocumentIDNumber"
        },
        "issuing_country": {
          "type": "ref",
          "ref": "GenericCountryCode"
        },
        "issuing_region": {
          "type": "ref",
          "ref": "RegionNullable"
        }
      },
      "required": [
        "id_number",
        "category",
        "expiration_date",
        "issuing_country",
        "issuing_region"
      ]
    },
    "PhysicalDocumentExtractedDataAnalysis": {
      "type": "object",
      "properties": {
        "date_of_birth": {
          "type": "ref",
          "ref": "DocumentDateOfBirthMatchCode"
        },
        "expiration_date": {
          "type": "ref",
          "ref": "ExpirationDate"
        },
        "issuing_country": {
          "type": "ref",
          "ref": "IssuingCountry"
        },
        "name": {
          "type": "ref",
          "ref": "DocumentNameMatchCode"
        }
      },
      "required": [
        "name",
        "date_of_birth",
        "expiration_date",
        "issuing_country"
      ]
    },
    "PhysicalDocumentIDNumber": {
      "type": "string"
    },
    "PhysicalDocumentImages": {
      "type": "object",
      "properties": {
        "cropped_back": {
          "type": "ref",
          "ref": "DocumentImage__CroppedBack"
        },
        "cropped_front": {
          "type": "ref",
          "ref": "DocumentImage__CroppedFront"
        },
        "face": {
          "type": "ref",
          "ref": "DocumentImage__Face"
        },
        "original_back": {
          "type": "ref",
          "ref": "DocumentImage__Back"
        },
        "original_front": {
          "type": "ref",
          "ref": "DocumentImage__Front"
        }
      },
      "required": [
        "original_front",
        "original_back",
        "cropped_front",
        "cropped_back",
        "face"
      ]
    },
    "PlaidError": {
      "type": "object",
      "properties": {
        "causes": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {}
          }
        },
        "display_message": {
          "type": "string"
        },
        "documentation_url": {
          "type": "string"
        },
        "error_code": {
          "type": "string"
        },
        "error_message": {
          "type": "string"
        },
        "error_type": {
          "type": "ref",
          "ref": "PlaidErrorType"
        },
        "request_id": {
          "type": "string"
        },
        "status": {
          "type": "number"
        },
        "suggested_action": {
          "type": "string"
        }
      },
      "required": [
        "error_type",
        "error_code",
        "error_message",
        "display_message"
      ]
    },
    "PlaidErrorType": {
      "type": "string"
    },
    "PlatformIds": {
      "type": "object",
      "properties": {
        "employee_id": {
          "type": "string"
        },
        "payroll_id": {
          "type": "string"
        },
        "position_id": {
          "type": "string"
        }
      }
    },
    "PostalCode": {
      "type": "string"
    },
    "PostalCodeNullable": {
      "type": "string"
    },
    "PreviousIdentityVerificationAttemptID": {
      "type": "string"
    },
    "ProcessorApexProcessorTokenCreateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "account_id": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token",
        "account_id"
      ]
    },
    "ProcessorAuthGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "processor_token": {
          "type": "ref",
          "ref": "ProcessorToken"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "processor_token"
      ]
    },
    "ProcessorAuthGetResponse": {
      "type": "object",
      "properties": {
        "account": {
          "type": "ref",
          "ref": "AccountBase"
        },
        "numbers": {
          "type": "ref",
          "ref": "ProcessorNumber"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id",
        "numbers",
        "account"
      ]
    },
    "ProcessorBalanceGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "ProcessorBalanceGetRequestOptions"
        },
        "processor_token": {
          "type": "ref",
          "ref": "ProcessorToken"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "processor_token"
      ]
    },
    "ProcessorBalanceGetRequestOptions": {
      "type": "object",
      "properties": {
        "min_last_updated_datetime": {
          "type": "ref",
          "ref": "MinLastUpdatedDatetime"
        }
      }
    },
    "ProcessorBalanceGetResponse": {
      "type": "object",
      "properties": {
        "account": {
          "type": "ref",
          "ref": "AccountBase"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "account",
        "request_id"
      ]
    },
    "ProcessorBankTransferCreateRequest": {
      "type": "object",
      "properties": {
        "ach_class": {
          "type": "ref",
          "ref": "ACHClass"
        },
        "amount": {
          "type": "ref",
          "ref": "BankTransferAmount"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "custom_tag": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "idempotency_key": {
          "type": "ref",
          "ref": "BankTransferIdempotencyKey"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "BankTransferMetadata"
        },
        "network": {
          "type": "ref",
          "ref": "BankTransferNetwork"
        },
        "origination_account_id": {
          "type": "string"
        },
        "processor_token": {
          "type": "ref",
          "ref": "ProcessorToken"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "type": {
          "type": "ref",
          "ref": "BankTransferType"
        },
        "user": {
          "type": "ref",
          "ref": "BankTransferUser"
        }
      },
      "required": [
        "idempotency_key",
        "processor_token",
        "type",
        "network",
        "amount",
        "iso_currency_code",
        "description",
        "user"
      ]
    },
    "ProcessorBankTransferCreateResponse": {
      "type": "object",
      "properties": {
        "bank_transfer": {
          "type": "ref",
          "ref": "BankTransfer"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "bank_transfer",
        "request_id"
      ]
    },
    "ProcessorIdentityGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "processor_token": {
          "type": "ref",
          "ref": "ProcessorToken"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "processor_token"
      ]
    },
    "ProcessorIdentityGetResponse": {
      "type": "object",
      "properties": {
        "account": {
          "type": "ref",
          "ref": "AccountIdentity"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "account",
        "request_id"
      ]
    },
    "ProcessorNumber": {
      "type": "object",
      "properties": {
        "ach": {
          "type": "ref",
          "ref": "NumbersACHNullable"
        },
        "bacs": {
          "type": "ref",
          "ref": "NumbersBACSNullable"
        },
        "eft": {
          "type": "ref",
          "ref": "NumbersEFTNullable"
        },
        "international": {
          "type": "ref",
          "ref": "NumbersInternationalNullable"
        }
      }
    },
    "ProcessorSignalDecisionReportRequest": {
      "type": "object",
      "properties": {
        "amount_instantly_available": {
          "type": "number"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_transaction_id": {
          "type": "string"
        },
        "days_funds_on_hold": {
          "type": "number"
        },
        "decision_outcome": {
          "type": "ref",
          "ref": "SignalDecisionOutcome"
        },
        "initiated": {
          "type": "boolean"
        },
        "payment_method": {
          "type": "ref",
          "ref": "SignalPaymentMethod"
        },
        "processor_token": {
          "type": "ref",
          "ref": "ProcessorToken"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "processor_token",
        "client_transaction_id",
        "initiated"
      ]
    },
    "ProcessorSignalDecisionReportResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "ProcessorSignalEvaluateRequest": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_transaction_id": {
          "type": "string"
        },
        "client_user_id": {
          "type": "string"
        },
        "default_payment_method": {
          "type": "string"
        },
        "device": {
          "type": "ref",
          "ref": "SignalDevice"
        },
        "is_recurring": {
          "type": "boolean"
        },
        "processor_token": {
          "type": "ref",
          "ref": "ProcessorToken"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user": {
          "type": "ref",
          "ref": "SignalUser"
        },
        "user_present": {
          "type": "boolean"
        }
      },
      "required": [
        "processor_token",
        "client_transaction_id",
        "amount"
      ]
    },
    "ProcessorSignalEvaluateResponse": {
      "type": "object",
      "properties": {
        "core_attributes": {
          "type": "ref",
          "ref": "SignalEvaluateCoreAttributes"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "scores": {
          "type": "ref",
          "ref": "SignalScores"
        }
      },
      "required": [
        "request_id",
        "scores"
      ]
    },
    "ProcessorSignalReturnReportRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_transaction_id": {
          "type": "string"
        },
        "processor_token": {
          "type": "ref",
          "ref": "ProcessorToken"
        },
        "return_code": {
          "type": "string"
        },
        "returned_at": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "processor_token",
        "client_transaction_id",
        "return_code"
      ]
    },
    "ProcessorSignalReturnReportResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "ProcessorStripeBankAccountTokenCreateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "account_id": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token",
        "account_id"
      ]
    },
    "ProcessorStripeBankAccountTokenCreateResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "stripe_bank_account_token": {
          "type": "string"
        }
      },
      "required": [
        "stripe_bank_account_token",
        "request_id"
      ]
    },
    "ProcessorToken": {
      "type": "string"
    },
    "ProcessorTokenCreateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "account_id": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "processor": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token",
        "account_id",
        "processor"
      ]
    },
    "ProcessorTokenCreateResponse": {
      "type": "object",
      "properties": {
        "processor_token": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "processor_token",
        "request_id"
      ]
    },
    "ProductAccess": {
      "type": "object",
      "properties": {
        "accounts_details_transactions": {
          "type": "boolean"
        },
        "accounts_routing_number": {
          "type": "boolean"
        },
        "accounts_statements": {
          "type": "boolean"
        },
        "accounts_tax_statements": {
          "type": "boolean"
        },
        "auth": {
          "type": "boolean"
        },
        "customers_profiles": {
          "type": "boolean"
        },
        "identity": {
          "type": "boolean"
        },
        "statements": {
          "type": "boolean"
        },
        "transactions": {
          "type": "boolean"
        }
      }
    },
    "ProductStatus": {
      "type": "object",
      "properties": {
        "breakdown": {
          "type": "ref",
          "ref": "ProductStatusBreakdown"
        },
        "last_status_change": {
          "type": "string"
        },
        "status": {
          "type": "string"
        }
      },
      "required": [
        "status",
        "last_status_change",
        "breakdown"
      ]
    },
    "ProductStatusBreakdown": {
      "type": "object",
      "properties": {
        "error_institution": {
          "type": "number"
        },
        "error_plaid": {
          "type": "number"
        },
        "refresh_interval": {
          "type": "string"
        },
        "success": {
          "type": "number"
        }
      },
      "required": [
        "success",
        "error_plaid",
        "error_institution"
      ]
    },
    "Products": {
      "type": "string"
    },
    "ProgramArchived": {
      "type": "boolean"
    },
    "ProgramNameSensitivity": {
      "type": "string"
    },
    "ProjectedIncomeSummaryFieldNumber": {
      "type": "ref",
      "ref": "IncomeSummaryFieldNumber"
    },
    "Recaptcha_RequiredError": {
      "type": "object",
      "properties": {
        "common_causes": {
          "type": "string"
        },
        "display_message": {
          "type": "string"
        },
        "error_code": {
          "type": "string"
        },
        "error_type": {
          "type": "string"
        },
        "http_code": {
          "type": "string"
        },
        "link_user_experience": {
          "type": "string"
        },
        "troubleshooting_steps": {
          "type": "string"
        }
      },
      "required": [
        "error_type",
        "error_code",
        "display_message",
        "http_code",
        "link_user_experience",
        "common_causes",
        "troubleshooting_steps"
      ]
    },
    "RecipientBACS": {
      "type": "object",
      "properties": {
        "account": {
          "type": "string"
        },
        "sort_code": {
          "type": "string"
        }
      }
    },
    "RecipientBACSNullable": {
      "type": "ref",
      "ref": "RecipientBACS"
    },
    "RecurringCancelledWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "recurring_transfer_id": {
          "type": "ref",
          "ref": "RecurringTransferID"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "recurring_transfer_id",
        "environment"
      ]
    },
    "RecurringNewTransferWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "recurring_transfer_id": {
          "type": "ref",
          "ref": "RecurringTransferID"
        },
        "transfer_id": {
          "type": "ref",
          "ref": "TransferID"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "recurring_transfer_id",
        "transfer_id",
        "environment"
      ]
    },
    "RecurringTransactionFrequency": {
      "type": "string"
    },
    "RecurringTransactionsUpdateWebhook": {
      "type": "object",
      "properties": {
        "account_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "item_id",
        "account_ids",
        "environment"
      ]
    },
    "RecurringTransfer": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "ach_class": {
          "type": "ref",
          "ref": "ACHClass"
        },
        "amount": {
          "type": "ref",
          "ref": "TransferAmount"
        },
        "created": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "funding_account_id": {
          "type": "ref",
          "ref": "TransferFundingAccountIDResponse"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "network": {
          "type": "ref",
          "ref": "TransferNetwork"
        },
        "next_origination_date": {
          "type": "string"
        },
        "origination_account_id": {
          "type": "string"
        },
        "recurring_transfer_id": {
          "type": "ref",
          "ref": "RecurringTransferID"
        },
        "schedule": {
          "type": "ref",
          "ref": "TransferRecurringSchedule"
        },
        "status": {
          "type": "ref",
          "ref": "TransferRecurringStatus"
        },
        "test_clock_id": {
          "type": "string"
        },
        "transfer_ids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TransferID"
          }
        },
        "type": {
          "type": "ref",
          "ref": "TransferType"
        },
        "user": {
          "type": "ref",
          "ref": "TransferUserInResponse"
        }
      },
      "required": [
        "recurring_transfer_id",
        "created",
        "next_origination_date",
        "type",
        "amount",
        "status",
        "network",
        "iso_currency_code",
        "origination_account_id",
        "funding_account_id",
        "account_id",
        "user",
        "schedule",
        "description",
        "transfer_ids"
      ]
    },
    "RecurringTransferID": {
      "type": "string"
    },
    "RecurringTransferNullable": {
      "type": "ref",
      "ref": "RecurringTransfer"
    },
    "RecurringTransferSkippedWebhook": {
      "type": "object",
      "properties": {
        "authorization_decision": {
          "type": "ref",
          "ref": "TransferAuthorizationDecision"
        },
        "authorization_decision_rationale_code": {
          "type": "ref",
          "ref": "TransferAuthorizationDecisionRationaleCode"
        },
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "recurring_transfer_id": {
          "type": "ref",
          "ref": "RecurringTransferID"
        },
        "skipped_origination_date": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "recurring_transfer_id",
        "authorization_decision",
        "skipped_origination_date",
        "environment"
      ]
    },
    "Region": {
      "type": "string"
    },
    "RegionNullable": {
      "type": "string"
    },
    "RemovedTransaction": {
      "type": "object",
      "properties": {
        "transaction_id": {
          "type": "string"
        }
      }
    },
    "ReportType": {
      "type": "string"
    },
    "ReportingInformation": {
      "type": "object",
      "properties": {
        "ReportingInformationIdentifier": {
          "type": "string"
        }
      },
      "required": [
        "ReportingInformationIdentifier"
      ]
    },
    "RequestID": {
      "type": "string"
    },
    "ReviewComment": {
      "type": "string"
    },
    "RiskSignalDocumentReference": {
      "type": "object",
      "properties": {
        "document_id": {
          "type": "string"
        },
        "document_name": {
          "type": "string"
        }
      }
    },
    "Role": {
      "type": "object",
      "properties": {
        "ROLE_DETAIL": {
          "type": "ref",
          "ref": "RoleDetail"
        }
      },
      "required": [
        "ROLE_DETAIL"
      ]
    },
    "RoleDetail": {
      "type": "object",
      "properties": {
        "PartyRoleType": {
          "type": "ref",
          "ref": "PartyRoleType"
        }
      },
      "required": [
        "PartyRoleType"
      ]
    },
    "Roles": {
      "type": "object",
      "properties": {
        "ROLE": {
          "type": "ref",
          "ref": "Role"
        }
      },
      "required": [
        "ROLE"
      ]
    },
    "SandboxBankTransferFireWebhookRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "webhook": {
          "type": "string"
        }
      },
      "required": [
        "webhook"
      ]
    },
    "SandboxBankTransferFireWebhookResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "SandboxBankTransferSimulateRequest": {
      "type": "object",
      "properties": {
        "bank_transfer_id": {
          "type": "ref",
          "ref": "BankTransferID"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "event_type": {
          "type": "string"
        },
        "failure_reason": {
          "type": "ref",
          "ref": "BankTransferFailure"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "bank_transfer_id",
        "event_type"
      ]
    },
    "SandboxBankTransferSimulateResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "SandboxIncomeFireWebhookRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "item_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user_id": {
          "type": "ref",
          "ref": "UserId"
        },
        "verification_status": {
          "type": "string"
        },
        "webhook": {
          "type": "string"
        }
      },
      "required": [
        "item_id",
        "webhook",
        "verification_status"
      ]
    },
    "SandboxIncomeFireWebhookResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "SandboxItemFireWebhookRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "ref",
          "ref": "WebhookType"
        }
      },
      "required": [
        "access_token",
        "webhook_code"
      ]
    },
    "SandboxItemFireWebhookResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "webhook_fired": {
          "type": "boolean"
        }
      },
      "required": [
        "webhook_fired",
        "request_id"
      ]
    },
    "SandboxItemResetLoginRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "SandboxItemResetLoginResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "reset_login": {
          "type": "boolean"
        }
      },
      "required": [
        "reset_login",
        "request_id"
      ]
    },
    "SandboxItemSetVerificationStatusRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "account_id": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "verification_status": {
          "type": "string"
        }
      },
      "required": [
        "access_token",
        "account_id",
        "verification_status"
      ]
    },
    "SandboxItemSetVerificationStatusResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "SandboxOauthSelectAccountsRequest": {
      "type": "object",
      "properties": {
        "accounts": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "oauth_state_id": {
          "type": "string"
        }
      },
      "required": [
        "oauth_state_id",
        "accounts"
      ]
    },
    "SandboxOauthSelectAccountsResponse": {
      "type": "object",
      "properties": {}
    },
    "SandboxOverridePassword": {
      "type": "string"
    },
    "SandboxOverrideUsername": {
      "type": "string"
    },
    "SandboxPaymentProfileResetLoginRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "payment_profile_token": {
          "type": "ref",
          "ref": "PaymentProfileToken"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "payment_profile_token"
      ]
    },
    "SandboxPaymentProfileResetLoginResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "reset_login": {
          "type": "boolean"
        }
      },
      "required": [
        "reset_login",
        "request_id"
      ]
    },
    "SandboxProcessorTokenCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "institution_id": {
          "type": "string"
        },
        "options": {
          "type": "ref",
          "ref": "SandboxProcessorTokenCreateRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "institution_id"
      ]
    },
    "SandboxProcessorTokenCreateRequestOptions": {
      "type": "object",
      "properties": {
        "override_password": {
          "type": "ref",
          "ref": "SandboxOverridePassword"
        },
        "override_username": {
          "type": "ref",
          "ref": "SandboxOverrideUsername"
        }
      }
    },
    "SandboxProcessorTokenCreateResponse": {
      "type": "object",
      "properties": {
        "processor_token": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "processor_token",
        "request_id"
      ]
    },
    "SandboxPublicTokenCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "initial_products": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Products"
          }
        },
        "institution_id": {
          "type": "string"
        },
        "options": {
          "type": "ref",
          "ref": "SandboxPublicTokenCreateRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user_token": {
          "type": "ref",
          "ref": "UserToken"
        }
      },
      "required": [
        "institution_id",
        "initial_products"
      ]
    },
    "SandboxPublicTokenCreateRequestIncomeVerificationBankIncome": {
      "type": "object",
      "properties": {
        "days_requested": {
          "type": "number"
        }
      }
    },
    "SandboxPublicTokenCreateRequestOptions": {
      "type": "object",
      "properties": {
        "income_verification": {
          "type": "ref",
          "ref": "SandboxPublicTokenCreateRequestOptionsIncomeVerification"
        },
        "override_password": {
          "type": "ref",
          "ref": "SandboxOverridePassword"
        },
        "override_username": {
          "type": "ref",
          "ref": "SandboxOverrideUsername"
        },
        "transactions": {
          "type": "ref",
          "ref": "SandboxPublicTokenCreateRequestOptionsTransactions"
        },
        "webhook": {
          "type": "string"
        }
      }
    },
    "SandboxPublicTokenCreateRequestOptionsIncomeVerification": {
      "type": "object",
      "properties": {
        "bank_income": {
          "type": "ref",
          "ref": "SandboxPublicTokenCreateRequestIncomeVerificationBankIncome"
        },
        "income_source_types": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "IncomeVerificationSourceType"
          }
        }
      }
    },
    "SandboxPublicTokenCreateRequestOptionsTransactions": {
      "type": "object",
      "properties": {
        "end_date": {
          "type": "string"
        },
        "start_date": {
          "type": "string"
        }
      }
    },
    "SandboxPublicTokenCreateResponse": {
      "type": "object",
      "properties": {
        "public_token": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "public_token",
        "request_id"
      ]
    },
    "SandboxTransferFireWebhookRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "webhook": {
          "type": "string"
        }
      },
      "required": [
        "webhook"
      ]
    },
    "SandboxTransferFireWebhookResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "SandboxTransferRepaymentSimulateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "SandboxTransferRepaymentSimulateResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "SandboxTransferSimulateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "event_type": {
          "type": "string"
        },
        "failure_reason": {
          "type": "ref",
          "ref": "TransferFailure"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "transfer_id": {
          "type": "ref",
          "ref": "TransferID"
        }
      },
      "required": [
        "transfer_id",
        "event_type"
      ]
    },
    "SandboxTransferSimulateResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "SandboxTransferSweepSimulateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "SandboxTransferSweepSimulateResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "sweep": {
          "type": "ref",
          "ref": "SimulatedTransferSweep"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "SandboxTransferTestClockAdvanceRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "new_virtual_time": {
          "type": "ref",
          "ref": "VirtualTime"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "test_clock_id": {
          "type": "ref",
          "ref": "TransferTestClockID"
        }
      },
      "required": [
        "test_clock_id",
        "new_virtual_time"
      ]
    },
    "SandboxTransferTestClockAdvanceResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "SandboxTransferTestClockCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "virtual_time": {
          "type": "ref",
          "ref": "VirtualTime"
        }
      },
      "required": [
        "virtual_time"
      ]
    },
    "SandboxTransferTestClockCreateResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "test_clock": {
          "type": "ref",
          "ref": "TransferTestClock"
        }
      },
      "required": [
        "test_clock",
        "request_id"
      ]
    },
    "SandboxTransferTestClockGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "test_clock_id": {
          "type": "ref",
          "ref": "TransferTestClockID"
        }
      },
      "required": [
        "test_clock_id"
      ]
    },
    "SandboxTransferTestClockGetResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "test_clock": {
          "type": "ref",
          "ref": "TransferTestClock"
        }
      },
      "required": [
        "test_clock",
        "request_id"
      ]
    },
    "SandboxTransferTestClockListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "end_virtual_time": {
          "type": "string"
        },
        "offset": {
          "type": "number"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "start_virtual_time": {
          "type": "string"
        }
      }
    },
    "SandboxTransferTestClockListResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "test_clocks": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TransferTestClock"
          }
        }
      },
      "required": [
        "test_clocks",
        "request_id"
      ]
    },
    "Scopes": {
      "type": "object",
      "properties": {
        "accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountAccess"
          }
        },
        "new_accounts": {
          "type": "boolean"
        },
        "product_access": {
          "type": "ref",
          "ref": "ProductAccess"
        }
      }
    },
    "ScopesContext": {
      "type": "string"
    },
    "ScopesNullable": {
      "type": "ref",
      "ref": "Scopes"
    },
    "ScopesState": {
      "type": "string"
    },
    "ScreeningHitAnalysis": {
      "type": "object",
      "properties": {
        "dates_of_birth": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        },
        "documents": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        },
        "locations": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        },
        "names": {
          "type": "ref",
          "ref": "MatchSummaryCode"
        },
        "search_terms_version": {
          "type": "number"
        }
      },
      "required": [
        "search_terms_version"
      ]
    },
    "ScreeningHitData": {
      "type": "object",
      "properties": {
        "dates_of_birth": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ScreeningHitDateOfBirthItem"
          }
        },
        "documents": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ScreeningHitDocumentsItems"
          }
        },
        "locations": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "GenericScreeningHitLocationItems"
          }
        },
        "names": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ScreeningHitNamesItems"
          }
        }
      }
    },
    "ScreeningHitDateOfBirthItem": {
      "type": "object",
      "properties": {
        "analysis": {
          "type": "ref",
          "ref": "MatchSummary"
        },
        "data": {
          "type": "ref",
          "ref": "DateRange"
        }
      }
    },
    "ScreeningHitDocumentsItems": {
      "type": "object",
      "properties": {
        "analysis": {
          "type": "ref",
          "ref": "MatchSummary"
        },
        "data": {
          "type": "ref",
          "ref": "WatchlistScreeningDocument"
        }
      }
    },
    "ScreeningHitNamesItems": {
      "type": "object",
      "properties": {
        "analysis": {
          "type": "ref",
          "ref": "MatchSummary"
        },
        "data": {
          "type": "ref",
          "ref": "IndividualScreeningHitNames"
        }
      }
    },
    "ScreeningStatusUpdatedWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "screening_id": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "screening_id",
        "environment"
      ]
    },
    "Security": {
      "type": "object",
      "properties": {
        "close_price": {
          "type": "number"
        },
        "close_price_as_of": {
          "type": "string"
        },
        "cusip": {
          "type": "string"
        },
        "institution_id": {
          "type": "string"
        },
        "institution_security_id": {
          "type": "string"
        },
        "is_cash_equivalent": {
          "type": "boolean"
        },
        "isin": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "proxy_security_id": {
          "type": "string"
        },
        "security_id": {
          "type": "string"
        },
        "sedol": {
          "type": "string"
        },
        "ticker_symbol": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        },
        "update_datetime": {
          "type": "string"
        }
      },
      "required": [
        "cusip",
        "sedol",
        "isin",
        "institution_security_id",
        "institution_id",
        "proxy_security_id",
        "name",
        "ticker_symbol",
        "is_cash_equivalent",
        "close_price",
        "close_price_as_of",
        "iso_currency_code",
        "unofficial_currency_code",
        "security_id",
        "type"
      ]
    },
    "SecurityOverride": {
      "type": "object",
      "properties": {
        "currency": {
          "type": "string"
        },
        "cusip": {
          "type": "string"
        },
        "isin": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "sedol": {
          "type": "string"
        },
        "ticker_symbol": {
          "type": "string"
        }
      }
    },
    "SenderBACSNullable": {
      "type": "ref",
      "ref": "RecipientBACS"
    },
    "Service": {
      "type": "object",
      "properties": {
        "STATUSES": {
          "type": "ref",
          "ref": "Statuses"
        },
        "VERIFICATION_OF_ASSET": {
          "type": "ref",
          "ref": "VerificationOfAsset"
        }
      },
      "required": [
        "VERIFICATION_OF_ASSET",
        "STATUSES"
      ]
    },
    "ServiceProductFulfillment": {
      "type": "object",
      "properties": {
        "SERVICE_PRODUCT_FULFILLMENT_DETAIL": {
          "type": "ref",
          "ref": "ServiceProductFulfillmentDetail"
        }
      },
      "required": [
        "SERVICE_PRODUCT_FULFILLMENT_DETAIL"
      ]
    },
    "ServiceProductFulfillmentDetail": {
      "type": "object",
      "properties": {
        "ServiceProductFulfillmentIdentifier": {
          "type": "ref",
          "ref": "ServiceProductFulfillmentIdentifier"
        },
        "VendorOrderIdentifier": {
          "type": "string"
        }
      },
      "required": [
        "VendorOrderIdentifier",
        "ServiceProductFulfillmentIdentifier"
      ]
    },
    "ServiceProductFulfillmentIdentifier": {
      "type": "string"
    },
    "ServicerAddressData": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "street": {
          "type": "string"
        }
      },
      "required": [
        "city",
        "region",
        "street",
        "postal_code",
        "country"
      ]
    },
    "Services": {
      "type": "object",
      "properties": {
        "SERVICE": {
          "type": "ref",
          "ref": "Service"
        }
      },
      "required": [
        "SERVICE"
      ]
    },
    "ShareableURL": {
      "type": "string"
    },
    "SignalAddressData": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "street": {
          "type": "string"
        }
      }
    },
    "SignalDecisionOutcome": {
      "type": "string"
    },
    "SignalDecisionReportRequest": {
      "type": "object",
      "properties": {
        "amount_instantly_available": {
          "type": "number"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_transaction_id": {
          "type": "string"
        },
        "days_funds_on_hold": {
          "type": "number"
        },
        "decision_outcome": {
          "type": "ref",
          "ref": "SignalDecisionOutcome"
        },
        "initiated": {
          "type": "boolean"
        },
        "payment_method": {
          "type": "ref",
          "ref": "SignalPaymentMethod"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "client_transaction_id",
        "initiated"
      ]
    },
    "SignalDecisionReportResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "SignalDevice": {
      "type": "object",
      "properties": {
        "ip_address": {
          "type": "string"
        },
        "user_agent": {
          "type": "string"
        }
      }
    },
    "SignalEvaluateCoreAttributes": {
      "type": "object",
      "properties": {
        "address_change_count_28d": {
          "type": "number"
        },
        "address_change_count_90d": {
          "type": "number"
        },
        "available_balance": {
          "type": "number"
        },
        "balance_last_updated": {
          "type": "string"
        },
        "credit_transactions_count_10d": {
          "type": "number"
        },
        "credit_transactions_count_30d": {
          "type": "number"
        },
        "credit_transactions_count_60d": {
          "type": "number"
        },
        "credit_transactions_count_90d": {
          "type": "number"
        },
        "current_balance": {
          "type": "number"
        },
        "days_since_first_plaid_connection": {
          "type": "number"
        },
        "days_with_negative_balance_count_90d": {
          "type": "number"
        },
        "debit_transactions_count_10d": {
          "type": "number"
        },
        "debit_transactions_count_30d": {
          "type": "number"
        },
        "debit_transactions_count_60d": {
          "type": "number"
        },
        "debit_transactions_count_90d": {
          "type": "number"
        },
        "email_change_count_28d": {
          "type": "number"
        },
        "email_change_count_90d": {
          "type": "number"
        },
        "failed_plaid_non_oauth_authentication_attempts_count_30d": {
          "type": "number"
        },
        "failed_plaid_non_oauth_authentication_attempts_count_3d": {
          "type": "number"
        },
        "failed_plaid_non_oauth_authentication_attempts_count_7d": {
          "type": "number"
        },
        "is_savings_or_money_market_account": {
          "type": "boolean"
        },
        "nsf_overdraft_transactions_count_30d": {
          "type": "number"
        },
        "nsf_overdraft_transactions_count_60d": {
          "type": "number"
        },
        "nsf_overdraft_transactions_count_7d": {
          "type": "number"
        },
        "nsf_overdraft_transactions_count_90d": {
          "type": "number"
        },
        "p10_eod_balance_30d": {
          "type": "number"
        },
        "p10_eod_balance_31d_to_60d": {
          "type": "number"
        },
        "p10_eod_balance_60d": {
          "type": "number"
        },
        "p10_eod_balance_61d_to_90d": {
          "type": "number"
        },
        "p10_eod_balance_90d": {
          "type": "number"
        },
        "p50_credit_transactions_amount_28d": {
          "type": "number"
        },
        "p50_debit_transactions_amount_28d": {
          "type": "number"
        },
        "p50_eod_balance_30d": {
          "type": "number"
        },
        "p50_eod_balance_31d_to_60d": {
          "type": "number"
        },
        "p50_eod_balance_60d": {
          "type": "number"
        },
        "p50_eod_balance_61d_to_90d": {
          "type": "number"
        },
        "p50_eod_balance_90d": {
          "type": "number"
        },
        "p90_eod_balance_30d": {
          "type": "number"
        },
        "p90_eod_balance_31d_to_60d": {
          "type": "number"
        },
        "p90_eod_balance_60d": {
          "type": "number"
        },
        "p90_eod_balance_61d_to_90d": {
          "type": "number"
        },
        "p90_eod_balance_90d": {
          "type": "number"
        },
        "p95_credit_transactions_amount_28d": {
          "type": "number"
        },
        "p95_debit_transactions_amount_28d": {
          "type": "number"
        },
        "phone_change_count_28d": {
          "type": "number"
        },
        "phone_change_count_90d": {
          "type": "number"
        },
        "plaid_connections_count_30d": {
          "type": "number"
        },
        "plaid_connections_count_7d": {
          "type": "number"
        },
        "plaid_non_oauth_authentication_attempts_count_30d": {
          "type": "number"
        },
        "plaid_non_oauth_authentication_attempts_count_3d": {
          "type": "number"
        },
        "plaid_non_oauth_authentication_attempts_count_7d": {
          "type": "number"
        },
        "total_credit_transactions_amount_10d": {
          "type": "number"
        },
        "total_credit_transactions_amount_30d": {
          "type": "number"
        },
        "total_credit_transactions_amount_60d": {
          "type": "number"
        },
        "total_credit_transactions_amount_90d": {
          "type": "number"
        },
        "total_debit_transactions_amount_10d": {
          "type": "number"
        },
        "total_debit_transactions_amount_30d": {
          "type": "number"
        },
        "total_debit_transactions_amount_60d": {
          "type": "number"
        },
        "total_debit_transactions_amount_90d": {
          "type": "number"
        },
        "total_plaid_connections_count": {
          "type": "number"
        },
        "transactions_last_updated": {
          "type": "string"
        },
        "unauthorized_transactions_count_30d": {
          "type": "number"
        },
        "unauthorized_transactions_count_60d": {
          "type": "number"
        },
        "unauthorized_transactions_count_7d": {
          "type": "number"
        },
        "unauthorized_transactions_count_90d": {
          "type": "number"
        }
      }
    },
    "SignalEvaluateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "account_id": {
          "type": "string"
        },
        "amount": {
          "type": "number"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_transaction_id": {
          "type": "string"
        },
        "client_user_id": {
          "type": "string"
        },
        "default_payment_method": {
          "type": "string"
        },
        "device": {
          "type": "ref",
          "ref": "SignalDevice"
        },
        "is_recurring": {
          "type": "boolean"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user": {
          "type": "ref",
          "ref": "SignalUser"
        },
        "user_present": {
          "type": "boolean"
        }
      },
      "required": [
        "access_token",
        "account_id",
        "client_transaction_id",
        "amount"
      ]
    },
    "SignalEvaluateResponse": {
      "type": "object",
      "properties": {
        "core_attributes": {
          "type": "ref",
          "ref": "SignalEvaluateCoreAttributes"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "scores": {
          "type": "ref",
          "ref": "SignalScores"
        }
      },
      "required": [
        "request_id",
        "scores"
      ]
    },
    "SignalPaymentMethod": {
      "type": "string"
    },
    "SignalPersonName": {
      "type": "object",
      "properties": {
        "family_name": {
          "type": "string"
        },
        "given_name": {
          "type": "string"
        },
        "middle_name": {
          "type": "string"
        },
        "prefix": {
          "type": "string"
        },
        "suffix": {
          "type": "string"
        }
      }
    },
    "SignalPrepareRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "SignalPrepareResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "SignalReturnReportRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_transaction_id": {
          "type": "string"
        },
        "return_code": {
          "type": "string"
        },
        "returned_at": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "client_transaction_id",
        "return_code"
      ]
    },
    "SignalReturnReportResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "SignalScore": {
      "type": "number"
    },
    "SignalScores": {
      "type": "object",
      "properties": {
        "bank_initiated_return_risk": {
          "type": "ref",
          "ref": "BankInitiatedReturnRisk"
        },
        "customer_initiated_return_risk": {
          "type": "ref",
          "ref": "CustomerInitiatedReturnRisk"
        }
      }
    },
    "SignalUser": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "SignalAddressData"
        },
        "email_address": {
          "type": "string"
        },
        "name": {
          "type": "ref",
          "ref": "SignalPersonName"
        },
        "phone_number": {
          "type": "string"
        }
      }
    },
    "SimulatedTransferSweep": {
      "type": "ref",
      "ref": "TransferSweep"
    },
    "SingleDocumentRiskSignal": {
      "type": "object",
      "properties": {
        "document_reference": {
          "type": "ref",
          "ref": "RiskSignalDocumentReference"
        },
        "risk_signals": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DocumentRiskSignal"
          }
        },
        "risk_summary": {
          "type": "ref",
          "ref": "DocumentRiskSummary"
        }
      },
      "required": [
        "document_reference",
        "risk_signals",
        "risk_summary"
      ]
    },
    "Source": {
      "type": "string"
    },
    "SourceUID": {
      "type": "string"
    },
    "StandaloneAccountType": {
      "type": "object",
      "properties": {
        "credit": {
          "type": "ref",
          "ref": "CreditAccount"
        },
        "depository": {
          "type": "ref",
          "ref": "DepositoryAccount"
        },
        "investment": {
          "type": "ref",
          "ref": "InvestmentAccountSubtypeStandalone"
        },
        "loan": {
          "type": "ref",
          "ref": "LoanAccount"
        },
        "other": {
          "type": "string"
        }
      },
      "required": [
        "depository",
        "credit",
        "loan",
        "investment",
        "other"
      ]
    },
    "StandaloneCurrencyCodeList": {
      "type": "object",
      "properties": {
        "iso_currency_code": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "ref",
          "ref": "UnofficialCurrencyCodeList"
        }
      },
      "required": [
        "iso_currency_code",
        "unofficial_currency_code"
      ]
    },
    "StandaloneInvestmentTransactionBuyType": {
      "type": "string"
    },
    "StandaloneInvestmentTransactionCashType": {
      "type": "string"
    },
    "StandaloneInvestmentTransactionFeeType": {
      "type": "string"
    },
    "StandaloneInvestmentTransactionSellType": {
      "type": "string"
    },
    "StandaloneInvestmentTransactionTransferType": {
      "type": "string"
    },
    "StandaloneInvestmentTransactionType": {
      "type": "object",
      "properties": {
        "buy": {
          "type": "ref",
          "ref": "StandaloneInvestmentTransactionBuyType"
        },
        "cancel": {
          "type": "string"
        },
        "cash": {
          "type": "ref",
          "ref": "StandaloneInvestmentTransactionCashType"
        },
        "fee": {
          "type": "ref",
          "ref": "StandaloneInvestmentTransactionFeeType"
        },
        "sell": {
          "type": "ref",
          "ref": "StandaloneInvestmentTransactionSellType"
        },
        "transfer": {
          "type": "ref",
          "ref": "StandaloneInvestmentTransactionTransferType"
        }
      },
      "required": [
        "buy",
        "sell",
        "cancel",
        "cash",
        "fee",
        "transfer"
      ]
    },
    "Status": {
      "type": "object",
      "properties": {
        "StatusCode": {
          "type": "string"
        },
        "StatusDescription": {
          "type": "string"
        }
      },
      "required": [
        "StatusCode",
        "StatusDescription"
      ]
    },
    "Statuses": {
      "type": "object",
      "properties": {
        "STATUS": {
          "type": "ref",
          "ref": "Status"
        }
      },
      "required": [
        "STATUS"
      ]
    },
    "Strategy": {
      "type": "string"
    },
    "Street": {
      "type": "string"
    },
    "Street2": {
      "type": "string"
    },
    "StreetNullable": {
      "type": "string"
    },
    "StudentLoan": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "account_number": {
          "type": "string"
        },
        "disbursement_dates": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "expected_payoff_date": {
          "type": "string"
        },
        "guarantor": {
          "type": "string"
        },
        "interest_rate_percentage": {
          "type": "number"
        },
        "is_overdue": {
          "type": "boolean"
        },
        "last_payment_amount": {
          "type": "number"
        },
        "last_payment_date": {
          "type": "string"
        },
        "last_statement_issue_date": {
          "type": "string"
        },
        "loan_name": {
          "type": "string"
        },
        "loan_status": {
          "type": "ref",
          "ref": "StudentLoanStatus"
        },
        "minimum_payment_amount": {
          "type": "number"
        },
        "next_payment_due_date": {
          "type": "string"
        },
        "origination_date": {
          "type": "string"
        },
        "origination_principal_amount": {
          "type": "number"
        },
        "outstanding_interest_amount": {
          "type": "number"
        },
        "payment_reference_number": {
          "type": "string"
        },
        "pslf_status": {
          "type": "ref",
          "ref": "PSLFStatus"
        },
        "repayment_plan": {
          "type": "ref",
          "ref": "StudentRepaymentPlan"
        },
        "sequence_number": {
          "type": "string"
        },
        "servicer_address": {
          "type": "ref",
          "ref": "ServicerAddressData"
        },
        "ytd_interest_paid": {
          "type": "number"
        },
        "ytd_principal_paid": {
          "type": "number"
        }
      },
      "required": [
        "account_id",
        "account_number",
        "disbursement_dates",
        "expected_payoff_date",
        "guarantor",
        "interest_rate_percentage",
        "is_overdue",
        "last_payment_amount",
        "last_payment_date",
        "last_statement_issue_date",
        "loan_name",
        "loan_status",
        "minimum_payment_amount",
        "next_payment_due_date",
        "origination_date",
        "origination_principal_amount",
        "outstanding_interest_amount",
        "payment_reference_number",
        "pslf_status",
        "repayment_plan",
        "sequence_number",
        "servicer_address",
        "ytd_interest_paid",
        "ytd_principal_paid"
      ]
    },
    "StudentLoanRepaymentModel": {
      "type": "object",
      "properties": {
        "non_repayment_months": {
          "type": "number"
        },
        "repayment_months": {
          "type": "number"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "non_repayment_months",
        "repayment_months"
      ]
    },
    "StudentLoanStatus": {
      "type": "object",
      "properties": {
        "end_date": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "end_date",
        "type"
      ]
    },
    "StudentRepaymentPlan": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "description",
        "type"
      ]
    },
    "SyncUpdatesAvailableWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "historical_update_complete": {
          "type": "boolean"
        },
        "initial_update_complete": {
          "type": "boolean"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "item_id",
        "initial_update_complete",
        "historical_update_complete",
        "environment"
      ]
    },
    "Taxform": {
      "type": "object",
      "properties": {
        "doc_id": {
          "type": "string"
        },
        "document_type": {
          "type": "string"
        },
        "w2": {
          "type": "ref",
          "ref": "W2"
        }
      },
      "required": [
        "document_type"
      ]
    },
    "TaxpayerID": {
      "type": "object",
      "properties": {
        "id_mask": {
          "type": "string"
        },
        "id_type": {
          "type": "string"
        },
        "last_4_digits": {
          "type": "string"
        }
      }
    },
    "TaxpayerIdentifier": {
      "type": "object",
      "properties": {
        "TaxpayerIdentifierType": {
          "type": "ref",
          "ref": "TaxpayerIdentifierType"
        },
        "TaxpayerIdentifierValue": {
          "type": "string"
        }
      },
      "required": [
        "TaxpayerIdentifierType",
        "TaxpayerIdentifierValue"
      ]
    },
    "TaxpayerIdentifierType": {
      "type": "string"
    },
    "TaxpayerIdentifiers": {
      "type": "object",
      "properties": {
        "TAXPAYER_IDENTIFIER": {
          "type": "ref",
          "ref": "TaxpayerIdentifier"
        }
      },
      "required": [
        "TAXPAYER_IDENTIFIER"
      ]
    },
    "Timestamp": {
      "type": "string"
    },
    "TimestampNullable": {
      "type": "string"
    },
    "Total": {
      "type": "object",
      "properties": {
        "canonical_description": {
          "type": "ref",
          "ref": "TotalCanonicalDescription"
        },
        "current_pay": {
          "type": "ref",
          "ref": "Pay"
        },
        "description": {
          "type": "string"
        },
        "ytd_pay": {
          "type": "ref",
          "ref": "Pay"
        }
      }
    },
    "TotalCanonicalDescription": {
      "type": "string"
    },
    "Transaction": {
      "type": "ref",
      "ref": "TransactionBase"
    },
    "TransactionBase": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "account_owner": {
          "type": "string"
        },
        "amount": {
          "type": "number"
        },
        "category": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "category_id": {
          "type": "string"
        },
        "check_number": {
          "type": "string"
        },
        "date": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "location": {
          "type": "ref",
          "ref": "Location"
        },
        "logo_url": {
          "type": "string"
        },
        "merchant_name": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "original_description": {
          "type": "string"
        },
        "payment_meta": {
          "type": "ref",
          "ref": "PaymentMeta"
        },
        "pending": {
          "type": "boolean"
        },
        "pending_transaction_id": {
          "type": "string"
        },
        "transaction_id": {
          "type": "string"
        },
        "transaction_type": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        },
        "website": {
          "type": "string"
        }
      },
      "required": [
        "transaction_id",
        "pending",
        "date",
        "unofficial_currency_code",
        "iso_currency_code",
        "amount",
        "account_id"
      ]
    },
    "TransactionCode": {
      "type": "string"
    },
    "TransactionCounterparty": {
      "type": "object",
      "properties": {
        "logo_url": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "CounterpartyType"
        },
        "website": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "type",
        "logo_url",
        "website"
      ]
    },
    "TransactionData": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "amount": {
          "type": "number"
        },
        "date": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "transaction_id": {
          "type": "string"
        }
      },
      "required": [
        "description",
        "amount",
        "date",
        "account_id",
        "transaction_id"
      ]
    },
    "TransactionOverride": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number"
        },
        "currency": {
          "type": "string"
        },
        "date_posted": {
          "type": "string"
        },
        "date_transacted": {
          "type": "string"
        },
        "description": {
          "type": "string"
        }
      },
      "required": [
        "date_transacted",
        "date_posted",
        "amount",
        "description"
      ]
    },
    "TransactionStream": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "average_amount": {
          "type": "ref",
          "ref": "TransactionStreamAmount"
        },
        "category": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "category_id": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "first_date": {
          "type": "string"
        },
        "frequency": {
          "type": "ref",
          "ref": "RecurringTransactionFrequency"
        },
        "is_active": {
          "type": "boolean"
        },
        "last_amount": {
          "type": "ref",
          "ref": "TransactionStreamAmount"
        },
        "last_date": {
          "type": "string"
        },
        "merchant_name": {
          "type": "string"
        },
        "personal_finance_category": {
          "type": "ref",
          "ref": "PersonalFinanceCategory"
        },
        "status": {
          "type": "ref",
          "ref": "TransactionStreamStatus"
        },
        "stream_id": {
          "type": "string"
        },
        "transaction_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "account_id",
        "stream_id",
        "category",
        "category_id",
        "description",
        "merchant_name",
        "first_date",
        "last_date",
        "frequency",
        "transaction_ids",
        "average_amount",
        "last_amount",
        "is_active",
        "status"
      ]
    },
    "TransactionStreamAmount": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "unofficial_currency_code": {
          "type": "string"
        }
      }
    },
    "TransactionStreamStatus": {
      "type": "string"
    },
    "TransactionsCategoryRule": {
      "type": "object",
      "properties": {
        "created_at": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "item_id": {
          "type": "string"
        },
        "personal_finance_category": {
          "type": "string"
        },
        "rule_details": {
          "type": "ref",
          "ref": "TransactionsRuleDetails"
        }
      }
    },
    "TransactionsEnhanceGetRequest": {
      "type": "object",
      "properties": {
        "account_type": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "transactions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ClientProvidedRawTransaction"
          }
        }
      },
      "required": [
        "account_type",
        "transactions"
      ]
    },
    "TransactionsEnhanceGetResponse": {
      "type": "object",
      "properties": {
        "enhanced_transactions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ClientProvidedEnhancedTransaction"
          }
        }
      },
      "required": [
        "enhanced_transactions"
      ]
    },
    "TransactionsEnrichGetRequest": {
      "type": "object",
      "properties": {
        "account_type": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "TransactionsEnrichRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "transactions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ClientProvidedTransaction"
          }
        }
      },
      "required": [
        "account_type",
        "transactions"
      ]
    },
    "TransactionsEnrichGetResponse": {
      "type": "object",
      "properties": {
        "enriched_transactions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ClientProvidedEnrichedTransaction"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "enriched_transactions"
      ]
    },
    "TransactionsEnrichRequestOptions": {
      "type": "object",
      "properties": {
        "include_legacy_category": {
          "type": "boolean"
        }
      }
    },
    "TransactionsGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "end_date": {
          "type": "string"
        },
        "options": {
          "type": "ref",
          "ref": "TransactionsGetRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "start_date": {
          "type": "string"
        }
      },
      "required": [
        "access_token",
        "start_date",
        "end_date"
      ]
    },
    "TransactionsGetRequestOptions": {
      "type": "object",
      "properties": {
        "account_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "count": {
          "type": "number"
        },
        "include_logo_and_counterparty_beta": {
          "type": "boolean"
        },
        "include_original_description": {
          "type": "boolean"
        },
        "include_personal_finance_category": {
          "type": "boolean"
        },
        "include_personal_finance_category_beta": {
          "type": "boolean"
        },
        "offset": {
          "type": "number"
        }
      }
    },
    "TransactionsGetResponse": {
      "type": "object",
      "properties": {
        "accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountBase"
          }
        },
        "item": {
          "type": "ref",
          "ref": "Item"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "total_transactions": {
          "type": "number"
        },
        "transactions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Transaction"
          }
        }
      },
      "required": [
        "accounts",
        "transactions",
        "total_transactions",
        "item",
        "request_id"
      ]
    },
    "TransactionsRecurringGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "account_ids": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "options": {
          "type": "ref",
          "ref": "TransactionsRecurringGetRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token",
        "account_ids"
      ]
    },
    "TransactionsRecurringGetRequestOptions": {
      "type": "object",
      "properties": {
        "include_personal_finance_category": {
          "type": "boolean"
        }
      }
    },
    "TransactionsRecurringGetResponse": {
      "type": "object",
      "properties": {
        "inflow_streams": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TransactionStream"
          }
        },
        "outflow_streams": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TransactionStream"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "updated_datetime": {
          "type": "string"
        }
      },
      "required": [
        "inflow_streams",
        "outflow_streams",
        "updated_datetime",
        "request_id"
      ]
    },
    "TransactionsRefreshRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "TransactionsRefreshResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "TransactionsRemovedWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "removed_transactions": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "removed_transactions",
        "item_id",
        "environment"
      ]
    },
    "TransactionsRuleDetails": {
      "type": "object",
      "properties": {
        "field": {
          "type": "ref",
          "ref": "TransactionsRuleField"
        },
        "query": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "TransactionsRuleType"
        }
      },
      "required": [
        "field",
        "type",
        "query"
      ]
    },
    "TransactionsRuleField": {
      "type": "string"
    },
    "TransactionsRuleType": {
      "type": "string"
    },
    "TransactionsRulesCreateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "personal_finance_category": {
          "type": "string"
        },
        "rule_details": {
          "type": "ref",
          "ref": "TransactionsRuleDetails"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token",
        "personal_finance_category",
        "rule_details"
      ]
    },
    "TransactionsRulesCreateResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "rule": {
          "type": "ref",
          "ref": "TransactionsCategoryRule"
        }
      },
      "required": [
        "rule",
        "request_id"
      ]
    },
    "TransactionsRulesListRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "TransactionsRulesListResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "rules": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TransactionsCategoryRule"
          }
        }
      },
      "required": [
        "rules",
        "request_id"
      ]
    },
    "TransactionsRulesRemoveRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "rule_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token",
        "rule_id"
      ]
    },
    "TransactionsRulesRemoveResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "TransactionsSyncRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "AccessToken"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "cursor": {
          "type": "string"
        },
        "options": {
          "type": "ref",
          "ref": "TransactionsSyncRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "access_token"
      ]
    },
    "TransactionsSyncRequestOptions": {
      "type": "object",
      "properties": {
        "include_logo_and_counterparty_beta": {
          "type": "boolean"
        },
        "include_original_description": {
          "type": "boolean"
        },
        "include_personal_finance_category": {
          "type": "boolean"
        }
      }
    },
    "TransactionsSyncResponse": {
      "type": "object",
      "properties": {
        "added": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Transaction"
          }
        },
        "has_more": {
          "type": "boolean"
        },
        "modified": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Transaction"
          }
        },
        "next_cursor": {
          "type": "string"
        },
        "removed": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RemovedTransaction"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "added",
        "modified",
        "removed",
        "next_cursor",
        "has_more",
        "request_id"
      ]
    },
    "Transfer": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "ach_class": {
          "type": "ref",
          "ref": "ACHClass"
        },
        "amount": {
          "type": "ref",
          "ref": "TransferAmount"
        },
        "cancellable": {
          "type": "boolean"
        },
        "created": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "expected_settlement_date": {
          "type": "string"
        },
        "failure_reason": {
          "type": "ref",
          "ref": "TransferFailure"
        },
        "funding_account_id": {
          "type": "ref",
          "ref": "TransferFundingAccountIDResponse"
        },
        "guarantee_decision": {
          "type": "ref",
          "ref": "TransferAuthorizationGuaranteeDecision"
        },
        "guarantee_decision_rationale": {
          "type": "ref",
          "ref": "TransferAuthorizationGuaranteeDecisionRationale"
        },
        "id": {
          "type": "ref",
          "ref": "TransferID"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "TransferMetadata"
        },
        "network": {
          "type": "ref",
          "ref": "TransferNetwork"
        },
        "origination_account_id": {
          "type": "string"
        },
        "originator_client_id": {
          "type": "string"
        },
        "recurring_transfer_id": {
          "type": "string"
        },
        "refunds": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TransferRefund"
          }
        },
        "standard_return_window": {
          "type": "string"
        },
        "status": {
          "type": "ref",
          "ref": "TransferStatus"
        },
        "sweep_status": {
          "type": "ref",
          "ref": "TransferSweepStatus"
        },
        "type": {
          "type": "ref",
          "ref": "TransferType"
        },
        "unauthorized_return_window": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "TransferUserInResponse"
        }
      },
      "required": [
        "id",
        "type",
        "user",
        "amount",
        "description",
        "created",
        "status",
        "network",
        "cancellable",
        "failure_reason",
        "metadata",
        "origination_account_id",
        "guarantee_decision",
        "guarantee_decision_rationale",
        "iso_currency_code",
        "standard_return_window",
        "unauthorized_return_window",
        "expected_settlement_date",
        "originator_client_id",
        "refunds",
        "recurring_transfer_id",
        "funding_account_id"
      ]
    },
    "TransferAccessToken": {
      "type": "string"
    },
    "TransferAccountID": {
      "type": "string"
    },
    "TransferAmount": {
      "type": "string"
    },
    "TransferAuthorization": {
      "type": "object",
      "properties": {
        "created": {
          "type": "string"
        },
        "decision": {
          "type": "ref",
          "ref": "TransferAuthorizationDecision"
        },
        "decision_rationale": {
          "type": "ref",
          "ref": "TransferAuthorizationDecisionRationale"
        },
        "guarantee_decision": {
          "type": "ref",
          "ref": "TransferAuthorizationGuaranteeDecision"
        },
        "guarantee_decision_rationale": {
          "type": "ref",
          "ref": "TransferAuthorizationGuaranteeDecisionRationale"
        },
        "id": {
          "type": "ref",
          "ref": "TransferAuthorizationID"
        },
        "proposed_transfer": {
          "type": "ref",
          "ref": "TransferAuthorizationProposedTransfer"
        }
      },
      "required": [
        "id",
        "created",
        "decision",
        "decision_rationale",
        "guarantee_decision",
        "guarantee_decision_rationale",
        "proposed_transfer"
      ]
    },
    "TransferAuthorizationCreateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "TransferAccessToken"
        },
        "account_id": {
          "type": "ref",
          "ref": "TransferAccountID"
        },
        "ach_class": {
          "type": "ref",
          "ref": "ACHClass"
        },
        "amount": {
          "type": "ref",
          "ref": "TransferAmount"
        },
        "beacon_session_id": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "device": {
          "type": "ref",
          "ref": "TransferAuthorizationDevice"
        },
        "funding_account_id": {
          "type": "ref",
          "ref": "TransferFundingAccountIDRequest"
        },
        "idempotency_key": {
          "type": "ref",
          "ref": "TransferAuthorizationIdempotencyKey"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "network": {
          "type": "ref",
          "ref": "TransferNetwork"
        },
        "origination_account_id": {
          "type": "string"
        },
        "originator_client_id": {
          "type": "string"
        },
        "payment_profile_token": {
          "type": "ref",
          "ref": "TransferPaymentProfileToken"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "type": {
          "type": "ref",
          "ref": "TransferType"
        },
        "user": {
          "type": "ref",
          "ref": "TransferAuthorizationUserInRequest"
        },
        "user_present": {
          "type": "boolean"
        },
        "with_guarantee": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "network",
        "amount",
        "user"
      ]
    },
    "TransferAuthorizationCreateResponse": {
      "type": "object",
      "properties": {
        "authorization": {
          "type": "ref",
          "ref": "TransferAuthorization"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "authorization",
        "request_id"
      ]
    },
    "TransferAuthorizationDecision": {
      "type": "string"
    },
    "TransferAuthorizationDecisionRationale": {
      "type": "object",
      "properties": {
        "code": {
          "type": "ref",
          "ref": "TransferAuthorizationDecisionRationaleCode"
        },
        "description": {
          "type": "string"
        }
      },
      "required": [
        "code",
        "description"
      ]
    },
    "TransferAuthorizationDecisionRationaleCode": {
      "type": "string"
    },
    "TransferAuthorizationDevice": {
      "type": "object",
      "properties": {
        "ip_address": {
          "type": "string"
        },
        "user_agent": {
          "type": "string"
        }
      }
    },
    "TransferAuthorizationGuaranteeDecision": {
      "type": "string"
    },
    "TransferAuthorizationGuaranteeDecisionRationale": {
      "type": "object",
      "properties": {
        "code": {
          "type": "ref",
          "ref": "TransferAuthorizationGuaranteeDecisionRationaleCode"
        },
        "description": {
          "type": "string"
        }
      },
      "required": [
        "code",
        "description"
      ]
    },
    "TransferAuthorizationGuaranteeDecisionRationaleCode": {
      "type": "string"
    },
    "TransferAuthorizationID": {
      "type": "string"
    },
    "TransferAuthorizationIdempotencyKey": {
      "type": "string"
    },
    "TransferAuthorizationProposedTransfer": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "ach_class": {
          "type": "ref",
          "ref": "ACHClass"
        },
        "amount": {
          "type": "ref",
          "ref": "TransferAmount"
        },
        "funding_account_id": {
          "type": "ref",
          "ref": "TransferFundingAccountIDResponse"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "network": {
          "type": "string"
        },
        "origination_account_id": {
          "type": "string"
        },
        "originator_client_id": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "TransferType"
        },
        "user": {
          "type": "ref",
          "ref": "TransferUserInResponse"
        }
      },
      "required": [
        "type",
        "user",
        "amount",
        "network",
        "origination_account_id",
        "iso_currency_code",
        "originator_client_id",
        "funding_account_id"
      ]
    },
    "TransferAuthorizationUserInRequest": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "TransferUserAddressInRequest"
        },
        "email_address": {
          "type": "string"
        },
        "legal_name": {
          "type": "string"
        },
        "phone_number": {
          "type": "string"
        }
      },
      "required": [
        "legal_name"
      ]
    },
    "TransferCancelRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "transfer_id": {
          "type": "ref",
          "ref": "TransferID"
        }
      },
      "required": [
        "transfer_id"
      ]
    },
    "TransferCancelResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "TransferCapabilitiesGetRTP": {
      "type": "object",
      "properties": {
        "credit": {
          "type": "boolean"
        }
      }
    },
    "TransferCapabilitiesGetRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "TransferAccessToken"
        },
        "account_id": {
          "type": "ref",
          "ref": "TransferAccountID"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "payment_profile_token": {
          "type": "ref",
          "ref": "PaymentProfileToken"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "TransferCapabilitiesGetResponse": {
      "type": "object",
      "properties": {
        "institution_supported_networks": {
          "type": "ref",
          "ref": "InstitutionSupportedNetworks"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "institution_supported_networks",
        "request_id"
      ]
    },
    "TransferCreateIdempotencyKey": {
      "type": "string"
    },
    "TransferCreateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "TransferAccessToken"
        },
        "account_id": {
          "type": "ref",
          "ref": "TransferAccountID"
        },
        "ach_class": {
          "type": "ref",
          "ref": "ACHClass"
        },
        "amount": {
          "type": "ref",
          "ref": "TransferAmount"
        },
        "authorization_id": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "description": {
          "type": "string"
        },
        "idempotency_key": {
          "type": "ref",
          "ref": "TransferCreateIdempotencyKey"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "TransferMetadata"
        },
        "network": {
          "type": "ref",
          "ref": "TransferNetwork"
        },
        "origination_account_id": {
          "type": "string"
        },
        "payment_profile_token": {
          "type": "ref",
          "ref": "TransferPaymentProfileToken"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "type": {
          "type": "ref",
          "ref": "TransferType"
        },
        "user": {
          "type": "ref",
          "ref": "TransferUserInRequestDeprecated"
        }
      },
      "required": [
        "authorization_id",
        "description"
      ]
    },
    "TransferCreateResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "transfer": {
          "type": "ref",
          "ref": "Transfer"
        }
      },
      "required": [
        "transfer",
        "request_id"
      ]
    },
    "TransferDevice": {
      "type": "object",
      "properties": {
        "ip_address": {
          "type": "string"
        },
        "user_agent": {
          "type": "string"
        }
      },
      "required": [
        "ip_address",
        "user_agent"
      ]
    },
    "TransferDiligenceStatus": {
      "type": "string"
    },
    "TransferEvent": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "event_id": {
          "type": "number"
        },
        "event_type": {
          "type": "ref",
          "ref": "TransferEventType"
        },
        "failure_reason": {
          "type": "ref",
          "ref": "TransferFailure"
        },
        "funding_account_id": {
          "type": "ref",
          "ref": "TransferFundingAccountIDResponse"
        },
        "origination_account_id": {
          "type": "string"
        },
        "originator_client_id": {
          "type": "string"
        },
        "refund_id": {
          "type": "string"
        },
        "sweep_amount": {
          "type": "ref",
          "ref": "TransferSweepAmount"
        },
        "sweep_id": {
          "type": "ref",
          "ref": "TransferSweepID"
        },
        "timestamp": {
          "type": "string"
        },
        "transfer_amount": {
          "type": "ref",
          "ref": "TransferAmount"
        },
        "transfer_id": {
          "type": "ref",
          "ref": "TransferID"
        },
        "transfer_type": {
          "type": "ref",
          "ref": "TransferType"
        }
      },
      "required": [
        "event_id",
        "timestamp",
        "event_type",
        "account_id",
        "transfer_id",
        "origination_account_id",
        "transfer_type",
        "transfer_amount",
        "failure_reason",
        "sweep_id",
        "sweep_amount",
        "refund_id",
        "originator_client_id",
        "funding_account_id"
      ]
    },
    "TransferEventListRequest": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "end_date": {
          "type": "string"
        },
        "event_types": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TransferEventType"
          }
        },
        "funding_account_id": {
          "type": "string"
        },
        "offset": {
          "type": "number"
        },
        "origination_account_id": {
          "type": "string"
        },
        "originator_client_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "start_date": {
          "type": "string"
        },
        "sweep_id": {
          "type": "string"
        },
        "transfer_id": {
          "type": "string"
        },
        "transfer_type": {
          "type": "ref",
          "ref": "TransferEventListTransferType"
        }
      }
    },
    "TransferEventListResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "transfer_events": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TransferEvent"
          }
        }
      },
      "required": [
        "transfer_events",
        "request_id"
      ]
    },
    "TransferEventListTransferType": {
      "type": "string"
    },
    "TransferEventSyncRequest": {
      "type": "object",
      "properties": {
        "after_id": {
          "type": "number"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "after_id"
      ]
    },
    "TransferEventSyncResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "transfer_events": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TransferEvent"
          }
        }
      },
      "required": [
        "transfer_events",
        "request_id"
      ]
    },
    "TransferEventType": {
      "type": "string"
    },
    "TransferEventsUpdateWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "environment"
      ]
    },
    "TransferFailure": {
      "type": "object",
      "properties": {
        "ach_return_code": {
          "type": "string"
        },
        "description": {
          "type": "string"
        }
      }
    },
    "TransferFundingAccountIDRequest": {
      "type": "string"
    },
    "TransferFundingAccountIDResponse": {
      "type": "string"
    },
    "TransferGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "transfer_id": {
          "type": "ref",
          "ref": "TransferID"
        }
      },
      "required": [
        "transfer_id"
      ]
    },
    "TransferGetResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "transfer": {
          "type": "ref",
          "ref": "Transfer"
        }
      },
      "required": [
        "transfer",
        "request_id"
      ]
    },
    "TransferID": {
      "type": "string"
    },
    "TransferIDForRefund": {
      "type": "string"
    },
    "TransferIntentAuthorizationDecision": {
      "type": "string"
    },
    "TransferIntentCreate": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "ach_class": {
          "type": "ref",
          "ref": "ACHClass"
        },
        "amount": {
          "type": "ref",
          "ref": "TransferAmount"
        },
        "created": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "funding_account_id": {
          "type": "ref",
          "ref": "TransferFundingAccountIDResponse"
        },
        "id": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "TransferMetadata"
        },
        "mode": {
          "type": "ref",
          "ref": "TransferIntentCreateMode"
        },
        "network": {
          "type": "ref",
          "ref": "TransferIntentCreateNetwork"
        },
        "origination_account_id": {
          "type": "string"
        },
        "require_guarantee": {
          "type": "boolean"
        },
        "status": {
          "type": "ref",
          "ref": "TransferIntentStatus"
        },
        "user": {
          "type": "ref",
          "ref": "TransferUserInResponse"
        }
      },
      "required": [
        "id",
        "created",
        "status",
        "origination_account_id",
        "funding_account_id",
        "amount",
        "mode",
        "user",
        "description",
        "iso_currency_code"
      ]
    },
    "TransferIntentCreateMode": {
      "type": "string"
    },
    "TransferIntentCreateNetwork": {
      "type": "string"
    },
    "TransferIntentCreateRequest": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "ach_class": {
          "type": "ref",
          "ref": "ACHClass"
        },
        "amount": {
          "type": "ref",
          "ref": "TransferAmount"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "description": {
          "type": "string"
        },
        "funding_account_id": {
          "type": "ref",
          "ref": "TransferFundingAccountIDRequest"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "TransferMetadata"
        },
        "mode": {
          "type": "ref",
          "ref": "TransferIntentCreateMode"
        },
        "network": {
          "type": "ref",
          "ref": "TransferIntentCreateNetwork"
        },
        "origination_account_id": {
          "type": "string"
        },
        "require_guarantee": {
          "type": "boolean"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "user": {
          "type": "ref",
          "ref": "TransferUserInRequest"
        }
      },
      "required": [
        "mode",
        "amount",
        "description",
        "user"
      ]
    },
    "TransferIntentCreateResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "transfer_intent": {
          "type": "ref",
          "ref": "TransferIntentCreate"
        }
      },
      "required": [
        "transfer_intent",
        "request_id"
      ]
    },
    "TransferIntentGet": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "ach_class": {
          "type": "ref",
          "ref": "ACHClass"
        },
        "amount": {
          "type": "ref",
          "ref": "TransferAmount"
        },
        "authorization_decision": {
          "type": "ref",
          "ref": "TransferIntentAuthorizationDecision"
        },
        "authorization_decision_rationale": {
          "type": "ref",
          "ref": "TransferAuthorizationDecisionRationale"
        },
        "created": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "failure_reason": {
          "type": "ref",
          "ref": "TransferIntentGetFailureReason"
        },
        "funding_account_id": {
          "type": "ref",
          "ref": "TransferFundingAccountIDResponse"
        },
        "guarantee_decision": {
          "type": "ref",
          "ref": "TransferAuthorizationGuaranteeDecision"
        },
        "guarantee_decision_rationale": {
          "type": "ref",
          "ref": "TransferAuthorizationGuaranteeDecisionRationale"
        },
        "id": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "metadata": {
          "type": "ref",
          "ref": "TransferMetadata"
        },
        "mode": {
          "type": "ref",
          "ref": "TransferIntentCreateMode"
        },
        "network": {
          "type": "ref",
          "ref": "TransferIntentCreateNetwork"
        },
        "origination_account_id": {
          "type": "string"
        },
        "require_guarantee": {
          "type": "boolean"
        },
        "status": {
          "type": "ref",
          "ref": "TransferIntentStatus"
        },
        "transfer_id": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "TransferUserInResponse"
        }
      },
      "required": [
        "id",
        "created",
        "status",
        "transfer_id",
        "failure_reason",
        "authorization_decision",
        "authorization_decision_rationale",
        "origination_account_id",
        "funding_account_id",
        "amount",
        "mode",
        "user",
        "description",
        "iso_currency_code",
        "guarantee_decision",
        "guarantee_decision_rationale"
      ]
    },
    "TransferIntentGetFailureReason": {
      "type": "object",
      "properties": {
        "error_code": {
          "type": "string"
        },
        "error_message": {
          "type": "string"
        },
        "error_type": {
          "type": "string"
        }
      }
    },
    "TransferIntentGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "transfer_intent_id": {
          "type": "string"
        }
      },
      "required": [
        "transfer_intent_id"
      ]
    },
    "TransferIntentGetResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "transfer_intent": {
          "type": "ref",
          "ref": "TransferIntentGet"
        }
      },
      "required": [
        "transfer_intent",
        "request_id"
      ]
    },
    "TransferIntentStatus": {
      "type": "string"
    },
    "TransferListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "end_date": {
          "type": "string"
        },
        "funding_account_id": {
          "type": "string"
        },
        "offset": {
          "type": "number"
        },
        "origination_account_id": {
          "type": "string"
        },
        "originator_client_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "start_date": {
          "type": "string"
        }
      }
    },
    "TransferListResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "transfers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Transfer"
          }
        }
      },
      "required": [
        "transfers",
        "request_id"
      ]
    },
    "TransferMetadata": {
      "type": "object",
      "properties": {}
    },
    "TransferMigrateAccountRequest": {
      "type": "object",
      "properties": {
        "account_number": {
          "type": "string"
        },
        "account_type": {
          "type": "string"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "routing_number": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "wire_routing_number": {
          "type": "string"
        }
      },
      "required": [
        "account_number",
        "routing_number",
        "account_type"
      ]
    },
    "TransferMigrateAccountResponse": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "string"
        },
        "account_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "access_token",
        "account_id",
        "request_id"
      ]
    },
    "TransferNetwork": {
      "type": "string"
    },
    "TransferOriginatorCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "company_name": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "company_name"
      ]
    },
    "TransferOriginatorCreateResponse": {
      "type": "object",
      "properties": {
        "company_name": {
          "type": "string"
        },
        "originator_client_id": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "originator_client_id",
        "company_name",
        "request_id"
      ]
    },
    "TransferOriginatorGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "originator_client_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "originator_client_id"
      ]
    },
    "TransferOriginatorGetResponse": {
      "type": "object",
      "properties": {
        "originator": {
          "type": "ref",
          "ref": "DetailedOriginator"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "originator",
        "request_id"
      ]
    },
    "TransferOriginatorListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "offset": {
          "type": "number"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "TransferOriginatorListResponse": {
      "type": "object",
      "properties": {
        "originators": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Originator"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "originators",
        "request_id"
      ]
    },
    "TransferPaymentProfileToken": {
      "type": "string"
    },
    "TransferQuestionnaireCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "originator_client_id": {
          "type": "string"
        },
        "redirect_uri": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "originator_client_id",
        "redirect_uri",
        "disbursement_limits",
        "payment_limits",
        "transaction_frequency"
      ]
    },
    "TransferQuestionnaireCreateResponse": {
      "type": "object",
      "properties": {
        "onboarding_url": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "onboarding_url",
        "request_id"
      ]
    },
    "TransferRecurringCancelRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "recurring_transfer_id": {
          "type": "ref",
          "ref": "RecurringTransferID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "recurring_transfer_id"
      ]
    },
    "TransferRecurringCancelResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "TransferRecurringCreateRequest": {
      "type": "object",
      "properties": {
        "access_token": {
          "type": "ref",
          "ref": "TransferAccessToken"
        },
        "account_id": {
          "type": "ref",
          "ref": "TransferAccountID"
        },
        "ach_class": {
          "type": "ref",
          "ref": "ACHClass"
        },
        "amount": {
          "type": "ref",
          "ref": "TransferAmount"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "description": {
          "type": "string"
        },
        "device": {
          "type": "ref",
          "ref": "TransferDevice"
        },
        "funding_account_id": {
          "type": "ref",
          "ref": "TransferFundingAccountIDRequest"
        },
        "idempotency_key": {
          "type": "ref",
          "ref": "TransferRecurringIdempotencyKey"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "network": {
          "type": "ref",
          "ref": "TransferNetwork"
        },
        "schedule": {
          "type": "ref",
          "ref": "TransferRecurringSchedule"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "test_clock_id": {
          "type": "string"
        },
        "type": {
          "type": "ref",
          "ref": "TransferType"
        },
        "user": {
          "type": "ref",
          "ref": "TransferUserInRequest"
        },
        "user_present": {
          "type": "boolean"
        }
      },
      "required": [
        "access_token",
        "idempotency_key",
        "account_id",
        "type",
        "network",
        "amount",
        "user_present",
        "schedule",
        "user",
        "device",
        "description"
      ]
    },
    "TransferRecurringCreateResponse": {
      "type": "object",
      "properties": {
        "decision": {
          "type": "ref",
          "ref": "TransferAuthorizationDecision"
        },
        "decision_rationale": {
          "type": "ref",
          "ref": "TransferAuthorizationDecisionRationale"
        },
        "recurring_transfer": {
          "type": "ref",
          "ref": "RecurringTransferNullable"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "decision",
        "request_id"
      ]
    },
    "TransferRecurringGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "recurring_transfer_id": {
          "type": "ref",
          "ref": "RecurringTransferID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "recurring_transfer_id"
      ]
    },
    "TransferRecurringGetResponse": {
      "type": "object",
      "properties": {
        "recurring_transfer": {
          "type": "ref",
          "ref": "RecurringTransfer"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "recurring_transfer",
        "request_id"
      ]
    },
    "TransferRecurringIdempotencyKey": {
      "type": "string"
    },
    "TransferRecurringListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "end_time": {
          "type": "string"
        },
        "funding_account_id": {
          "type": "string"
        },
        "offset": {
          "type": "number"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "start_time": {
          "type": "string"
        }
      }
    },
    "TransferRecurringListResponse": {
      "type": "object",
      "properties": {
        "recurring_transfers": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RecurringTransfer"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "recurring_transfers",
        "request_id"
      ]
    },
    "TransferRecurringSchedule": {
      "type": "object",
      "properties": {
        "end_date": {
          "type": "string"
        },
        "interval_count": {
          "type": "ref",
          "ref": "TransferScheduleIntervalCount"
        },
        "interval_execution_day": {
          "type": "number"
        },
        "interval_unit": {
          "type": "ref",
          "ref": "TransferScheduleIntervalUnit"
        },
        "start_date": {
          "type": "string"
        }
      },
      "required": [
        "interval_unit",
        "interval_count",
        "interval_execution_day",
        "start_date"
      ]
    },
    "TransferRecurringStatus": {
      "type": "string"
    },
    "TransferRefund": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "ref",
          "ref": "TransferRefundAmount"
        },
        "created": {
          "type": "string"
        },
        "id": {
          "type": "ref",
          "ref": "TransferRefundID"
        },
        "status": {
          "type": "ref",
          "ref": "TransferRefundStatus"
        },
        "transfer_id": {
          "type": "ref",
          "ref": "TransferIDForRefund"
        }
      },
      "required": [
        "id",
        "transfer_id",
        "amount",
        "status",
        "created"
      ]
    },
    "TransferRefundAmount": {
      "type": "string"
    },
    "TransferRefundCancelRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "refund_id": {
          "type": "ref",
          "ref": "TransferRefundID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "refund_id"
      ]
    },
    "TransferRefundCancelResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "request_id"
      ]
    },
    "TransferRefundCreateRequest": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "ref",
          "ref": "TransferRefundAmount"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "idempotency_key": {
          "type": "ref",
          "ref": "TransferRefundIdempotencyKey"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "transfer_id": {
          "type": "ref",
          "ref": "TransferIDForRefund"
        }
      },
      "required": [
        "transfer_id",
        "idempotency_key",
        "amount"
      ]
    },
    "TransferRefundCreateResponse": {
      "type": "object",
      "properties": {
        "refund": {
          "type": "ref",
          "ref": "TransferRefund"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "refund",
        "request_id"
      ]
    },
    "TransferRefundGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "refund_id": {
          "type": "ref",
          "ref": "TransferRefundID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "refund_id"
      ]
    },
    "TransferRefundGetResponse": {
      "type": "object",
      "properties": {
        "refund": {
          "type": "ref",
          "ref": "TransferRefund"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "refund",
        "request_id"
      ]
    },
    "TransferRefundID": {
      "type": "string"
    },
    "TransferRefundIdempotencyKey": {
      "type": "string"
    },
    "TransferRefundStatus": {
      "type": "string"
    },
    "TransferRepayment": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "string"
        },
        "created": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "repayment_id": {
          "type": "string"
        }
      },
      "required": [
        "repayment_id",
        "created",
        "amount",
        "iso_currency_code"
      ]
    },
    "TransferRepaymentListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "end_date": {
          "type": "string"
        },
        "offset": {
          "type": "number"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "start_date": {
          "type": "string"
        }
      }
    },
    "TransferRepaymentListResponse": {
      "type": "object",
      "properties": {
        "repayments": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TransferRepayment"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "repayments",
        "request_id"
      ]
    },
    "TransferRepaymentReturn": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "string"
        },
        "event_id": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "transfer_id": {
          "type": "string"
        }
      },
      "required": [
        "transfer_id",
        "event_id",
        "amount",
        "iso_currency_code"
      ]
    },
    "TransferRepaymentReturnListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "offset": {
          "type": "number"
        },
        "repayment_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "repayment_id"
      ]
    },
    "TransferRepaymentReturnListResponse": {
      "type": "object",
      "properties": {
        "repayment_returns": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TransferRepaymentReturn"
          }
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "repayment_returns",
        "request_id"
      ]
    },
    "TransferScheduleIntervalCount": {
      "type": "number"
    },
    "TransferScheduleIntervalUnit": {
      "type": "string"
    },
    "TransferStatus": {
      "type": "string"
    },
    "TransferSweep": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "string"
        },
        "created": {
          "type": "string"
        },
        "funding_account_id": {
          "type": "ref",
          "ref": "TransferFundingAccountIDResponse"
        },
        "id": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "string"
        },
        "settled": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "created",
        "amount",
        "iso_currency_code",
        "settled",
        "funding_account_id"
      ]
    },
    "TransferSweepAmount": {
      "type": "string"
    },
    "TransferSweepGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "sweep_id": {
          "type": "string"
        }
      },
      "required": [
        "sweep_id"
      ]
    },
    "TransferSweepGetResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "sweep": {
          "type": "ref",
          "ref": "TransferSweep"
        }
      },
      "required": [
        "sweep",
        "request_id"
      ]
    },
    "TransferSweepID": {
      "type": "string"
    },
    "TransferSweepListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "end_date": {
          "type": "string"
        },
        "funding_account_id": {
          "type": "string"
        },
        "offset": {
          "type": "number"
        },
        "originator_client_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "start_date": {
          "type": "string"
        }
      }
    },
    "TransferSweepListResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "sweeps": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TransferSweep"
          }
        }
      },
      "required": [
        "sweeps",
        "request_id"
      ]
    },
    "TransferSweepStatus": {
      "type": "string"
    },
    "TransferTestClock": {
      "type": "object",
      "properties": {
        "test_clock_id": {
          "type": "ref",
          "ref": "TransferTestClockID"
        },
        "virtual_time": {
          "type": "ref",
          "ref": "VirtualTime"
        }
      },
      "required": [
        "test_clock_id",
        "virtual_time"
      ]
    },
    "TransferTestClockID": {
      "type": "string"
    },
    "TransferType": {
      "type": "string"
    },
    "TransferUserAddressInRequest": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "street": {
          "type": "string"
        }
      }
    },
    "TransferUserAddressInResponse": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "postal_code": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "street": {
          "type": "string"
        }
      },
      "required": [
        "street",
        "city",
        "region",
        "postal_code",
        "country"
      ]
    },
    "TransferUserInRequest": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "TransferUserAddressInRequest"
        },
        "email_address": {
          "type": "string"
        },
        "legal_name": {
          "type": "string"
        },
        "phone_number": {
          "type": "string"
        }
      },
      "required": [
        "legal_name"
      ]
    },
    "TransferUserInRequestDeprecated": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "TransferUserAddressInRequest"
        },
        "email_address": {
          "type": "string"
        },
        "legal_name": {
          "type": "string"
        },
        "phone_number": {
          "type": "string"
        }
      }
    },
    "TransferUserInResponse": {
      "type": "object",
      "properties": {
        "address": {
          "type": "ref",
          "ref": "TransferUserAddressInResponse"
        },
        "email_address": {
          "type": "string"
        },
        "legal_name": {
          "type": "string"
        },
        "phone_number": {
          "type": "string"
        }
      },
      "required": [
        "legal_name",
        "phone_number",
        "email_address",
        "address"
      ]
    },
    "URL": {
      "type": "string"
    },
    "URLNullable": {
      "type": "string"
    },
    "UnofficialCurrencyCodeList": {
      "type": "string"
    },
    "UpdateEntityScreeningRequestSearchTerms": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "country": {
          "type": "ref",
          "ref": "GenericCountryCode"
        },
        "document_number": {
          "type": "ref",
          "ref": "WatchlistScreeningDocumentValue"
        },
        "email_address": {
          "type": "ref",
          "ref": "EmailAddress"
        },
        "entity_watchlist_program_id": {
          "type": "ref",
          "ref": "EntityWatchlistProgramID"
        },
        "legal_name": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningName"
        },
        "phone_number": {
          "type": "ref",
          "ref": "WatchlistScreeningPhoneNumber"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "url": {
          "type": "ref",
          "ref": "URL"
        }
      },
      "required": [
        "entity_watchlist_program_id",
        "client_id",
        "secret"
      ]
    },
    "UpdateIndividualScreeningRequestSearchTerms": {
      "type": "object",
      "properties": {
        "country": {
          "type": "ref",
          "ref": "GenericCountryCode"
        },
        "date_of_birth": {
          "type": "ref",
          "ref": "ISO8601Date"
        },
        "document_number": {
          "type": "ref",
          "ref": "WatchlistScreeningDocumentValue"
        },
        "legal_name": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualName"
        },
        "watchlist_program_id": {
          "type": "ref",
          "ref": "WatchlistProgramID"
        }
      }
    },
    "UserAddress": {
      "type": "object",
      "properties": {
        "city": {
          "type": "ref",
          "ref": "City"
        },
        "country": {
          "type": "ref",
          "ref": "GenericCountryCode"
        },
        "postal_code": {
          "type": "ref",
          "ref": "PostalCode"
        },
        "region": {
          "type": "ref",
          "ref": "Region"
        },
        "street": {
          "type": "ref",
          "ref": "Street"
        },
        "street2": {
          "type": "ref",
          "ref": "Street2"
        }
      },
      "required": [
        "street",
        "city",
        "region",
        "postal_code",
        "country"
      ]
    },
    "UserCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_user_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "client_user_id"
      ]
    },
    "UserCreateResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "user_id": {
          "type": "ref",
          "ref": "UserId"
        },
        "user_token": {
          "type": "ref",
          "ref": "UserToken"
        }
      },
      "required": [
        "user_token",
        "user_id",
        "request_id"
      ]
    },
    "UserCustomPassword": {
      "type": "object",
      "properties": {
        "force_error": {
          "type": "string"
        },
        "mfa": {
          "type": "ref",
          "ref": "MFA"
        },
        "override_accounts": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "OverrideAccounts"
          }
        },
        "recaptcha": {
          "type": "string"
        },
        "seed": {
          "type": "string"
        },
        "version": {
          "type": "string"
        }
      },
      "required": [
        "seed",
        "override_accounts",
        "mfa",
        "recaptcha",
        "force_error"
      ]
    },
    "UserIDNumber": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "IDNumberType"
        },
        "value": {
          "type": "ref",
          "ref": "IDNumberValue"
        }
      },
      "required": [
        "value",
        "type"
      ]
    },
    "UserId": {
      "type": "string"
    },
    "UserName": {
      "type": "object",
      "properties": {
        "family_name": {
          "type": "ref",
          "ref": "FamilyNameField"
        },
        "given_name": {
          "type": "ref",
          "ref": "GivenNameField"
        }
      },
      "required": [
        "given_name",
        "family_name"
      ]
    },
    "UserPermissionRevokedWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "item_id",
        "environment"
      ]
    },
    "UserStatedIncomeSourceCategory": {
      "type": "string"
    },
    "UserStatedIncomeSourceFrequency": {
      "type": "string"
    },
    "UserStatedIncomeSourcePayType": {
      "type": "string"
    },
    "UserToken": {
      "type": "string"
    },
    "ValidationSource": {
      "type": "object",
      "properties": {
        "ValidationSourceName": {
          "type": "string"
        },
        "ValidationSourceReferenceIdentifier": {
          "type": "string"
        }
      },
      "required": [
        "ValidationSourceName",
        "ValidationSourceReferenceIdentifier"
      ]
    },
    "ValidationSources": {
      "type": "object",
      "properties": {
        "VALIDATION_SOURCE": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ValidationSource"
          }
        }
      },
      "required": [
        "VALIDATION_SOURCE"
      ]
    },
    "VerificationExpiredWebhook": {
      "type": "object",
      "properties": {
        "account_id": {
          "type": "string"
        },
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "item_id",
        "account_id",
        "environment"
      ]
    },
    "VerificationOfAsset": {
      "type": "object",
      "properties": {
        "REPORTING_INFORMATION": {
          "type": "ref",
          "ref": "ReportingInformation"
        },
        "SERVICE_PRODUCT_FULFILLMENT": {
          "type": "ref",
          "ref": "ServiceProductFulfillment"
        },
        "VERIFICATION_OF_ASSET_RESPONSE": {
          "type": "ref",
          "ref": "VerificationOfAssetResponse"
        }
      },
      "required": [
        "REPORTING_INFORMATION",
        "SERVICE_PRODUCT_FULFILLMENT",
        "VERIFICATION_OF_ASSET_RESPONSE"
      ]
    },
    "VerificationOfAssetResponse": {
      "type": "object",
      "properties": {
        "ASSETS": {
          "type": "ref",
          "ref": "Assets"
        }
      },
      "required": [
        "ASSETS"
      ]
    },
    "VerificationRefreshStatus": {
      "type": "string"
    },
    "VerificationStatus": {
      "type": "string"
    },
    "VirtualTime": {
      "type": "string"
    },
    "W2": {
      "type": "object",
      "properties": {
        "allocated_tips": {
          "type": "string"
        },
        "box_12": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "W2Box12"
          }
        },
        "box_9": {
          "type": "string"
        },
        "dependent_care_benefits": {
          "type": "string"
        },
        "employee": {
          "type": "ref",
          "ref": "Employee"
        },
        "employer": {
          "type": "ref",
          "ref": "PaystubEmployer"
        },
        "employer_id_number": {
          "type": "string"
        },
        "federal_income_tax_withheld": {
          "type": "string"
        },
        "medicare_tax_withheld": {
          "type": "string"
        },
        "medicare_wages_and_tips": {
          "type": "string"
        },
        "nonqualified_plans": {
          "type": "string"
        },
        "other": {
          "type": "string"
        },
        "retirement_plan": {
          "type": "string"
        },
        "social_security_tax_withheld": {
          "type": "string"
        },
        "social_security_tips": {
          "type": "string"
        },
        "social_security_wages": {
          "type": "string"
        },
        "state_and_local_wages": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "W2StateAndLocalWages"
          }
        },
        "statutory_employee": {
          "type": "string"
        },
        "tax_year": {
          "type": "string"
        },
        "third_party_sick_pay": {
          "type": "string"
        },
        "wages_tips_other_comp": {
          "type": "string"
        }
      }
    },
    "W2Box12": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "string"
        },
        "code": {
          "type": "string"
        }
      }
    },
    "W2StateAndLocalWages": {
      "type": "object",
      "properties": {
        "employer_state_id_number": {
          "type": "string"
        },
        "local_income_tax": {
          "type": "string"
        },
        "local_wages_tips": {
          "type": "string"
        },
        "locality_name": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "state_income_tax": {
          "type": "string"
        },
        "state_wages_tips": {
          "type": "string"
        }
      }
    },
    "Wallet": {
      "type": "object",
      "properties": {
        "balance": {
          "type": "ref",
          "ref": "WalletBalance"
        },
        "numbers": {
          "type": "ref",
          "ref": "WalletNumbers"
        },
        "recipient_id": {
          "type": "string"
        },
        "status": {
          "type": "ref",
          "ref": "WalletStatus"
        },
        "wallet_id": {
          "type": "string"
        }
      },
      "required": [
        "wallet_id",
        "balance",
        "numbers",
        "status"
      ]
    },
    "WalletBalance": {
      "type": "object",
      "properties": {
        "current": {
          "type": "number"
        },
        "iso_currency_code": {
          "type": "string"
        }
      },
      "required": [
        "iso_currency_code",
        "current"
      ]
    },
    "WalletCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "iso_currency_code": {
          "type": "ref",
          "ref": "WalletISOCurrencyCode"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "iso_currency_code"
      ]
    },
    "WalletCreateResponse": {
      "type": "ref",
      "ref": "Wallet"
    },
    "WalletGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "wallet_id": {
          "type": "string"
        }
      },
      "required": [
        "wallet_id"
      ]
    },
    "WalletGetResponse": {
      "type": "ref",
      "ref": "Wallet"
    },
    "WalletISOCurrencyCode": {
      "type": "string"
    },
    "WalletListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "cursor": {
          "type": "string"
        },
        "iso_currency_code": {
          "type": "ref",
          "ref": "WalletISOCurrencyCode"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "WalletListResponse": {
      "type": "object",
      "properties": {
        "next_cursor": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "wallets": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Wallet"
          }
        }
      },
      "required": [
        "wallets",
        "request_id"
      ]
    },
    "WalletNumbers": {
      "type": "object",
      "properties": {
        "bacs": {
          "type": "ref",
          "ref": "RecipientBACS"
        },
        "international": {
          "type": "ref",
          "ref": "NumbersInternationalIBAN"
        }
      }
    },
    "WalletStatus": {
      "type": "string"
    },
    "WalletTransaction": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "ref",
          "ref": "WalletTransactionAmount"
        },
        "counterparty": {
          "type": "ref",
          "ref": "WalletTransactionCounterparty"
        },
        "created_at": {
          "type": "string"
        },
        "last_status_update": {
          "type": "string"
        },
        "payment_id": {
          "type": "string"
        },
        "reference": {
          "type": "string"
        },
        "status": {
          "type": "ref",
          "ref": "WalletTransactionStatus"
        },
        "transaction_id": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "wallet_id": {
          "type": "string"
        }
      },
      "required": [
        "transaction_id",
        "wallet_id",
        "reference",
        "type",
        "amount",
        "counterparty",
        "status",
        "created_at",
        "last_status_update"
      ]
    },
    "WalletTransactionAmount": {
      "type": "object",
      "properties": {
        "iso_currency_code": {
          "type": "ref",
          "ref": "WalletISOCurrencyCode"
        },
        "value": {
          "type": "number"
        }
      },
      "required": [
        "iso_currency_code",
        "value"
      ]
    },
    "WalletTransactionCounterparty": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "numbers": {
          "type": "ref",
          "ref": "WalletTransactionCounterpartyNumbers"
        }
      },
      "required": [
        "name",
        "numbers"
      ]
    },
    "WalletTransactionCounterpartyBACS": {
      "type": "ref",
      "ref": "RecipientBACS"
    },
    "WalletTransactionCounterpartyInternational": {
      "type": "object",
      "properties": {
        "iban": {
          "type": "ref",
          "ref": "NumbersIBAN"
        }
      }
    },
    "WalletTransactionCounterpartyNumbers": {
      "type": "object",
      "properties": {
        "bacs": {
          "type": "ref",
          "ref": "WalletTransactionCounterpartyBACS"
        },
        "international": {
          "type": "ref",
          "ref": "WalletTransactionCounterpartyInternational"
        }
      }
    },
    "WalletTransactionExecuteRequest": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "ref",
          "ref": "WalletTransactionAmount"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "counterparty": {
          "type": "ref",
          "ref": "WalletTransactionCounterparty"
        },
        "idempotency_key": {
          "type": "ref",
          "ref": "WalletTransactionIdempotencyKey"
        },
        "reference": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "wallet_id": {
          "type": "string"
        }
      },
      "required": [
        "idempotency_key",
        "wallet_id",
        "counterparty",
        "amount",
        "reference"
      ]
    },
    "WalletTransactionExecuteResponse": {
      "type": "object",
      "properties": {
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "status": {
          "type": "ref",
          "ref": "WalletTransactionStatus"
        },
        "transaction_id": {
          "type": "string"
        }
      },
      "required": [
        "transaction_id",
        "status",
        "request_id"
      ]
    },
    "WalletTransactionGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "transaction_id": {
          "type": "string"
        }
      },
      "required": [
        "transaction_id"
      ]
    },
    "WalletTransactionGetResponse": {
      "type": "ref",
      "ref": "WalletTransaction"
    },
    "WalletTransactionIdempotencyKey": {
      "type": "string"
    },
    "WalletTransactionListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "cursor": {
          "type": "string"
        },
        "options": {
          "type": "ref",
          "ref": "WalletTransactionListRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "wallet_id": {
          "type": "string"
        }
      },
      "required": [
        "wallet_id"
      ]
    },
    "WalletTransactionListRequestOptions": {
      "type": "object",
      "properties": {
        "end_time": {
          "type": "string"
        },
        "start_time": {
          "type": "string"
        }
      }
    },
    "WalletTransactionListResponse": {
      "type": "object",
      "properties": {
        "next_cursor": {
          "type": "string"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "transactions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WalletTransaction"
          }
        }
      },
      "required": [
        "transactions",
        "request_id"
      ]
    },
    "WalletTransactionStatus": {
      "type": "string"
    },
    "WalletTransactionStatusUpdateWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "new_status": {
          "type": "ref",
          "ref": "WalletTransactionStatus"
        },
        "old_status": {
          "type": "ref",
          "ref": "WalletTransactionStatus"
        },
        "timestamp": {
          "type": "string"
        },
        "transaction_id": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "transaction_id",
        "new_status",
        "old_status",
        "timestamp",
        "environment"
      ]
    },
    "WalletTransactionsListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "count": {
          "type": "number"
        },
        "cursor": {
          "type": "string"
        },
        "options": {
          "type": "ref",
          "ref": "WalletTransactionListRequestOptions"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "wallet_id": {
          "type": "string"
        }
      },
      "required": [
        "wallet_id"
      ]
    },
    "Warning": {
      "type": "object",
      "properties": {
        "cause": {
          "type": "ref",
          "ref": "Cause"
        },
        "warning_code": {
          "type": "string"
        },
        "warning_type": {
          "type": "string"
        }
      },
      "required": [
        "warning_type",
        "warning_code",
        "cause"
      ]
    },
    "WatchlistProgramID": {
      "type": "string"
    },
    "WatchlistScreeningAuditTrail": {
      "type": "object",
      "properties": {
        "dashboard_user_id": {
          "type": "ref",
          "ref": "DashboardUserIDNullable"
        },
        "source": {
          "type": "ref",
          "ref": "Source"
        },
        "timestamp": {
          "type": "ref",
          "ref": "Timestamp"
        }
      },
      "required": [
        "source",
        "dashboard_user_id",
        "timestamp"
      ]
    },
    "WatchlistScreeningDocument": {
      "type": "object",
      "properties": {
        "number": {
          "type": "ref",
          "ref": "WatchlistScreeningDocumentValue"
        },
        "type": {
          "type": "ref",
          "ref": "WatchlistScreeningDocumentType"
        }
      },
      "required": [
        "type",
        "number"
      ]
    },
    "WatchlistScreeningDocumentType": {
      "type": "string"
    },
    "WatchlistScreeningDocumentValue": {
      "type": "string"
    },
    "WatchlistScreeningDocumentValueNullable": {
      "type": "string"
    },
    "WatchlistScreeningEntityCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserID"
        },
        "search_terms": {
          "type": "ref",
          "ref": "EntityWatchlistSearchTerms"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "search_terms"
      ]
    },
    "WatchlistScreeningEntityCreateResponse": {
      "type": "object",
      "properties": {
        "assignee": {
          "type": "ref",
          "ref": "DashboardUserIDNullable"
        },
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserIDNullable"
        },
        "id": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningID"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "search_terms": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningSearchTerms"
        },
        "status": {
          "type": "ref",
          "ref": "WatchlistScreeningStatus"
        }
      },
      "required": [
        "id",
        "search_terms",
        "assignee",
        "status",
        "client_user_id",
        "audit_trail",
        "request_id"
      ]
    },
    "WatchlistScreeningEntityGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "entity_watchlist_screening_id": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "entity_watchlist_screening_id"
      ]
    },
    "WatchlistScreeningEntityGetResponse": {
      "type": "object",
      "properties": {
        "assignee": {
          "type": "ref",
          "ref": "DashboardUserIDNullable"
        },
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserIDNullable"
        },
        "id": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningID"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "search_terms": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningSearchTerms"
        },
        "status": {
          "type": "ref",
          "ref": "WatchlistScreeningStatus"
        }
      },
      "required": [
        "id",
        "search_terms",
        "assignee",
        "status",
        "client_user_id",
        "audit_trail",
        "request_id"
      ]
    },
    "WatchlistScreeningEntityHistoryListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "entity_watchlist_screening_id": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "entity_watchlist_screening_id"
      ]
    },
    "WatchlistScreeningEntityHistoryListResponse": {
      "type": "object",
      "properties": {
        "entity_watchlist_screenings": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityWatchlistScreening"
          }
        },
        "next_cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "entity_watchlist_screenings",
        "next_cursor",
        "request_id"
      ]
    },
    "WatchlistScreeningEntityHitListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "entity_watchlist_screening_id": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "entity_watchlist_screening_id"
      ]
    },
    "WatchlistScreeningEntityHitListResponse": {
      "type": "object",
      "properties": {
        "entity_watchlist_screening_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityWatchlistScreeningHit"
          }
        },
        "next_cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "entity_watchlist_screening_hits",
        "next_cursor",
        "request_id"
      ]
    },
    "WatchlistScreeningEntityListRequest": {
      "type": "object",
      "properties": {
        "assignee": {
          "type": "ref",
          "ref": "DashboardUserID"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserID"
        },
        "cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "entity_watchlist_program_id": {
          "type": "ref",
          "ref": "EntityWatchlistProgramID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "status": {
          "type": "ref",
          "ref": "WatchlistScreeningStatus"
        }
      },
      "required": [
        "entity_watchlist_program_id"
      ]
    },
    "WatchlistScreeningEntityListResponse": {
      "type": "object",
      "properties": {
        "entity_watchlist_screenings": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityWatchlistScreening"
          }
        },
        "next_cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "entity_watchlist_screenings",
        "next_cursor",
        "request_id"
      ]
    },
    "WatchlistScreeningEntityProgramGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "entity_watchlist_program_id": {
          "type": "ref",
          "ref": "EntityWatchlistProgramID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "entity_watchlist_program_id"
      ]
    },
    "WatchlistScreeningEntityProgramGetResponse": {
      "type": "object",
      "properties": {
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "created_at": {
          "type": "ref",
          "ref": "Timestamp"
        },
        "id": {
          "type": "ref",
          "ref": "EntityWatchlistProgramID"
        },
        "is_archived": {
          "type": "ref",
          "ref": "ProgramArchived"
        },
        "is_rescanning_enabled": {
          "type": "boolean"
        },
        "lists_enabled": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityWatchlistCode"
          }
        },
        "name": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningProgramName"
        },
        "name_sensitivity": {
          "type": "ref",
          "ref": "ProgramNameSensitivity"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "id",
        "created_at",
        "is_rescanning_enabled",
        "lists_enabled",
        "name",
        "name_sensitivity",
        "audit_trail",
        "is_archived",
        "request_id"
      ]
    },
    "WatchlistScreeningEntityProgramListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "WatchlistScreeningEntityProgramListResponse": {
      "type": "object",
      "properties": {
        "entity_watchlist_programs": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityWatchlistProgram"
          }
        },
        "next_cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "entity_watchlist_programs",
        "next_cursor",
        "request_id"
      ]
    },
    "WatchlistScreeningEntityReviewCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "comment": {
          "type": "ref",
          "ref": "ReviewComment"
        },
        "confirmed_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityWatchlistScreeningHitID"
          }
        },
        "dismissed_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityWatchlistScreeningHitID"
          }
        },
        "entity_watchlist_screening_id": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "confirmed_hits",
        "dismissed_hits",
        "entity_watchlist_screening_id"
      ]
    },
    "WatchlistScreeningEntityReviewCreateResponse": {
      "type": "object",
      "properties": {
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "comment": {
          "type": "ref",
          "ref": "ReviewComment"
        },
        "confirmed_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityWatchlistScreeningHitID"
          }
        },
        "dismissed_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityWatchlistScreeningHitID"
          }
        },
        "id": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningReviewID"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "id",
        "confirmed_hits",
        "dismissed_hits",
        "comment",
        "audit_trail",
        "request_id"
      ]
    },
    "WatchlistScreeningEntityReviewListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "entity_watchlist_screening_id": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "entity_watchlist_screening_id"
      ]
    },
    "WatchlistScreeningEntityReviewListResponse": {
      "type": "object",
      "properties": {
        "entity_watchlist_screening_reviews": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "EntityWatchlistScreeningReview"
          }
        },
        "next_cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "entity_watchlist_screening_reviews",
        "next_cursor",
        "request_id"
      ]
    },
    "WatchlistScreeningEntityUpdateRequest": {
      "type": "object",
      "properties": {
        "assignee": {
          "type": "ref",
          "ref": "DashboardUserID"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserID"
        },
        "entity_watchlist_screening_id": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningID"
        },
        "reset_fields": {
          "type": "ref",
          "ref": "WatchlistScreeningEntityUpdateRequestResettableFieldList"
        },
        "search_terms": {
          "type": "ref",
          "ref": "UpdateEntityScreeningRequestSearchTerms"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "status": {
          "type": "ref",
          "ref": "WatchlistScreeningStatus"
        }
      },
      "required": [
        "entity_watchlist_screening_id"
      ]
    },
    "WatchlistScreeningEntityUpdateRequestResettableField": {
      "type": "string"
    },
    "WatchlistScreeningEntityUpdateRequestResettableFieldList": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "WatchlistScreeningEntityUpdateRequestResettableField"
      }
    },
    "WatchlistScreeningEntityUpdateResponse": {
      "type": "object",
      "properties": {
        "assignee": {
          "type": "ref",
          "ref": "DashboardUserIDNullable"
        },
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserIDNullable"
        },
        "id": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningID"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "search_terms": {
          "type": "ref",
          "ref": "EntityWatchlistScreeningSearchTerms"
        },
        "status": {
          "type": "ref",
          "ref": "WatchlistScreeningStatus"
        }
      },
      "required": [
        "id",
        "search_terms",
        "assignee",
        "status",
        "client_user_id",
        "audit_trail",
        "request_id"
      ]
    },
    "WatchlistScreeningHit": {
      "type": "object",
      "properties": {
        "analysis": {
          "type": "ref",
          "ref": "ScreeningHitAnalysis"
        },
        "data": {
          "type": "ref",
          "ref": "ScreeningHitData"
        },
        "first_active": {
          "type": "ref",
          "ref": "Timestamp"
        },
        "historical_since": {
          "type": "ref",
          "ref": "TimestampNullable"
        },
        "id": {
          "type": "ref",
          "ref": "WatchlistScreeningHitID"
        },
        "inactive_since": {
          "type": "ref",
          "ref": "TimestampNullable"
        },
        "list_code": {
          "type": "ref",
          "ref": "IndividualWatchlistCode"
        },
        "plaid_uid": {
          "type": "ref",
          "ref": "InternalUID"
        },
        "review_status": {
          "type": "ref",
          "ref": "WatchlistScreeningHitStatus"
        },
        "source_uid": {
          "type": "ref",
          "ref": "SourceUID"
        }
      },
      "required": [
        "id",
        "review_status",
        "first_active",
        "inactive_since",
        "historical_since",
        "list_code",
        "plaid_uid",
        "source_uid"
      ]
    },
    "WatchlistScreeningHitID": {
      "type": "string"
    },
    "WatchlistScreeningHitLocations": {
      "type": "object",
      "properties": {
        "country": {
          "type": "ref",
          "ref": "GenericCountryCode"
        },
        "full": {
          "type": "string"
        }
      },
      "required": [
        "full",
        "country"
      ]
    },
    "WatchlistScreeningHitStatus": {
      "type": "string"
    },
    "WatchlistScreeningIndividual": {
      "type": "object",
      "properties": {
        "assignee": {
          "type": "ref",
          "ref": "DashboardUserIDNullable"
        },
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserIDNullable"
        },
        "id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualID"
        },
        "search_terms": {
          "type": "ref",
          "ref": "WatchlistScreeningSearchTerms"
        },
        "status": {
          "type": "ref",
          "ref": "WatchlistScreeningStatus"
        }
      },
      "required": [
        "id",
        "search_terms",
        "assignee",
        "status",
        "client_user_id",
        "audit_trail"
      ]
    },
    "WatchlistScreeningIndividualCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserID"
        },
        "search_terms": {
          "type": "ref",
          "ref": "WatchlistScreeningRequestSearchTerms"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "search_terms"
      ]
    },
    "WatchlistScreeningIndividualCreateResponse": {
      "type": "object",
      "properties": {
        "assignee": {
          "type": "ref",
          "ref": "DashboardUserIDNullable"
        },
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserIDNullable"
        },
        "id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualID"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "search_terms": {
          "type": "ref",
          "ref": "WatchlistScreeningSearchTerms"
        },
        "status": {
          "type": "ref",
          "ref": "WatchlistScreeningStatus"
        }
      },
      "required": [
        "id",
        "search_terms",
        "assignee",
        "status",
        "client_user_id",
        "audit_trail",
        "request_id"
      ]
    },
    "WatchlistScreeningIndividualGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "watchlist_screening_id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualID"
        }
      },
      "required": [
        "watchlist_screening_id"
      ]
    },
    "WatchlistScreeningIndividualGetResponse": {
      "type": "object",
      "properties": {
        "assignee": {
          "type": "ref",
          "ref": "DashboardUserIDNullable"
        },
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserIDNullable"
        },
        "id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualID"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "search_terms": {
          "type": "ref",
          "ref": "WatchlistScreeningSearchTerms"
        },
        "status": {
          "type": "ref",
          "ref": "WatchlistScreeningStatus"
        }
      },
      "required": [
        "id",
        "search_terms",
        "assignee",
        "status",
        "client_user_id",
        "audit_trail",
        "request_id"
      ]
    },
    "WatchlistScreeningIndividualHistoryListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "watchlist_screening_id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualID"
        }
      },
      "required": [
        "watchlist_screening_id"
      ]
    },
    "WatchlistScreeningIndividualHistoryListResponse": {
      "type": "object",
      "properties": {
        "next_cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "watchlist_screenings": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WatchlistScreeningIndividual"
          }
        }
      },
      "required": [
        "watchlist_screenings",
        "next_cursor",
        "request_id"
      ]
    },
    "WatchlistScreeningIndividualHitListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "watchlist_screening_id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualID"
        }
      },
      "required": [
        "watchlist_screening_id"
      ]
    },
    "WatchlistScreeningIndividualHitListResponse": {
      "type": "object",
      "properties": {
        "next_cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "watchlist_screening_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WatchlistScreeningHit"
          }
        }
      },
      "required": [
        "watchlist_screening_hits",
        "next_cursor",
        "request_id"
      ]
    },
    "WatchlistScreeningIndividualID": {
      "type": "string"
    },
    "WatchlistScreeningIndividualIDNullable": {
      "type": "string"
    },
    "WatchlistScreeningIndividualListRequest": {
      "type": "object",
      "properties": {
        "assignee": {
          "type": "ref",
          "ref": "DashboardUserID"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserID"
        },
        "cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "status": {
          "type": "ref",
          "ref": "WatchlistScreeningStatus"
        },
        "watchlist_program_id": {
          "type": "ref",
          "ref": "WatchlistProgramID"
        }
      },
      "required": [
        "watchlist_program_id"
      ]
    },
    "WatchlistScreeningIndividualListResponse": {
      "type": "object",
      "properties": {
        "next_cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "watchlist_screenings": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WatchlistScreeningIndividual"
          }
        }
      },
      "required": [
        "watchlist_screenings",
        "next_cursor",
        "request_id"
      ]
    },
    "WatchlistScreeningIndividualName": {
      "type": "string"
    },
    "WatchlistScreeningIndividualProgramGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "watchlist_program_id": {
          "type": "ref",
          "ref": "WatchlistProgramID"
        }
      },
      "required": [
        "watchlist_program_id"
      ]
    },
    "WatchlistScreeningIndividualProgramGetResponse": {
      "type": "object",
      "properties": {
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "created_at": {
          "type": "ref",
          "ref": "Timestamp"
        },
        "id": {
          "type": "ref",
          "ref": "WatchlistProgramID"
        },
        "is_archived": {
          "type": "ref",
          "ref": "ProgramArchived"
        },
        "is_rescanning_enabled": {
          "type": "boolean"
        },
        "lists_enabled": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "IndividualWatchlistCode"
          }
        },
        "name": {
          "type": "ref",
          "ref": "IndividualWatchlistScreeningProgramName"
        },
        "name_sensitivity": {
          "type": "ref",
          "ref": "ProgramNameSensitivity"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "id",
        "created_at",
        "is_rescanning_enabled",
        "lists_enabled",
        "name",
        "name_sensitivity",
        "audit_trail",
        "is_archived",
        "request_id"
      ]
    },
    "WatchlistScreeningIndividualProgramListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      }
    },
    "WatchlistScreeningIndividualProgramListResponse": {
      "type": "object",
      "properties": {
        "next_cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "watchlist_programs": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "IndividualWatchlistProgram"
          }
        }
      },
      "required": [
        "watchlist_programs",
        "next_cursor",
        "request_id"
      ]
    },
    "WatchlistScreeningIndividualReviewCreateRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "comment": {
          "type": "ref",
          "ref": "ReviewComment"
        },
        "confirmed_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WatchlistScreeningHitID"
          }
        },
        "dismissed_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WatchlistScreeningHitID"
          }
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "watchlist_screening_id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualID"
        }
      },
      "required": [
        "confirmed_hits",
        "dismissed_hits",
        "watchlist_screening_id"
      ]
    },
    "WatchlistScreeningIndividualReviewCreateResponse": {
      "type": "object",
      "properties": {
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "comment": {
          "type": "ref",
          "ref": "ReviewComment"
        },
        "confirmed_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WatchlistScreeningHitID"
          }
        },
        "dismissed_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WatchlistScreeningHitID"
          }
        },
        "id": {
          "type": "ref",
          "ref": "WatchlistScreeningReviewID"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "id",
        "confirmed_hits",
        "dismissed_hits",
        "comment",
        "audit_trail",
        "request_id"
      ]
    },
    "WatchlistScreeningIndividualReviewListRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "watchlist_screening_id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualID"
        }
      },
      "required": [
        "watchlist_screening_id"
      ]
    },
    "WatchlistScreeningIndividualReviewListResponse": {
      "type": "object",
      "properties": {
        "next_cursor": {
          "type": "ref",
          "ref": "Cursor"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "watchlist_screening_reviews": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WatchlistScreeningReview"
          }
        }
      },
      "required": [
        "watchlist_screening_reviews",
        "next_cursor",
        "request_id"
      ]
    },
    "WatchlistScreeningIndividualUpdateRequest": {
      "type": "object",
      "properties": {
        "assignee": {
          "type": "ref",
          "ref": "DashboardUserID"
        },
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserID"
        },
        "reset_fields": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualUpdateRequestResettableFieldList"
        },
        "search_terms": {
          "type": "ref",
          "ref": "UpdateIndividualScreeningRequestSearchTerms"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        },
        "status": {
          "type": "ref",
          "ref": "WatchlistScreeningStatus"
        },
        "watchlist_screening_id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualID"
        }
      },
      "required": [
        "watchlist_screening_id"
      ]
    },
    "WatchlistScreeningIndividualUpdateRequestResettableField": {
      "type": "string"
    },
    "WatchlistScreeningIndividualUpdateRequestResettableFieldList": {
      "type": "array",
      "items": {
        "type": "ref",
        "ref": "WatchlistScreeningIndividualUpdateRequestResettableField"
      }
    },
    "WatchlistScreeningIndividualUpdateResponse": {
      "type": "object",
      "properties": {
        "assignee": {
          "type": "ref",
          "ref": "DashboardUserIDNullable"
        },
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "client_user_id": {
          "type": "ref",
          "ref": "ClientUserIDNullable"
        },
        "id": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualID"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        },
        "search_terms": {
          "type": "ref",
          "ref": "WatchlistScreeningSearchTerms"
        },
        "status": {
          "type": "ref",
          "ref": "WatchlistScreeningStatus"
        }
      },
      "required": [
        "id",
        "search_terms",
        "assignee",
        "status",
        "client_user_id",
        "audit_trail",
        "request_id"
      ]
    },
    "WatchlistScreeningPhoneNumber": {
      "type": "string"
    },
    "WatchlistScreeningPhoneNumberNullable": {
      "type": "string"
    },
    "WatchlistScreeningRequestSearchTerms": {
      "type": "object",
      "properties": {
        "country": {
          "type": "ref",
          "ref": "GenericCountryCode"
        },
        "date_of_birth": {
          "type": "ref",
          "ref": "ISO8601Date"
        },
        "document_number": {
          "type": "ref",
          "ref": "WatchlistScreeningDocumentValue"
        },
        "legal_name": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualName"
        },
        "watchlist_program_id": {
          "type": "ref",
          "ref": "WatchlistProgramID"
        }
      },
      "required": [
        "watchlist_program_id",
        "legal_name"
      ]
    },
    "WatchlistScreeningReview": {
      "type": "object",
      "properties": {
        "audit_trail": {
          "type": "ref",
          "ref": "WatchlistScreeningAuditTrail"
        },
        "comment": {
          "type": "ref",
          "ref": "ReviewComment"
        },
        "confirmed_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WatchlistScreeningHitID"
          }
        },
        "dismissed_hits": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "WatchlistScreeningHitID"
          }
        },
        "id": {
          "type": "ref",
          "ref": "WatchlistScreeningReviewID"
        }
      },
      "required": [
        "id",
        "confirmed_hits",
        "dismissed_hits",
        "comment",
        "audit_trail"
      ]
    },
    "WatchlistScreeningReviewID": {
      "type": "string"
    },
    "WatchlistScreeningSearchTerms": {
      "type": "object",
      "properties": {
        "country": {
          "type": "ref",
          "ref": "GenericCountryCodeNullable"
        },
        "date_of_birth": {
          "type": "ref",
          "ref": "ISO8601DateNullable"
        },
        "document_number": {
          "type": "ref",
          "ref": "WatchlistScreeningDocumentValueNullable"
        },
        "legal_name": {
          "type": "ref",
          "ref": "WatchlistScreeningIndividualName"
        },
        "version": {
          "type": "number"
        },
        "watchlist_program_id": {
          "type": "ref",
          "ref": "WatchlistProgramID"
        }
      },
      "required": [
        "watchlist_program_id",
        "legal_name",
        "date_of_birth",
        "document_number",
        "country",
        "version"
      ]
    },
    "WatchlistScreeningStatus": {
      "type": "string"
    },
    "WeakAliasDetermination": {
      "type": "string"
    },
    "WebhookEnvironmentValues": {
      "type": "string"
    },
    "WebhookType": {
      "type": "string"
    },
    "WebhookUpdateAcknowledgedWebhook": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "ref",
          "ref": "WebhookEnvironmentValues"
        },
        "error": {
          "type": "ref",
          "ref": "PlaidError"
        },
        "item_id": {
          "type": "ref",
          "ref": "ItemId"
        },
        "new_webhook_url": {
          "type": "string"
        },
        "webhook_code": {
          "type": "string"
        },
        "webhook_type": {
          "type": "string"
        }
      },
      "required": [
        "webhook_type",
        "webhook_code",
        "item_id",
        "new_webhook_url",
        "environment"
      ]
    },
    "WebhookVerificationKeyGetRequest": {
      "type": "object",
      "properties": {
        "client_id": {
          "type": "ref",
          "ref": "APIClientID"
        },
        "key_id": {
          "type": "string"
        },
        "secret": {
          "type": "ref",
          "ref": "APISecret"
        }
      },
      "required": [
        "key_id"
      ]
    },
    "WebhookVerificationKeyGetResponse": {
      "type": "object",
      "properties": {
        "key": {
          "type": "ref",
          "ref": "JWKPublicKey"
        },
        "request_id": {
          "type": "ref",
          "ref": "RequestID"
        }
      },
      "required": [
        "key",
        "request_id"
      ]
    },
    "YTDGrossIncomeSummaryFieldNumber": {
      "type": "ref",
      "ref": "IncomeSummaryFieldNumber"
    },
    "YTDNetIncomeSummaryFieldNumber": {
      "type": "ref",
      "ref": "IncomeSummaryFieldNumber"
    }
  },
  "entities": {},
  "queries": {},
  "actions": {
    "accountsBalanceGet": {
      "name": "Retrieve real-time balance data",
      "schema": {
        "type": "ref",
        "ref": "AccountsGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AccountsBalanceGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/accounts/balance/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "accountsGet": {
      "name": "Retrieve accounts",
      "schema": {
        "type": "ref",
        "ref": "AccountsGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AccountsGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/accounts/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "applicationGet": {
      "name": "Retrieve information about a Plaid application",
      "schema": {
        "type": "ref",
        "ref": "ApplicationGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ApplicationGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/application/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "assetReportAuditCopyCreate": {
      "name": "Create Asset Report Audit Copy",
      "schema": {
        "type": "ref",
        "ref": "AssetReportAuditCopyCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AssetReportAuditCopyCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/asset_report/audit_copy/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "assetReportAuditCopyGet": {
      "name": "Retrieve an Asset Report Audit Copy",
      "schema": {
        "type": "ref",
        "ref": "AssetReportGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AssetReportAuditCopyGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/asset_report/audit_copy/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "assetReportAuditCopyRemove": {
      "name": "Remove Asset Report Audit Copy",
      "schema": {
        "type": "ref",
        "ref": "AssetReportAuditCopyRemoveResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AssetReportAuditCopyRemoveRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/asset_report/audit_copy/remove",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "assetReportCreate": {
      "name": "Create an Asset Report",
      "schema": {
        "type": "ref",
        "ref": "AssetReportCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AssetReportCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/asset_report/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "assetReportFilter": {
      "name": "Filter Asset Report",
      "schema": {
        "type": "ref",
        "ref": "AssetReportFilterResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AssetReportFilterRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/asset_report/filter",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "assetReportGet": {
      "name": "Retrieve an Asset Report",
      "schema": {
        "type": "ref",
        "ref": "AssetReportGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AssetReportGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/asset_report/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "assetReportPdfGet": {
      "name": "Retrieve a PDF Asset Report",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AssetReportPDFGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/asset_report/pdf/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "assetReportRefresh": {
      "name": "Refresh an Asset Report",
      "schema": {
        "type": "ref",
        "ref": "AssetReportRefreshResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AssetReportRefreshRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/asset_report/refresh",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "assetReportRemove": {
      "name": "Delete an Asset Report",
      "schema": {
        "type": "ref",
        "ref": "AssetReportRemoveResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AssetReportRemoveRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/asset_report/remove",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "authGet": {
      "name": "Retrieve auth data",
      "schema": {
        "type": "ref",
        "ref": "AuthGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AuthGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/auth/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bankTransferBalanceGet": {
      "name": "Get balance of your Bank Transfer account",
      "schema": {
        "type": "ref",
        "ref": "BankTransferBalanceGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BankTransferBalanceGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/bank_transfer/balance/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bankTransferCancel": {
      "name": "Cancel a bank transfer",
      "schema": {
        "type": "ref",
        "ref": "BankTransferCancelResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BankTransferCancelRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/bank_transfer/cancel",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bankTransferCreate": {
      "name": "Create a bank transfer",
      "schema": {
        "type": "ref",
        "ref": "BankTransferCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BankTransferCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/bank_transfer/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bankTransferEventList": {
      "name": "List bank transfer events",
      "schema": {
        "type": "ref",
        "ref": "BankTransferEventListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BankTransferEventListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/bank_transfer/event/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bankTransferEventSync": {
      "name": "Sync bank transfer events",
      "schema": {
        "type": "ref",
        "ref": "BankTransferEventSyncResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BankTransferEventSyncRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/bank_transfer/event/sync",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bankTransferGet": {
      "name": "Retrieve a bank transfer",
      "schema": {
        "type": "ref",
        "ref": "BankTransferGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BankTransferGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/bank_transfer/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bankTransferList": {
      "name": "List bank transfers",
      "schema": {
        "type": "ref",
        "ref": "BankTransferListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BankTransferListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/bank_transfer/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bankTransferMigrateAccount": {
      "name": "Migrate account into Bank Transfers",
      "schema": {
        "type": "ref",
        "ref": "BankTransferMigrateAccountResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BankTransferMigrateAccountRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/bank_transfer/migrate_account",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bankTransferSweepGet": {
      "name": "Retrieve a sweep",
      "schema": {
        "type": "ref",
        "ref": "BankTransferSweepGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BankTransferSweepGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/bank_transfer/sweep/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "bankTransferSweepList": {
      "name": "List sweeps",
      "schema": {
        "type": "ref",
        "ref": "BankTransferSweepListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "BankTransferSweepListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/bank_transfer/sweep/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditBankEmploymentGet": {
      "name": "Retrieve information from the bank accounts used for employment verification",
      "schema": {
        "type": "ref",
        "ref": "CreditBankEmploymentGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditBankEmploymentGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/beta/credit/v1/bank_employment/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transactionsRulesCreate": {
      "name": "Create transaction category rule",
      "schema": {
        "type": "ref",
        "ref": "TransactionsRulesCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransactionsRulesCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/beta/transactions/rules/v1/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transactionsRulesList": {
      "name": "Return a list of rules created for the Item associated with the access token.",
      "schema": {
        "type": "ref",
        "ref": "TransactionsRulesListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransactionsRulesListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/beta/transactions/rules/v1/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transactionsRulesRemove": {
      "name": "Remove transaction rule",
      "schema": {
        "type": "ref",
        "ref": "TransactionsRulesRemoveResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransactionsRulesRemoveRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/beta/transactions/rules/v1/remove",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transactionsEnhance": {
      "name": "enhance locally-held transaction data",
      "schema": {
        "type": "ref",
        "ref": "TransactionsEnhanceGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransactionsEnhanceGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/beta/transactions/v1/enhance",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "categoriesGet": {
      "name": "Get Categories",
      "schema": {
        "type": "ref",
        "ref": "CategoriesGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CategoriesGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/categories/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditAssetReportFreddieMacGet": {
      "name": "Retrieve an Asset Report with Freddie Mac format. Only Freddie Mac can use this endpoint.",
      "schema": {
        "type": "ref",
        "ref": "AssetReportFreddieGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AssetReportFreddieGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/asset_report/freddie_mac/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditAuditCopyTokenCreate": {
      "name": "Create Asset or Income Report Audit Copy Token",
      "schema": {
        "type": "ref",
        "ref": "CreditAuditCopyTokenCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditAuditCopyTokenCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/audit_copy_token/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditReportAuditCopyRemove": {
      "name": "Remove an Audit Copy token",
      "schema": {
        "type": "ref",
        "ref": "CreditAuditCopyTokenRemoveResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditAuditCopyTokenRemoveRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/audit_copy_token/remove",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditAuditCopyTokenUpdate": {
      "name": "Update an Audit Copy Token",
      "schema": {
        "type": "ref",
        "ref": "CreditAuditCopyTokenUpdateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditAuditCopyTokenUpdateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/audit_copy_token/update",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditBankIncomeGet": {
      "name": "Retrieve information from the bank accounts used for income verification",
      "schema": {
        "type": "ref",
        "ref": "CreditBankIncomeGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditBankIncomeGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/bank_income/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditBankIncomePdfGet": {
      "name": "Retrieve information from the bank accounts used for income verification in PDF format",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditBankIncomePDFGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/bank_income/pdf/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditBankIncomeRefresh": {
      "name": "Refresh a user's bank income information",
      "schema": {
        "type": "ref",
        "ref": "CreditBankIncomeRefreshResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditBankIncomeRefreshRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/bank_income/refresh",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditEmploymentGet": {
      "name": "Retrieve a summary of an individual's employment information",
      "schema": {
        "type": "ref",
        "ref": "CreditEmploymentGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditEmploymentGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/employment/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditFreddieMacReportsGet": {
      "name": "Retrieve an Asset Report with Freddie Mac format (aka VOA - Verification Of Assets), and a Verification Of Employment (VOE) report if this one is available. Only Freddie Mac can use this endpoint.",
      "schema": {
        "type": "ref",
        "ref": "CreditFreddieMacReportsGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditFreddieMacReportsGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/freddie_mac/reports/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditPayrollIncomeGet": {
      "name": "Retrieve a user's payroll information",
      "schema": {
        "type": "ref",
        "ref": "CreditPayrollIncomeGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditPayrollIncomeGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/payroll_income/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditPayrollIncomePrecheck": {
      "name": "Check income verification eligibility and optimize conversion",
      "schema": {
        "type": "ref",
        "ref": "CreditPayrollIncomePrecheckResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditPayrollIncomePrecheckRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/payroll_income/precheck",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditPayrollIncomeRefresh": {
      "name": "Refresh a digital payroll income verification",
      "schema": {
        "type": "ref",
        "ref": "CreditPayrollIncomeRefreshResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditPayrollIncomeRefreshRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/payroll_income/refresh",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditRelayCreate": {
      "name": "Create a relay token to share an Asset Report with a partner client (beta)",
      "schema": {
        "type": "ref",
        "ref": "CreditRelayCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditRelayCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/relay/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditRelayGet": {
      "name": "Retrieve the reports associated with a relay token that was shared with you (beta)",
      "schema": {
        "type": "ref",
        "ref": "AssetReportGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditRelayGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/relay/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditRelayRefresh": {
      "name": "Refresh a report of a relay token (beta)",
      "schema": {
        "type": "ref",
        "ref": "CreditRelayRefreshResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditRelayRefreshRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/relay/refresh",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditRelayRemove": {
      "name": "Remove relay token (beta)",
      "schema": {
        "type": "ref",
        "ref": "CreditRelayRemoveResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditRelayRemoveRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/relay/remove",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "creditSessionsGet": {
      "name": "Retrieve Link sessions for your user",
      "schema": {
        "type": "ref",
        "ref": "CreditSessionsGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "CreditSessionsGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/credit/sessions/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "dashboardUserGet": {
      "name": "Retrieve a dashboard user",
      "schema": {
        "type": "ref",
        "ref": "DashboardUserGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "DashboardUserGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/dashboard_user/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "dashboardUserList": {
      "name": "List dashboard users",
      "schema": {
        "type": "ref",
        "ref": "DashboardUserListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "DashboardUserListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/dashboard_user/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "depositSwitchAltCreate": {
      "name": "Create a deposit switch without using Plaid Exchange",
      "schema": {
        "type": "ref",
        "ref": "DepositSwitchAltCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "DepositSwitchAltCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/deposit_switch/alt/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "depositSwitchCreate": {
      "name": "Create a deposit switch",
      "schema": {
        "type": "ref",
        "ref": "DepositSwitchCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "DepositSwitchCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/deposit_switch/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "depositSwitchGet": {
      "name": "Retrieve a deposit switch",
      "schema": {
        "type": "ref",
        "ref": "DepositSwitchGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "DepositSwitchGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/deposit_switch/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "depositSwitchTokenCreate": {
      "name": "Create a deposit switch token",
      "schema": {
        "type": "ref",
        "ref": "DepositSwitchTokenCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "DepositSwitchTokenCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/deposit_switch/token/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "employersSearch": {
      "name": "Search employer database",
      "schema": {
        "type": "ref",
        "ref": "EmployersSearchResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "EmployersSearchRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/employers/search",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "employmentVerificationGet": {
      "name": "(Deprecated) Retrieve a summary of an individual's employment information",
      "schema": {
        "type": "ref",
        "ref": "EmploymentVerificationGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "EmploymentVerificationGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/employment/verification/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "fdxNotifications": {
      "name": "Webhook receiver for fdx notifications",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "FDXNotification"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/fdx/notifications",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "identityGet": {
      "name": "Retrieve identity data",
      "schema": {
        "type": "ref",
        "ref": "IdentityGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IdentityGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/identity/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "identityMatch": {
      "name": "Retrieve identity match score",
      "schema": {
        "type": "ref",
        "ref": "IdentityMatchResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IdentityMatchRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/identity/match",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "identityVerificationCreate": {
      "name": "Create a new identity verification",
      "schema": {
        "type": "ref",
        "ref": "IdentityVerificationCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IdentityVerificationCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/identity_verification/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "identityVerificationGet": {
      "name": "Retrieve Identity Verification",
      "schema": {
        "type": "ref",
        "ref": "IdentityVerificationGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IdentityVerificationGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/identity_verification/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "identityVerificationList": {
      "name": "List Identity Verifications",
      "schema": {
        "type": "ref",
        "ref": "IdentityVerificationListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IdentityVerificationListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/identity_verification/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "identityVerificationRetry": {
      "name": "Retry an Identity Verification",
      "schema": {
        "type": "ref",
        "ref": "IdentityVerificationRetryResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IdentityVerificationRetryRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/identity_verification/retry",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "incomeVerificationCreate": {
      "name": "(Deprecated) Create an income verification instance",
      "schema": {
        "type": "ref",
        "ref": "IncomeVerificationCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IncomeVerificationCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/income/verification/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "incomeVerificationDocumentsDownload": {
      "name": "(Deprecated) Download the original documents used for income verification",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IncomeVerificationDocumentsDownloadRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/income/verification/documents/download",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "incomeVerificationPaystubsGet": {
      "name": "(Deprecated) Retrieve information from the paystubs used for income verification",
      "schema": {
        "type": "ref",
        "ref": "IncomeVerificationPaystubsGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IncomeVerificationPaystubsGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/income/verification/paystubs/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "incomeVerificationPrecheck": {
      "name": "(Deprecated) Check digital income verification eligibility and optimize conversion",
      "schema": {
        "type": "ref",
        "ref": "IncomeVerificationPrecheckResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IncomeVerificationPrecheckRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/income/verification/precheck",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "incomeVerificationTaxformsGet": {
      "name": "(Deprecated) Retrieve information from the tax documents used for income verification",
      "schema": {
        "type": "ref",
        "ref": "IncomeVerificationTaxformsGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "IncomeVerificationTaxformsGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/income/verification/taxforms/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "institutionsGet": {
      "name": "Get details of all supported institutions",
      "schema": {
        "type": "ref",
        "ref": "InstitutionsGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InstitutionsGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/institutions/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "institutionsGetById": {
      "name": "Get details of an institution",
      "schema": {
        "type": "ref",
        "ref": "InstitutionsGetByIdResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InstitutionsGetByIdRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/institutions/get_by_id",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "institutionsSearch": {
      "name": "Search institutions",
      "schema": {
        "type": "ref",
        "ref": "InstitutionsSearchResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InstitutionsSearchRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/institutions/search",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "investmentsHoldingsGet": {
      "name": "Get Investment holdings",
      "schema": {
        "type": "ref",
        "ref": "InvestmentsHoldingsGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InvestmentsHoldingsGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/investments/holdings/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "investmentsTransactionsGet": {
      "name": "Get investment transactions",
      "schema": {
        "type": "ref",
        "ref": "InvestmentsTransactionsGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "InvestmentsTransactionsGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/investments/transactions/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "itemAccessTokenInvalidate": {
      "name": "Invalidate access_token",
      "schema": {
        "type": "ref",
        "ref": "ItemAccessTokenInvalidateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ItemAccessTokenInvalidateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/item/access_token/invalidate",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "itemActivityList": {
      "name": "List a historical log of user consent events",
      "schema": {
        "type": "ref",
        "ref": "ItemActivityListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ItemActivityListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/item/activity/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "itemApplicationList": {
      "name": "List a user’s connected applications",
      "schema": {
        "type": "ref",
        "ref": "ItemApplicationListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ItemApplicationListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/item/application/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "itemApplicationScopesUpdate": {
      "name": "Update the scopes of access for a particular application",
      "schema": {
        "type": "ref",
        "ref": "ItemApplicationScopesUpdateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ItemApplicationScopesUpdateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/item/application/scopes/update",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "itemGet": {
      "name": "Retrieve an Item",
      "schema": {
        "type": "ref",
        "ref": "ItemGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ItemGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/item/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "itemImport": {
      "name": "Import Item",
      "schema": {
        "type": "ref",
        "ref": "ItemImportResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ItemImportRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/item/import",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "itemCreatePublicToken": {
      "name": "Create public token",
      "schema": {
        "type": "ref",
        "ref": "ItemPublicTokenCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ItemPublicTokenCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/item/public_token/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "itemPublicTokenExchange": {
      "name": "Exchange public token for an access token",
      "schema": {
        "type": "ref",
        "ref": "ItemPublicTokenExchangeResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ItemPublicTokenExchangeRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/item/public_token/exchange",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "itemRemove": {
      "name": "Remove an Item",
      "schema": {
        "type": "ref",
        "ref": "ItemRemoveResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ItemRemoveRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/item/remove",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "itemWebhookUpdate": {
      "name": "Update Webhook URL",
      "schema": {
        "type": "ref",
        "ref": "ItemWebhookUpdateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ItemWebhookUpdateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/item/webhook/update",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "liabilitiesGet": {
      "name": "Retrieve Liabilities data",
      "schema": {
        "type": "ref",
        "ref": "LiabilitiesGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "LiabilitiesGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/liabilities/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "linkOauthCorrelationIdExchange": {
      "name": "Exchange the Link Correlation Id for a Link Token",
      "schema": {
        "type": "ref",
        "ref": "LinkOAuthCorrelationIdExchangeResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "LinkOAuthCorrelationIdExchangeRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/link/oauth/correlation_id/exchange",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "linkTokenCreate": {
      "name": "Create Link Token",
      "schema": {
        "type": "ref",
        "ref": "LinkTokenCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "LinkTokenCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/link/token/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "linkTokenGet": {
      "name": "Get Link Token",
      "schema": {
        "type": "ref",
        "ref": "LinkTokenGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "LinkTokenGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/link/token/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "linkDeliveryCreate": {
      "name": "Create Link Delivery session",
      "schema": {
        "type": "ref",
        "ref": "LinkDeliveryCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "LinkDeliveryCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/link_delivery/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "linkDeliveryGet": {
      "name": "Get Link Delivery session",
      "schema": {
        "type": "ref",
        "ref": "LinkDeliveryGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "LinkDeliveryGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/link_delivery/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "partnerCustomerCreate": {
      "name": "Creates a new end customer for a Plaid reseller.",
      "schema": {
        "type": "ref",
        "ref": "PartnerCustomerCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PartnerCustomerCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/partner/customer/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "partnerCustomerEnable": {
      "name": "Enables a Plaid reseller's end customer in the Production environment.",
      "schema": {
        "type": "ref",
        "ref": "PartnerCustomerEnableResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PartnerCustomerEnableRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/partner/customer/enable",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "partnerCustomerGet": {
      "name": "Returns a Plaid reseller's end customer.",
      "schema": {
        "type": "ref",
        "ref": "PartnerCustomerGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PartnerCustomerGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/partner/customer/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "partnerCustomerOauthInstitutionsGet": {
      "name": "Returns OAuth-institution registration information for a given end customer.",
      "schema": {
        "type": "ref",
        "ref": "PartnerCustomerOAuthInstitutionsGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PartnerCustomerOAuthInstitutionsGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/partner/customer/oauth_institutions/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "partnerCustomerRemove": {
      "name": "Removes a Plaid reseller's end customer.",
      "schema": {
        "type": "ref",
        "ref": "PartnerCustomerRemoveResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PartnerCustomerRemoveRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/partner/customer/remove",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentInitiationConsentCreate": {
      "name": "Create payment consent",
      "schema": {
        "type": "ref",
        "ref": "PaymentInitiationConsentCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentInitiationConsentCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_initiation/consent/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentInitiationConsentGet": {
      "name": "Get payment consent",
      "schema": {
        "type": "ref",
        "ref": "PaymentInitiationConsentGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentInitiationConsentGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_initiation/consent/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentInitiationConsentPaymentExecute": {
      "name": "Execute a single payment using consent",
      "schema": {
        "type": "ref",
        "ref": "PaymentInitiationConsentPaymentExecuteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentInitiationConsentPaymentExecuteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_initiation/consent/payment/execute",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentInitiationConsentRevoke": {
      "name": "Revoke payment consent",
      "schema": {
        "type": "ref",
        "ref": "PaymentInitiationConsentRevokeResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentInitiationConsentRevokeRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_initiation/consent/revoke",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentInitiationPaymentCreate": {
      "name": "Create a payment",
      "schema": {
        "type": "ref",
        "ref": "PaymentInitiationPaymentCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentInitiationPaymentCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_initiation/payment/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentInitiationPaymentGet": {
      "name": "Get payment details",
      "schema": {
        "type": "ref",
        "ref": "PaymentInitiationPaymentGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentInitiationPaymentGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_initiation/payment/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentInitiationPaymentList": {
      "name": "List payments",
      "schema": {
        "type": "ref",
        "ref": "PaymentInitiationPaymentListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentInitiationPaymentListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_initiation/payment/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentInitiationPaymentReverse": {
      "name": "Reverse an existing payment",
      "schema": {
        "type": "ref",
        "ref": "PaymentInitiationPaymentReverseResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentInitiationPaymentReverseRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_initiation/payment/reverse",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "createPaymentToken": {
      "name": "Create payment token",
      "schema": {
        "type": "ref",
        "ref": "PaymentInitiationPaymentTokenCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentInitiationPaymentTokenCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_initiation/payment/token/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentInitiationRecipientCreate": {
      "name": "Create payment recipient",
      "schema": {
        "type": "ref",
        "ref": "PaymentInitiationRecipientCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentInitiationRecipientCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_initiation/recipient/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentInitiationRecipientGet": {
      "name": "Get payment recipient",
      "schema": {
        "type": "ref",
        "ref": "PaymentInitiationRecipientGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentInitiationRecipientGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_initiation/recipient/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentInitiationRecipientList": {
      "name": "List payment recipients",
      "schema": {
        "type": "ref",
        "ref": "PaymentInitiationRecipientListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentInitiationRecipientListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_initiation/recipient/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentProfileCreate": {
      "name": "Create payment profile",
      "schema": {
        "type": "ref",
        "ref": "PaymentProfileCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentProfileCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_profile/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentProfileGet": {
      "name": "Get payment profile",
      "schema": {
        "type": "ref",
        "ref": "PaymentProfileGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentProfileGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_profile/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "paymentProfileRemove": {
      "name": "Remove payment profile",
      "schema": {
        "type": "ref",
        "ref": "PaymentProfileRemoveResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "PaymentProfileRemoveRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/payment_profile/remove",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "processorApexProcessorTokenCreate": {
      "name": "Create Apex bank account token",
      "schema": {
        "type": "ref",
        "ref": "ProcessorTokenCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ProcessorApexProcessorTokenCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/processor/apex/processor_token/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "processorAuthGet": {
      "name": "Retrieve Auth data",
      "schema": {
        "type": "ref",
        "ref": "ProcessorAuthGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ProcessorAuthGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/processor/auth/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "processorBalanceGet": {
      "name": "Retrieve Balance data",
      "schema": {
        "type": "ref",
        "ref": "ProcessorBalanceGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ProcessorBalanceGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/processor/balance/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "processorBankTransferCreate": {
      "name": "Create a bank transfer as a processor",
      "schema": {
        "type": "ref",
        "ref": "ProcessorBankTransferCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ProcessorBankTransferCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/processor/bank_transfer/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "processorIdentityGet": {
      "name": "Retrieve Identity data",
      "schema": {
        "type": "ref",
        "ref": "ProcessorIdentityGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ProcessorIdentityGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/processor/identity/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "processorSignalDecisionReport": {
      "name": "Report whether you initiated an ACH transaction",
      "schema": {
        "type": "ref",
        "ref": "ProcessorSignalDecisionReportResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ProcessorSignalDecisionReportRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/processor/signal/decision/report",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "processorSignalEvaluate": {
      "name": "Evaluate a planned ACH transaction",
      "schema": {
        "type": "ref",
        "ref": "ProcessorSignalEvaluateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ProcessorSignalEvaluateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/processor/signal/evaluate",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "processorSignalReturnReport": {
      "name": "Report a return for an ACH transaction",
      "schema": {
        "type": "ref",
        "ref": "ProcessorSignalReturnReportResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ProcessorSignalReturnReportRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/processor/signal/return/report",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "processorStripeBankAccountTokenCreate": {
      "name": "Create Stripe bank account token",
      "schema": {
        "type": "ref",
        "ref": "ProcessorStripeBankAccountTokenCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ProcessorStripeBankAccountTokenCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/processor/stripe/bank_account_token/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "processorTokenCreate": {
      "name": "Create processor token",
      "schema": {
        "type": "ref",
        "ref": "ProcessorTokenCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ProcessorTokenCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/processor/token/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxBankTransferFireWebhook": {
      "name": "Manually fire a Bank Transfer webhook",
      "schema": {
        "type": "ref",
        "ref": "SandboxBankTransferFireWebhookResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxBankTransferFireWebhookRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/bank_transfer/fire_webhook",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxBankTransferSimulate": {
      "name": "Simulate a bank transfer event in Sandbox",
      "schema": {
        "type": "ref",
        "ref": "SandboxBankTransferSimulateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxBankTransferSimulateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/bank_transfer/simulate",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxIncomeFireWebhook": {
      "name": "Manually fire an Income webhook",
      "schema": {
        "type": "ref",
        "ref": "SandboxIncomeFireWebhookResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxIncomeFireWebhookRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/income/fire_webhook",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxItemFireWebhook": {
      "name": "Fire a test webhook",
      "schema": {
        "type": "ref",
        "ref": "SandboxItemFireWebhookResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxItemFireWebhookRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/item/fire_webhook",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxItemResetLogin": {
      "name": "Force a Sandbox Item into an error state",
      "schema": {
        "type": "ref",
        "ref": "SandboxItemResetLoginResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxItemResetLoginRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/item/reset_login",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxItemSetVerificationStatus": {
      "name": "Set verification status for Sandbox account",
      "schema": {
        "type": "ref",
        "ref": "SandboxItemSetVerificationStatusResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxItemSetVerificationStatusRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/item/set_verification_status",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxOauthSelectAccounts": {
      "name": "Save the selected accounts when connecting to the Platypus Oauth institution",
      "schema": {
        "type": "ref",
        "ref": "SandboxOauthSelectAccountsResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxOauthSelectAccountsRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/oauth/select_accounts",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxPaymentProfileResetLogin": {
      "name": "Reset the login of a Payment Profile",
      "schema": {
        "type": "ref",
        "ref": "SandboxPaymentProfileResetLoginResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxPaymentProfileResetLoginRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/payment_profile/reset_login",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxProcessorTokenCreate": {
      "name": "Create a test Item and processor token",
      "schema": {
        "type": "ref",
        "ref": "SandboxProcessorTokenCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxProcessorTokenCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/processor_token/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxPublicTokenCreate": {
      "name": "Create a test Item",
      "schema": {
        "type": "ref",
        "ref": "SandboxPublicTokenCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxPublicTokenCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/public_token/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxTransferFireWebhook": {
      "name": "Manually fire a Transfer webhook",
      "schema": {
        "type": "ref",
        "ref": "SandboxTransferFireWebhookResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxTransferFireWebhookRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/transfer/fire_webhook",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxTransferRepaymentSimulate": {
      "name": "Trigger the creation of a repayment",
      "schema": {
        "type": "ref",
        "ref": "SandboxTransferRepaymentSimulateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxTransferRepaymentSimulateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/transfer/repayment/simulate",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxTransferSimulate": {
      "name": "Simulate a transfer event in Sandbox",
      "schema": {
        "type": "ref",
        "ref": "SandboxTransferSimulateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxTransferSimulateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/transfer/simulate",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxTransferSweepSimulate": {
      "name": "Simulate creating a sweep",
      "schema": {
        "type": "ref",
        "ref": "SandboxTransferSweepSimulateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxTransferSweepSimulateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/transfer/sweep/simulate",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxTransferTestClockAdvance": {
      "name": "Advance a test clock",
      "schema": {
        "type": "ref",
        "ref": "SandboxTransferTestClockAdvanceResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxTransferTestClockAdvanceRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/transfer/test_clock/advance",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxTransferTestClockCreate": {
      "name": "Create a test clock",
      "schema": {
        "type": "ref",
        "ref": "SandboxTransferTestClockCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxTransferTestClockCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/transfer/test_clock/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxTransferTestClockGet": {
      "name": "Get a test clock",
      "schema": {
        "type": "ref",
        "ref": "SandboxTransferTestClockGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxTransferTestClockGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/transfer/test_clock/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "sandboxTransferTestClockList": {
      "name": "List test clocks",
      "schema": {
        "type": "ref",
        "ref": "SandboxTransferTestClockListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SandboxTransferTestClockListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/sandbox/transfer/test_clock/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "signalDecisionReport": {
      "name": "Report whether you initiated an ACH transaction",
      "schema": {
        "type": "ref",
        "ref": "SignalDecisionReportResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SignalDecisionReportRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/signal/decision/report",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "signalEvaluate": {
      "name": "Evaluate a planned ACH transaction",
      "schema": {
        "type": "ref",
        "ref": "SignalEvaluateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SignalEvaluateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/signal/evaluate",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "signalPrepare": {
      "name": "Opt-in an Item to Signal",
      "schema": {
        "type": "ref",
        "ref": "SignalPrepareResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SignalPrepareRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/signal/prepare",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "signalReturnReport": {
      "name": "Report a return for an ACH transaction",
      "schema": {
        "type": "ref",
        "ref": "SignalReturnReportResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SignalReturnReportRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/signal/return/report",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transactionsEnrich": {
      "name": "Enrich locally-held transaction data",
      "schema": {
        "type": "ref",
        "ref": "TransactionsEnrichGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransactionsEnrichGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transactions/enrich",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transactionsGet": {
      "name": "Get transaction data",
      "schema": {
        "type": "ref",
        "ref": "TransactionsGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransactionsGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transactions/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transactionsRecurringGet": {
      "name": "Fetch recurring transaction streams",
      "schema": {
        "type": "ref",
        "ref": "TransactionsRecurringGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransactionsRecurringGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transactions/recurring/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transactionsRefresh": {
      "name": "Refresh transaction data",
      "schema": {
        "type": "ref",
        "ref": "TransactionsRefreshResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransactionsRefreshRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transactions/refresh",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transactionsSync": {
      "name": "Get incremental transaction updates on an Item",
      "schema": {
        "type": "ref",
        "ref": "TransactionsSyncResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransactionsSyncRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transactions/sync",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferAuthorizationCreate": {
      "name": "Create a transfer authorization",
      "schema": {
        "type": "ref",
        "ref": "TransferAuthorizationCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferAuthorizationCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/authorization/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferCancel": {
      "name": "Cancel a transfer",
      "schema": {
        "type": "ref",
        "ref": "TransferCancelResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferCancelRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/cancel",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferCapabilitiesGet": {
      "name": "Get RTP eligibility information of a transfer",
      "schema": {
        "type": "ref",
        "ref": "TransferCapabilitiesGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferCapabilitiesGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/capabilities/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferCreate": {
      "name": "Create a transfer",
      "schema": {
        "type": "ref",
        "ref": "TransferCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferEventList": {
      "name": "List transfer events",
      "schema": {
        "type": "ref",
        "ref": "TransferEventListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferEventListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/event/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferEventSync": {
      "name": "Sync transfer events",
      "schema": {
        "type": "ref",
        "ref": "TransferEventSyncResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferEventSyncRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/event/sync",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferGet": {
      "name": "Retrieve a transfer",
      "schema": {
        "type": "ref",
        "ref": "TransferGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferIntentCreate": {
      "name": "Create a transfer intent object to invoke the Transfer UI",
      "schema": {
        "type": "ref",
        "ref": "TransferIntentCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferIntentCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/intent/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferIntentGet": {
      "name": "Retrieve more information about a transfer intent",
      "schema": {
        "type": "ref",
        "ref": "TransferIntentGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferIntentGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/intent/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferList": {
      "name": "List transfers",
      "schema": {
        "type": "ref",
        "ref": "TransferListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferMigrateAccount": {
      "name": "Migrate account into Transfers",
      "schema": {
        "type": "ref",
        "ref": "TransferMigrateAccountResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferMigrateAccountRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/migrate_account",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferOriginatorCreate": {
      "name": "Create a new originator",
      "schema": {
        "type": "ref",
        "ref": "TransferOriginatorCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferOriginatorCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/originator/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferOriginatorGet": {
      "name": "Get status of an originator's onboarding",
      "schema": {
        "type": "ref",
        "ref": "TransferOriginatorGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferOriginatorGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/originator/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferOriginatorList": {
      "name": "Get status of all originators' onboarding",
      "schema": {
        "type": "ref",
        "ref": "TransferOriginatorListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferOriginatorListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/originator/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferQuestionnaireCreate": {
      "name": "Generate a Plaid-hosted onboarding UI URL.",
      "schema": {
        "type": "ref",
        "ref": "TransferQuestionnaireCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferQuestionnaireCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/questionnaire/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferRecurringCancel": {
      "name": "Cancel a recurring transfer.",
      "schema": {
        "type": "ref",
        "ref": "TransferRecurringCancelResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferRecurringCancelRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/recurring/cancel",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferRecurringCreate": {
      "name": "Create a recurring transfer",
      "schema": {
        "type": "ref",
        "ref": "TransferRecurringCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferRecurringCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/recurring/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferRecurringGet": {
      "name": "Retrieve a recurring transfer",
      "schema": {
        "type": "ref",
        "ref": "TransferRecurringGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferRecurringGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/recurring/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferRecurringList": {
      "name": "List recurring transfers",
      "schema": {
        "type": "ref",
        "ref": "TransferRecurringListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferRecurringListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/recurring/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferRefundCancel": {
      "name": "Cancel a refund",
      "schema": {
        "type": "ref",
        "ref": "TransferRefundCancelResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferRefundCancelRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/refund/cancel",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferRefundCreate": {
      "name": "Create a refund",
      "schema": {
        "type": "ref",
        "ref": "TransferRefundCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferRefundCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/refund/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferRefundGet": {
      "name": "Retrieve a refund",
      "schema": {
        "type": "ref",
        "ref": "TransferRefundGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferRefundGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/refund/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferRepaymentList": {
      "name": "Lists historical repayments",
      "schema": {
        "type": "ref",
        "ref": "TransferRepaymentListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferRepaymentListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/repayment/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferRepaymentReturnList": {
      "name": "List the returns included in a repayment",
      "schema": {
        "type": "ref",
        "ref": "TransferRepaymentReturnListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferRepaymentReturnListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/repayment/return/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferSweepGet": {
      "name": "Retrieve a sweep",
      "schema": {
        "type": "ref",
        "ref": "TransferSweepGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferSweepGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/sweep/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "transferSweepList": {
      "name": "List sweeps",
      "schema": {
        "type": "ref",
        "ref": "TransferSweepListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "TransferSweepListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/transfer/sweep/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "userCreate": {
      "name": "Create user",
      "schema": {
        "type": "ref",
        "ref": "UserCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "UserCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/user/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "walletCreate": {
      "name": "Create an e-wallet",
      "schema": {
        "type": "ref",
        "ref": "WalletCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WalletCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/wallet/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "walletGet": {
      "name": "Fetch an e-wallet",
      "schema": {
        "type": "ref",
        "ref": "WalletGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WalletGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/wallet/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "walletList": {
      "name": "Fetch a list of e-wallets",
      "schema": {
        "type": "ref",
        "ref": "WalletListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WalletListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/wallet/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "walletTransactionExecute": {
      "name": "Execute a transaction using an e-wallet",
      "schema": {
        "type": "ref",
        "ref": "WalletTransactionExecuteResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WalletTransactionExecuteRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/wallet/transaction/execute",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "walletTransactionGet": {
      "name": "Fetch an e-wallet transaction",
      "schema": {
        "type": "ref",
        "ref": "WalletTransactionGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WalletTransactionGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/wallet/transaction/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "walletTransactionList": {
      "name": "List e-wallet transactions",
      "schema": {
        "type": "ref",
        "ref": "WalletTransactionListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WalletTransactionListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/wallet/transaction/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningEntityCreate": {
      "name": "Create a watchlist screening for an entity",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningEntityCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningEntityCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/entity/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningEntityGet": {
      "name": "Get an entity screening",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningEntityGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningEntityGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/entity/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningEntityHistoryList": {
      "name": "List history for entity watchlist screenings",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningEntityHistoryListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningEntityHistoryListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/entity/history/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningEntityHitList": {
      "name": "List hits for entity watchlist screenings",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningEntityHitListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningEntityHitListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/entity/hit/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningEntityList": {
      "name": "List entity watchlist screenings",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningEntityListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningEntityListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/entity/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningEntityProgramGet": {
      "name": "Get entity watchlist screening program",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningEntityProgramGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningEntityProgramGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/entity/program/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningEntityProgramList": {
      "name": "List entity watchlist screening programs",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningEntityProgramListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningEntityProgramListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/entity/program/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningEntityReviewCreate": {
      "name": "Create a review for an entity watchlist screening",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningEntityReviewCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningEntityReviewCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/entity/review/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningEntityReviewList": {
      "name": "List reviews for entity watchlist screenings",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningEntityReviewListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningEntityReviewListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/entity/review/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningEntityUpdate": {
      "name": "Update an entity screening",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningEntityUpdateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningEntityUpdateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/entity/update",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningIndividualCreate": {
      "name": "Create a watchlist screening for a person",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningIndividualCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningIndividualCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/individual/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningIndividualGet": {
      "name": "Retrieve an individual watchlist screening",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningIndividualGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningIndividualGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/individual/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningIndividualHistoryList": {
      "name": "List history for individual watchlist screenings",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningIndividualHistoryListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningIndividualHistoryListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/individual/history/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningIndividualHitList": {
      "name": "List hits for individual watchlist screening",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningIndividualHitListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningIndividualHitListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/individual/hit/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningIndividualList": {
      "name": "List Individual Watchlist Screenings",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningIndividualListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningIndividualListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/individual/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningIndividualProgramGet": {
      "name": "Get individual watchlist screening program",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningIndividualProgramGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningIndividualProgramGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/individual/program/get",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningIndividualProgramList": {
      "name": "List individual watchlist screening programs",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningIndividualProgramListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningIndividualProgramListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/individual/program/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningIndividualReviewCreate": {
      "name": "Create a review for an individual watchlist screening",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningIndividualReviewCreateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningIndividualReviewCreateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/individual/review/create",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningIndividualReviewList": {
      "name": "List reviews for individual watchlist screenings",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningIndividualReviewListResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningIndividualReviewListRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/individual/review/list",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "watchlistScreeningIndividualUpdate": {
      "name": "Update individual watchlist screening",
      "schema": {
        "type": "ref",
        "ref": "WatchlistScreeningIndividualUpdateResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WatchlistScreeningIndividualUpdateRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/watchlist_screening/individual/update",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "webhookVerificationKeyGet": {
      "name": "Get webhook verification key",
      "schema": {
        "type": "ref",
        "ref": "WebhookVerificationKeyGetResponse"
      },
      "args": {
        "data": {
          "schema": {
            "type": "ref",
            "ref": "WebhookVerificationKeyGetRequest"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/webhook_verification_key/get",
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
