import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "digitalocean",
  "type": "http",
  "connection": {
    "provider": "digitalocean",
    "baseUrl": "https://api.digitalocean.com"
  },
  "schemas": {},
  "entities": {},
  "queries": {
    "get_v2_1-clicks": {
      "name": "get /v2/1-clicks",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/1-clicks"
        }
      }
    },
    "get_v2_account": {
      "name": "get /v2/account",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/account"
        }
      }
    },
    "get_v2_account_keys": {
      "name": "get /v2/account/keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/account/keys"
        }
      }
    },
    "get_v2_account_keys__ssh_key_identifier_": {
      "name": "get /v2/account/keys/{ssh_key_identifier}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/account/keys/{ssh_key_identifier}"
        }
      }
    },
    "get_v2_actions": {
      "name": "get /v2/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/actions"
        }
      }
    },
    "get_v2_actions__action_id_": {
      "name": "get /v2/actions/{action_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/actions/{action_id}"
        }
      }
    },
    "get_v2_add-ons_apps": {
      "name": "get /v2/add-ons/apps",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/add-ons/apps"
        }
      }
    },
    "get_v2_add-ons_apps__app_slug__metadata": {
      "name": "get /v2/add-ons/apps/{app_slug}/metadata",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/add-ons/apps/{app_slug}/metadata"
        }
      }
    },
    "get_v2_add-ons_saas": {
      "name": "get /v2/add-ons/saas",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/add-ons/saas"
        }
      }
    },
    "get_v2_add-ons_saas__resource_uuid_": {
      "name": "get /v2/add-ons/saas/{resource_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/add-ons/saas/{resource_uuid}"
        }
      }
    },
    "get_v2_apps": {
      "name": "get /v2/apps",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps"
        }
      }
    },
    "get_v2_apps__id_": {
      "name": "get /v2/apps/{id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{id}"
        }
      }
    },
    "get_v2_apps__app_id__components__component_name__logs": {
      "name": "get /v2/apps/{app_id}/components/{component_name}/logs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/components/{component_name}/logs"
        }
      }
    },
    "get_v2_apps__app_id__components__component_name__exec": {
      "name": "get /v2/apps/{app_id}/components/{component_name}/exec",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/components/{component_name}/exec"
        }
      }
    },
    "get_v2_apps__app_id__instances": {
      "name": "get /v2/apps/{app_id}/instances",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/instances"
        }
      }
    },
    "get_v2_apps__app_id__deployments": {
      "name": "get /v2/apps/{app_id}/deployments",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/deployments"
        }
      }
    },
    "get_v2_apps__app_id__deployments__deployment_id_": {
      "name": "get /v2/apps/{app_id}/deployments/{deployment_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/deployments/{deployment_id}"
        }
      }
    },
    "get_v2_apps__app_id__deployments__deployment_id__components__component_name__logs": {
      "name": "get /v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/logs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/logs"
        }
      }
    },
    "get_v2_apps__app_id__deployments__deployment_id__logs": {
      "name": "get /v2/apps/{app_id}/deployments/{deployment_id}/logs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/deployments/{deployment_id}/logs"
        }
      }
    },
    "get_v2_apps__app_id__deployments__deployment_id__components__component_name__exec": {
      "name": "get /v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/exec",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/exec"
        }
      }
    },
    "get_v2_apps__app_id__logs": {
      "name": "get /v2/apps/{app_id}/logs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/logs"
        }
      }
    },
    "get_v2_apps__app_id__job-invocations": {
      "name": "get /v2/apps/{app_id}/job-invocations",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/job-invocations"
        }
      }
    },
    "get_v2_apps__app_id__job-invocations__job_invocation_id_": {
      "name": "get /v2/apps/{app_id}/job-invocations/{job_invocation_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/job-invocations/{job_invocation_id}"
        }
      }
    },
    "get_v2_apps__app_id__jobs__job_name__invocations__job_invocation_id__logs": {
      "name": "get /v2/apps/{app_id}/jobs/{job_name}/invocations/{job_invocation_id}/logs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/jobs/{job_name}/invocations/{job_invocation_id}/logs"
        }
      }
    },
    "get_v2_apps__app_id__events": {
      "name": "get /v2/apps/{app_id}/events",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/events"
        }
      }
    },
    "get_v2_apps__app_id__events__event_id_": {
      "name": "get /v2/apps/{app_id}/events/{event_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/events/{event_id}"
        }
      }
    },
    "get_v2_apps__app_id__events__event_id__logs": {
      "name": "get /v2/apps/{app_id}/events/{event_id}/logs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/events/{event_id}/logs"
        }
      }
    },
    "get_v2_apps_tiers_instance_sizes": {
      "name": "get /v2/apps/tiers/instance_sizes",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/tiers/instance_sizes"
        }
      }
    },
    "get_v2_apps_tiers_instance_sizes__slug_": {
      "name": "get /v2/apps/tiers/instance_sizes/{slug}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/tiers/instance_sizes/{slug}"
        }
      }
    },
    "get_v2_apps_regions": {
      "name": "get /v2/apps/regions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/regions"
        }
      }
    },
    "get_v2_apps__app_id__alerts": {
      "name": "get /v2/apps/{app_id}/alerts",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/alerts"
        }
      }
    },
    "get_v2_apps__app_id__metrics_bandwidth_daily": {
      "name": "get /v2/apps/{app_id}/metrics/bandwidth_daily",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/metrics/bandwidth_daily"
        }
      }
    },
    "get_v2_apps__app_id__health": {
      "name": "get /v2/apps/{app_id}/health",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/apps/{app_id}/health"
        }
      }
    },
    "get_v2_cdn_endpoints": {
      "name": "get /v2/cdn/endpoints",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/cdn/endpoints"
        }
      }
    },
    "get_v2_cdn_endpoints__cdn_id_": {
      "name": "get /v2/cdn/endpoints/{cdn_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/cdn/endpoints/{cdn_id}"
        }
      }
    },
    "get_v2_certificates": {
      "name": "get /v2/certificates",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/certificates"
        }
      }
    },
    "get_v2_certificates__certificate_id_": {
      "name": "get /v2/certificates/{certificate_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/certificates/{certificate_id}"
        }
      }
    },
    "get_v2_customers_my_balance": {
      "name": "get /v2/customers/my/balance",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/customers/my/balance"
        }
      }
    },
    "get_v2_customers_my_billing_history": {
      "name": "get /v2/customers/my/billing_history",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/customers/my/billing_history"
        }
      }
    },
    "get_v2_customers_my_invoices": {
      "name": "get /v2/customers/my/invoices",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/customers/my/invoices"
        }
      }
    },
    "get_v2_customers_my_invoices__invoice_uuid_": {
      "name": "get /v2/customers/my/invoices/{invoice_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/customers/my/invoices/{invoice_uuid}"
        }
      }
    },
    "get_v2_customers_my_invoices__invoice_uuid__csv": {
      "name": "get /v2/customers/my/invoices/{invoice_uuid}/csv",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/customers/my/invoices/{invoice_uuid}/csv"
        }
      }
    },
    "get_v2_customers_my_invoices__invoice_uuid__pdf": {
      "name": "get /v2/customers/my/invoices/{invoice_uuid}/pdf",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/customers/my/invoices/{invoice_uuid}/pdf"
        }
      }
    },
    "get_v2_customers_my_invoices__invoice_uuid__summary": {
      "name": "get /v2/customers/my/invoices/{invoice_uuid}/summary",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/customers/my/invoices/{invoice_uuid}/summary"
        }
      }
    },
    "get_v2_billing__account_urn__insights__start_date___end_date_": {
      "name": "get /v2/billing/{account_urn}/insights/{start_date}/{end_date}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/billing/{account_urn}/insights/{start_date}/{end_date}"
        }
      }
    },
    "get_v2_databases_options": {
      "name": "get /v2/databases/options",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/options"
        }
      }
    },
    "get_v2_databases": {
      "name": "get /v2/databases",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid_": {
      "name": "get /v2/databases/{database_cluster_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__config": {
      "name": "get /v2/databases/{database_cluster_uuid}/config",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/config"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__ca": {
      "name": "get /v2/databases/{database_cluster_uuid}/ca",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/ca"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__online-migration": {
      "name": "get /v2/databases/{database_cluster_uuid}/online-migration",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/online-migration"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__firewall": {
      "name": "get /v2/databases/{database_cluster_uuid}/firewall",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/firewall"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__backups": {
      "name": "get /v2/databases/{database_cluster_uuid}/backups",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/backups"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__replicas": {
      "name": "get /v2/databases/{database_cluster_uuid}/replicas",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/replicas"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__events": {
      "name": "get /v2/databases/{database_cluster_uuid}/events",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/events"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__replicas__replica_name_": {
      "name": "get /v2/databases/{database_cluster_uuid}/replicas/{replica_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/replicas/{replica_name}"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__users": {
      "name": "get /v2/databases/{database_cluster_uuid}/users",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/users"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__users__username_": {
      "name": "get /v2/databases/{database_cluster_uuid}/users/{username}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/users/{username}"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__dbs": {
      "name": "get /v2/databases/{database_cluster_uuid}/dbs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/dbs"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__dbs__database_name_": {
      "name": "get /v2/databases/{database_cluster_uuid}/dbs/{database_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/dbs/{database_name}"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__pools": {
      "name": "get /v2/databases/{database_cluster_uuid}/pools",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/pools"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__pools__pool_name_": {
      "name": "get /v2/databases/{database_cluster_uuid}/pools/{pool_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/pools/{pool_name}"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__eviction_policy": {
      "name": "get /v2/databases/{database_cluster_uuid}/eviction_policy",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/eviction_policy"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__sql_mode": {
      "name": "get /v2/databases/{database_cluster_uuid}/sql_mode",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/sql_mode"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__autoscale": {
      "name": "get /v2/databases/{database_cluster_uuid}/autoscale",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/autoscale"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__topics": {
      "name": "get /v2/databases/{database_cluster_uuid}/topics",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/topics"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__topics__topic_name_": {
      "name": "get /v2/databases/{database_cluster_uuid}/topics/{topic_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/topics/{topic_name}"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__logsink": {
      "name": "get /v2/databases/{database_cluster_uuid}/logsink",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/logsink"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__logsink__logsink_id_": {
      "name": "get /v2/databases/{database_cluster_uuid}/logsink/{logsink_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/logsink/{logsink_id}"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__schema-registry": {
      "name": "get /v2/databases/{database_cluster_uuid}/schema-registry",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/schema-registry"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__schema-registry__subject_name_": {
      "name": "get /v2/databases/{database_cluster_uuid}/schema-registry/{subject_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/schema-registry/{subject_name}"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__schema-registry__subject_name__versions__version_": {
      "name": "get /v2/databases/{database_cluster_uuid}/schema-registry/{subject_name}/versions/{version}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/schema-registry/{subject_name}/versions/{version}"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__schema-registry_config": {
      "name": "get /v2/databases/{database_cluster_uuid}/schema-registry/config",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/schema-registry/config"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__schema-registry_config__subject_name_": {
      "name": "get /v2/databases/{database_cluster_uuid}/schema-registry/config/{subject_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/schema-registry/config/{subject_name}"
        }
      }
    },
    "get_v2_databases_metrics_credentials": {
      "name": "get /v2/databases/metrics/credentials",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/metrics/credentials"
        }
      }
    },
    "get_v2_databases__database_cluster_uuid__indexes": {
      "name": "get /v2/databases/{database_cluster_uuid}/indexes",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/databases/{database_cluster_uuid}/indexes"
        }
      }
    },
    "get_v2_dedicated-inferences__dedicated_inference_id_": {
      "name": "get /v2/dedicated-inferences/{dedicated_inference_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/dedicated-inferences/{dedicated_inference_id}"
        }
      }
    },
    "get_v2_dedicated-inferences": {
      "name": "get /v2/dedicated-inferences",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/dedicated-inferences"
        }
      }
    },
    "get_v2_dedicated-inferences__dedicated_inference_id__accelerators": {
      "name": "get /v2/dedicated-inferences/{dedicated_inference_id}/accelerators",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/dedicated-inferences/{dedicated_inference_id}/accelerators"
        }
      }
    },
    "get_v2_dedicated-inferences__dedicated_inference_id__accelerators__accelerator_id_": {
      "name": "get /v2/dedicated-inferences/{dedicated_inference_id}/accelerators/{accelerator_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/dedicated-inferences/{dedicated_inference_id}/accelerators/{accelerator_id}"
        }
      }
    },
    "get_v2_dedicated-inferences__dedicated_inference_id__ca": {
      "name": "get /v2/dedicated-inferences/{dedicated_inference_id}/ca",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/dedicated-inferences/{dedicated_inference_id}/ca"
        }
      }
    },
    "get_v2_dedicated-inferences__dedicated_inference_id__tokens": {
      "name": "get /v2/dedicated-inferences/{dedicated_inference_id}/tokens",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/dedicated-inferences/{dedicated_inference_id}/tokens"
        }
      }
    },
    "get_v2_dedicated-inferences_sizes": {
      "name": "get /v2/dedicated-inferences/sizes",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/dedicated-inferences/sizes"
        }
      }
    },
    "get_v2_dedicated-inferences_gpu-model-config": {
      "name": "get /v2/dedicated-inferences/gpu-model-config",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/dedicated-inferences/gpu-model-config"
        }
      }
    },
    "get_v2_domains": {
      "name": "get /v2/domains",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/domains"
        }
      }
    },
    "get_v2_domains__domain_name_": {
      "name": "get /v2/domains/{domain_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/domains/{domain_name}"
        }
      }
    },
    "get_v2_domains__domain_name__records": {
      "name": "get /v2/domains/{domain_name}/records",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/domains/{domain_name}/records"
        }
      }
    },
    "get_v2_domains__domain_name__records__domain_record_id_": {
      "name": "get /v2/domains/{domain_name}/records/{domain_record_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/domains/{domain_name}/records/{domain_record_id}"
        }
      }
    },
    "get_v2_droplets": {
      "name": "get /v2/droplets",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets"
        }
      }
    },
    "get_v2_droplets__droplet_id_": {
      "name": "get /v2/droplets/{droplet_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/{droplet_id}"
        }
      }
    },
    "get_v2_droplets__droplet_id__backups": {
      "name": "get /v2/droplets/{droplet_id}/backups",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/{droplet_id}/backups"
        }
      }
    },
    "get_v2_droplets__droplet_id__backups_policy": {
      "name": "get /v2/droplets/{droplet_id}/backups/policy",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/{droplet_id}/backups/policy"
        }
      }
    },
    "get_v2_droplets_backups_policies": {
      "name": "get /v2/droplets/backups/policies",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/backups/policies"
        }
      }
    },
    "get_v2_droplets_backups_supported_policies": {
      "name": "get /v2/droplets/backups/supported_policies",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/backups/supported_policies"
        }
      }
    },
    "get_v2_droplets__droplet_id__snapshots": {
      "name": "get /v2/droplets/{droplet_id}/snapshots",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/{droplet_id}/snapshots"
        }
      }
    },
    "get_v2_droplets__droplet_id__actions": {
      "name": "get /v2/droplets/{droplet_id}/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/{droplet_id}/actions"
        }
      }
    },
    "get_v2_droplets__droplet_id__actions__action_id_": {
      "name": "get /v2/droplets/{droplet_id}/actions/{action_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/{droplet_id}/actions/{action_id}"
        }
      }
    },
    "get_v2_droplets__droplet_id__kernels": {
      "name": "get /v2/droplets/{droplet_id}/kernels",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/{droplet_id}/kernels"
        }
      }
    },
    "get_v2_droplets__droplet_id__firewalls": {
      "name": "get /v2/droplets/{droplet_id}/firewalls",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/{droplet_id}/firewalls"
        }
      }
    },
    "get_v2_droplets__droplet_id__neighbors": {
      "name": "get /v2/droplets/{droplet_id}/neighbors",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/{droplet_id}/neighbors"
        }
      }
    },
    "get_v2_droplets__droplet_id__destroy_with_associated_resources": {
      "name": "get /v2/droplets/{droplet_id}/destroy_with_associated_resources",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/{droplet_id}/destroy_with_associated_resources"
        }
      }
    },
    "get_v2_droplets__droplet_id__destroy_with_associated_resources_status": {
      "name": "get /v2/droplets/{droplet_id}/destroy_with_associated_resources/status",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/{droplet_id}/destroy_with_associated_resources/status"
        }
      }
    },
    "get_v2_droplets_autoscale": {
      "name": "get /v2/droplets/autoscale",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/autoscale"
        }
      }
    },
    "get_v2_droplets_autoscale__autoscale_pool_id_": {
      "name": "get /v2/droplets/autoscale/{autoscale_pool_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/autoscale/{autoscale_pool_id}"
        }
      }
    },
    "get_v2_droplets_autoscale__autoscale_pool_id__members": {
      "name": "get /v2/droplets/autoscale/{autoscale_pool_id}/members",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/autoscale/{autoscale_pool_id}/members"
        }
      }
    },
    "get_v2_droplets_autoscale__autoscale_pool_id__history": {
      "name": "get /v2/droplets/autoscale/{autoscale_pool_id}/history",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/droplets/autoscale/{autoscale_pool_id}/history"
        }
      }
    },
    "get_v2_firewalls": {
      "name": "get /v2/firewalls",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/firewalls"
        }
      }
    },
    "get_v2_firewalls__firewall_id_": {
      "name": "get /v2/firewalls/{firewall_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/firewalls/{firewall_id}"
        }
      }
    },
    "get_v2_floating_ips": {
      "name": "get /v2/floating_ips",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/floating_ips"
        }
      }
    },
    "get_v2_floating_ips__floating_ip_": {
      "name": "get /v2/floating_ips/{floating_ip}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/floating_ips/{floating_ip}"
        }
      }
    },
    "get_v2_floating_ips__floating_ip__actions": {
      "name": "get /v2/floating_ips/{floating_ip}/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/floating_ips/{floating_ip}/actions"
        }
      }
    },
    "get_v2_floating_ips__floating_ip__actions__action_id_": {
      "name": "get /v2/floating_ips/{floating_ip}/actions/{action_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/floating_ips/{floating_ip}/actions/{action_id}"
        }
      }
    },
    "get_v2_functions_namespaces": {
      "name": "get /v2/functions/namespaces",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/functions/namespaces"
        }
      }
    },
    "get_v2_functions_namespaces__namespace_id_": {
      "name": "get /v2/functions/namespaces/{namespace_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/functions/namespaces/{namespace_id}"
        }
      }
    },
    "get_v2_functions_namespaces__namespace_id__triggers": {
      "name": "get /v2/functions/namespaces/{namespace_id}/triggers",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/functions/namespaces/{namespace_id}/triggers"
        }
      }
    },
    "get_v2_functions_namespaces__namespace_id__triggers__trigger_name_": {
      "name": "get /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}"
        }
      }
    },
    "get_v2_functions_namespaces__namespace_id__keys": {
      "name": "get /v2/functions/namespaces/{namespace_id}/keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/functions/namespaces/{namespace_id}/keys"
        }
      }
    },
    "get_v2_images": {
      "name": "get /v2/images",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/images"
        }
      }
    },
    "get_v2_images__image_id_": {
      "name": "get /v2/images/{image_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/images/{image_id}"
        }
      }
    },
    "get_v2_images__image_id__actions": {
      "name": "get /v2/images/{image_id}/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/images/{image_id}/actions"
        }
      }
    },
    "get_v2_images__image_id__actions__action_id_": {
      "name": "get /v2/images/{image_id}/actions/{action_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/images/{image_id}/actions/{action_id}"
        }
      }
    },
    "get_v2_kubernetes_clusters": {
      "name": "get /v2/kubernetes/clusters",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/kubernetes/clusters"
        }
      }
    },
    "get_v2_kubernetes_clusters__cluster_id_": {
      "name": "get /v2/kubernetes/clusters/{cluster_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/kubernetes/clusters/{cluster_id}"
        }
      }
    },
    "get_v2_kubernetes_clusters__cluster_id__destroy_with_associated_resources": {
      "name": "get /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources"
        }
      }
    },
    "get_v2_kubernetes_clusters__cluster_id__kubeconfig": {
      "name": "get /v2/kubernetes/clusters/{cluster_id}/kubeconfig",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/kubernetes/clusters/{cluster_id}/kubeconfig"
        }
      }
    },
    "get_v2_kubernetes_clusters__cluster_id__credentials": {
      "name": "get /v2/kubernetes/clusters/{cluster_id}/credentials",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/kubernetes/clusters/{cluster_id}/credentials"
        }
      }
    },
    "get_v2_kubernetes_clusters__cluster_id__upgrades": {
      "name": "get /v2/kubernetes/clusters/{cluster_id}/upgrades",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/kubernetes/clusters/{cluster_id}/upgrades"
        }
      }
    },
    "get_v2_kubernetes_clusters__cluster_id__node_pools": {
      "name": "get /v2/kubernetes/clusters/{cluster_id}/node_pools",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/kubernetes/clusters/{cluster_id}/node_pools"
        }
      }
    },
    "get_v2_kubernetes_clusters__cluster_id__node_pools__node_pool_id_": {
      "name": "get /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}"
        }
      }
    },
    "get_v2_kubernetes_clusters__cluster_id__user": {
      "name": "get /v2/kubernetes/clusters/{cluster_id}/user",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/kubernetes/clusters/{cluster_id}/user"
        }
      }
    },
    "get_v2_kubernetes_options": {
      "name": "get /v2/kubernetes/options",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/kubernetes/options"
        }
      }
    },
    "get_v2_kubernetes_clusters__cluster_id__clusterlint": {
      "name": "get /v2/kubernetes/clusters/{cluster_id}/clusterlint",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/kubernetes/clusters/{cluster_id}/clusterlint"
        }
      }
    },
    "get_v2_kubernetes_clusters__cluster_id__status_messages": {
      "name": "get /v2/kubernetes/clusters/{cluster_id}/status_messages",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/kubernetes/clusters/{cluster_id}/status_messages"
        }
      }
    },
    "get_v2_load_balancers": {
      "name": "get /v2/load_balancers",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/load_balancers"
        }
      }
    },
    "get_v2_load_balancers__lb_id_": {
      "name": "get /v2/load_balancers/{lb_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/load_balancers/{lb_id}"
        }
      }
    },
    "get_v2_monitoring_alerts": {
      "name": "get /v2/monitoring/alerts",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/alerts"
        }
      }
    },
    "get_v2_monitoring_alerts__alert_uuid_": {
      "name": "get /v2/monitoring/alerts/{alert_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/alerts/{alert_uuid}"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_bandwidth": {
      "name": "get /v2/monitoring/metrics/droplet/bandwidth",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet/bandwidth"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_cpu": {
      "name": "get /v2/monitoring/metrics/droplet/cpu",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet/cpu"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_filesystem_free": {
      "name": "get /v2/monitoring/metrics/droplet/filesystem_free",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet/filesystem_free"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_filesystem_size": {
      "name": "get /v2/monitoring/metrics/droplet/filesystem_size",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet/filesystem_size"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_load_1": {
      "name": "get /v2/monitoring/metrics/droplet/load_1",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet/load_1"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_load_5": {
      "name": "get /v2/monitoring/metrics/droplet/load_5",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet/load_5"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_load_15": {
      "name": "get /v2/monitoring/metrics/droplet/load_15",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet/load_15"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_memory_cached": {
      "name": "get /v2/monitoring/metrics/droplet/memory_cached",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet/memory_cached"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_memory_free": {
      "name": "get /v2/monitoring/metrics/droplet/memory_free",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet/memory_free"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_memory_total": {
      "name": "get /v2/monitoring/metrics/droplet/memory_total",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet/memory_total"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_memory_available": {
      "name": "get /v2/monitoring/metrics/droplet/memory_available",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet/memory_available"
        }
      }
    },
    "get_v2_monitoring_metrics_apps_memory_percentage": {
      "name": "get /v2/monitoring/metrics/apps/memory_percentage",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/apps/memory_percentage"
        }
      }
    },
    "get_v2_monitoring_metrics_apps_cpu_percentage": {
      "name": "get /v2/monitoring/metrics/apps/cpu_percentage",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/apps/cpu_percentage"
        }
      }
    },
    "get_v2_monitoring_metrics_apps_restart_count": {
      "name": "get /v2/monitoring/metrics/apps/restart_count",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/apps/restart_count"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_connections_current": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_connections_current",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_connections_current"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_connections_limit": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_connections_limit",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_connections_limit"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_cpu_utilization": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_cpu_utilization",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_cpu_utilization"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_firewall_dropped_bytes": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_firewall_dropped_bytes",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_firewall_dropped_bytes"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_firewall_dropped_packets": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_firewall_dropped_packets",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_firewall_dropped_packets"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_http_responses": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_http_responses",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_http_responses"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_http_requests_per_second": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_http_requests_per_second",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_http_requests_per_second"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_network_throughput_http": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_network_throughput_http",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_network_throughput_http"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_network_throughput_udp": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_network_throughput_udp",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_network_throughput_udp"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_network_throughput_tcp": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_network_throughput_tcp",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_network_throughput_tcp"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_nlb_tcp_network_throughput": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_nlb_tcp_network_throughput",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_nlb_tcp_network_throughput"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_nlb_udp_network_throughput": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_nlb_udp_network_throughput",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_nlb_udp_network_throughput"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_tls_connections_current": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_tls_connections_current",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_tls_connections_current"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_tls_connections_limit": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_tls_connections_limit",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_tls_connections_limit"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_frontend_tls_connections_exceeding_rate_limit": {
      "name": "get /v2/monitoring/metrics/load_balancer/frontend_tls_connections_exceeding_rate_limit",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/frontend_tls_connections_exceeding_rate_limit"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_droplets_http_session_duration_avg": {
      "name": "get /v2/monitoring/metrics/load_balancer/droplets_http_session_duration_avg",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/droplets_http_session_duration_avg"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_droplets_http_session_duration_50p": {
      "name": "get /v2/monitoring/metrics/load_balancer/droplets_http_session_duration_50p",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/droplets_http_session_duration_50p"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_droplets_http_session_duration_95p": {
      "name": "get /v2/monitoring/metrics/load_balancer/droplets_http_session_duration_95p",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/droplets_http_session_duration_95p"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_droplets_http_response_time_avg": {
      "name": "get /v2/monitoring/metrics/load_balancer/droplets_http_response_time_avg",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/droplets_http_response_time_avg"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_droplets_http_response_time_50p": {
      "name": "get /v2/monitoring/metrics/load_balancer/droplets_http_response_time_50p",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/droplets_http_response_time_50p"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_droplets_http_response_time_95p": {
      "name": "get /v2/monitoring/metrics/load_balancer/droplets_http_response_time_95p",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/droplets_http_response_time_95p"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_droplets_http_response_time_99p": {
      "name": "get /v2/monitoring/metrics/load_balancer/droplets_http_response_time_99p",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/droplets_http_response_time_99p"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_droplets_queue_size": {
      "name": "get /v2/monitoring/metrics/load_balancer/droplets_queue_size",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/droplets_queue_size"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_droplets_http_responses": {
      "name": "get /v2/monitoring/metrics/load_balancer/droplets_http_responses",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/droplets_http_responses"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_droplets_connections": {
      "name": "get /v2/monitoring/metrics/load_balancer/droplets_connections",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/droplets_connections"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_droplets_health_checks": {
      "name": "get /v2/monitoring/metrics/load_balancer/droplets_health_checks",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/droplets_health_checks"
        }
      }
    },
    "get_v2_monitoring_metrics_load_balancer_droplets_downtime": {
      "name": "get /v2/monitoring/metrics/load_balancer/droplets_downtime",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/load_balancer/droplets_downtime"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_autoscale_current_instances": {
      "name": "get /v2/monitoring/metrics/droplet_autoscale/current_instances",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet_autoscale/current_instances"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_autoscale_target_instances": {
      "name": "get /v2/monitoring/metrics/droplet_autoscale/target_instances",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet_autoscale/target_instances"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_autoscale_current_cpu_utilization": {
      "name": "get /v2/monitoring/metrics/droplet_autoscale/current_cpu_utilization",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet_autoscale/current_cpu_utilization"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_autoscale_target_cpu_utilization": {
      "name": "get /v2/monitoring/metrics/droplet_autoscale/target_cpu_utilization",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet_autoscale/target_cpu_utilization"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_autoscale_current_memory_utilization": {
      "name": "get /v2/monitoring/metrics/droplet_autoscale/current_memory_utilization",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet_autoscale/current_memory_utilization"
        }
      }
    },
    "get_v2_monitoring_metrics_droplet_autoscale_target_memory_utilization": {
      "name": "get /v2/monitoring/metrics/droplet_autoscale/target_memory_utilization",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/droplet_autoscale/target_memory_utilization"
        }
      }
    },
    "get_v2_monitoring_metrics_database_mysql_cpu_usage": {
      "name": "get /v2/monitoring/metrics/database/mysql/cpu_usage",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/database/mysql/cpu_usage"
        }
      }
    },
    "get_v2_monitoring_metrics_database_mysql_load": {
      "name": "get /v2/monitoring/metrics/database/mysql/load",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/database/mysql/load"
        }
      }
    },
    "get_v2_monitoring_metrics_database_mysql_memory_usage": {
      "name": "get /v2/monitoring/metrics/database/mysql/memory_usage",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/database/mysql/memory_usage"
        }
      }
    },
    "get_v2_monitoring_metrics_database_mysql_disk_usage": {
      "name": "get /v2/monitoring/metrics/database/mysql/disk_usage",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/database/mysql/disk_usage"
        }
      }
    },
    "get_v2_monitoring_metrics_database_mysql_threads_connected": {
      "name": "get /v2/monitoring/metrics/database/mysql/threads_connected",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/database/mysql/threads_connected"
        }
      }
    },
    "get_v2_monitoring_metrics_database_mysql_threads_created_rate": {
      "name": "get /v2/monitoring/metrics/database/mysql/threads_created_rate",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/database/mysql/threads_created_rate"
        }
      }
    },
    "get_v2_monitoring_metrics_database_mysql_threads_active": {
      "name": "get /v2/monitoring/metrics/database/mysql/threads_active",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/database/mysql/threads_active"
        }
      }
    },
    "get_v2_monitoring_metrics_database_mysql_index_vs_sequential_reads": {
      "name": "get /v2/monitoring/metrics/database/mysql/index_vs_sequential_reads",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/database/mysql/index_vs_sequential_reads"
        }
      }
    },
    "get_v2_monitoring_metrics_database_mysql_op_rates": {
      "name": "get /v2/monitoring/metrics/database/mysql/op_rates",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/database/mysql/op_rates"
        }
      }
    },
    "get_v2_monitoring_metrics_database_mysql_schema_throughput": {
      "name": "get /v2/monitoring/metrics/database/mysql/schema_throughput",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/database/mysql/schema_throughput"
        }
      }
    },
    "get_v2_monitoring_metrics_database_mysql_schema_latency": {
      "name": "get /v2/monitoring/metrics/database/mysql/schema_latency",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/metrics/database/mysql/schema_latency"
        }
      }
    },
    "get_v2_monitoring_sinks_destinations": {
      "name": "get /v2/monitoring/sinks/destinations",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/sinks/destinations"
        }
      }
    },
    "get_v2_monitoring_sinks_destinations__destination_uuid_": {
      "name": "get /v2/monitoring/sinks/destinations/{destination_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/sinks/destinations/{destination_uuid}"
        }
      }
    },
    "get_v2_monitoring_sinks": {
      "name": "get /v2/monitoring/sinks",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/sinks"
        }
      }
    },
    "get_v2_monitoring_sinks__sink_uuid_": {
      "name": "get /v2/monitoring/sinks/{sink_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/monitoring/sinks/{sink_uuid}"
        }
      }
    },
    "get_v2_nfs": {
      "name": "get /v2/nfs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/nfs"
        }
      }
    },
    "get_v2_nfs__nfs_id_": {
      "name": "get /v2/nfs/{nfs_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/nfs/{nfs_id}"
        }
      }
    },
    "get_v2_nfs_snapshots": {
      "name": "get /v2/nfs/snapshots",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/nfs/snapshots"
        }
      }
    },
    "get_v2_nfs_snapshots__nfs_snapshot_id_": {
      "name": "get /v2/nfs/snapshots/{nfs_snapshot_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/nfs/snapshots/{nfs_snapshot_id}"
        }
      }
    },
    "get_v2_partner_network_connect_attachments": {
      "name": "get /v2/partner_network_connect/attachments",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/partner_network_connect/attachments"
        }
      }
    },
    "get_v2_partner_network_connect_attachments__pa_id_": {
      "name": "get /v2/partner_network_connect/attachments/{pa_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/partner_network_connect/attachments/{pa_id}"
        }
      }
    },
    "get_v2_partner_network_connect_attachments__pa_id__bgp_auth_key": {
      "name": "get /v2/partner_network_connect/attachments/{pa_id}/bgp_auth_key",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/partner_network_connect/attachments/{pa_id}/bgp_auth_key"
        }
      }
    },
    "get_v2_partner_network_connect_attachments__pa_id__remote_routes": {
      "name": "get /v2/partner_network_connect/attachments/{pa_id}/remote_routes",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/partner_network_connect/attachments/{pa_id}/remote_routes"
        }
      }
    },
    "get_v2_partner_network_connect_attachments__pa_id__service_key": {
      "name": "get /v2/partner_network_connect/attachments/{pa_id}/service_key",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/partner_network_connect/attachments/{pa_id}/service_key"
        }
      }
    },
    "get_v2_projects": {
      "name": "get /v2/projects",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/projects"
        }
      }
    },
    "get_v2_projects_default": {
      "name": "get /v2/projects/default",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/projects/default"
        }
      }
    },
    "get_v2_projects__project_id_": {
      "name": "get /v2/projects/{project_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/projects/{project_id}"
        }
      }
    },
    "get_v2_projects__project_id__resources": {
      "name": "get /v2/projects/{project_id}/resources",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/projects/{project_id}/resources"
        }
      }
    },
    "get_v2_projects_default_resources": {
      "name": "get /v2/projects/default/resources",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/projects/default/resources"
        }
      }
    },
    "get_v2_regions": {
      "name": "get /v2/regions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/regions"
        }
      }
    },
    "get_v2_registries": {
      "name": "get /v2/registries",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registries"
        }
      }
    },
    "get_v2_registries__registry_name_": {
      "name": "get /v2/registries/{registry_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registries/{registry_name}"
        }
      }
    },
    "get_v2_registries__registry_name__docker-credentials": {
      "name": "get /v2/registries/{registry_name}/docker-credentials",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registries/{registry_name}/docker-credentials"
        }
      }
    },
    "get_v2_registries_subscription": {
      "name": "get /v2/registries/subscription",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registries/subscription"
        }
      }
    },
    "get_v2_registries_options": {
      "name": "get /v2/registries/options",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registries/options"
        }
      }
    },
    "get_v2_registries__registry_name__garbage-collection": {
      "name": "get /v2/registries/{registry_name}/garbage-collection",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registries/{registry_name}/garbage-collection"
        }
      }
    },
    "get_v2_registries__registry_name__garbage-collections": {
      "name": "get /v2/registries/{registry_name}/garbage-collections",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registries/{registry_name}/garbage-collections"
        }
      }
    },
    "get_v2_registries__registry_name__repositoriesV2": {
      "name": "get /v2/registries/{registry_name}/repositoriesV2",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registries/{registry_name}/repositoriesV2"
        }
      }
    },
    "get_v2_registries__registry_name__repositories__repository_name__tags": {
      "name": "get /v2/registries/{registry_name}/repositories/{repository_name}/tags",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registries/{registry_name}/repositories/{repository_name}/tags"
        }
      }
    },
    "get_v2_registries__registry_name__repositories__repository_name__digests": {
      "name": "get /v2/registries/{registry_name}/repositories/{repository_name}/digests",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registries/{registry_name}/repositories/{repository_name}/digests"
        }
      }
    },
    "get_v2_registry": {
      "name": "get /v2/registry",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registry"
        }
      }
    },
    "get_v2_registry_subscription": {
      "name": "get /v2/registry/subscription",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registry/subscription"
        }
      }
    },
    "get_v2_registry_docker-credentials": {
      "name": "get /v2/registry/docker-credentials",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registry/docker-credentials"
        }
      }
    },
    "get_v2_registry__registry_name__repositories": {
      "name": "get /v2/registry/{registry_name}/repositories",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registry/{registry_name}/repositories"
        }
      }
    },
    "get_v2_registry__registry_name__repositoriesV2": {
      "name": "get /v2/registry/{registry_name}/repositoriesV2",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registry/{registry_name}/repositoriesV2"
        }
      }
    },
    "get_v2_registry__registry_name__repositories__repository_name__tags": {
      "name": "get /v2/registry/{registry_name}/repositories/{repository_name}/tags",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registry/{registry_name}/repositories/{repository_name}/tags"
        }
      }
    },
    "get_v2_registry__registry_name__repositories__repository_name__digests": {
      "name": "get /v2/registry/{registry_name}/repositories/{repository_name}/digests",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registry/{registry_name}/repositories/{repository_name}/digests"
        }
      }
    },
    "get_v2_registry__registry_name__garbage-collection": {
      "name": "get /v2/registry/{registry_name}/garbage-collection",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registry/{registry_name}/garbage-collection"
        }
      }
    },
    "get_v2_registry__registry_name__garbage-collections": {
      "name": "get /v2/registry/{registry_name}/garbage-collections",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registry/{registry_name}/garbage-collections"
        }
      }
    },
    "get_v2_registry_options": {
      "name": "get /v2/registry/options",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/registry/options"
        }
      }
    },
    "get_v2_reports_droplet_neighbors_ids": {
      "name": "get /v2/reports/droplet_neighbors_ids",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/reports/droplet_neighbors_ids"
        }
      }
    },
    "get_v2_reserved_ips": {
      "name": "get /v2/reserved_ips",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/reserved_ips"
        }
      }
    },
    "get_v2_reserved_ips__reserved_ip_": {
      "name": "get /v2/reserved_ips/{reserved_ip}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/reserved_ips/{reserved_ip}"
        }
      }
    },
    "get_v2_reserved_ips__reserved_ip__actions": {
      "name": "get /v2/reserved_ips/{reserved_ip}/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/reserved_ips/{reserved_ip}/actions"
        }
      }
    },
    "get_v2_reserved_ips__reserved_ip__actions__action_id_": {
      "name": "get /v2/reserved_ips/{reserved_ip}/actions/{action_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/reserved_ips/{reserved_ip}/actions/{action_id}"
        }
      }
    },
    "get_v2_reserved_ipv6": {
      "name": "get /v2/reserved_ipv6",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/reserved_ipv6"
        }
      }
    },
    "get_v2_reserved_ipv6__reserved_ipv6_": {
      "name": "get /v2/reserved_ipv6/{reserved_ipv6}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/reserved_ipv6/{reserved_ipv6}"
        }
      }
    },
    "get_v2_byoip_prefixes": {
      "name": "get /v2/byoip_prefixes",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/byoip_prefixes"
        }
      }
    },
    "get_v2_byoip_prefixes__byoip_prefix_uuid_": {
      "name": "get /v2/byoip_prefixes/{byoip_prefix_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/byoip_prefixes/{byoip_prefix_uuid}"
        }
      }
    },
    "get_v2_byoip_prefixes__byoip_prefix_uuid__ips": {
      "name": "get /v2/byoip_prefixes/{byoip_prefix_uuid}/ips",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/byoip_prefixes/{byoip_prefix_uuid}/ips"
        }
      }
    },
    "get_v2_security_scans": {
      "name": "get /v2/security/scans",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/security/scans"
        }
      }
    },
    "get_v2_security_scans__scan_id_": {
      "name": "get /v2/security/scans/{scan_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/security/scans/{scan_id}"
        }
      }
    },
    "get_v2_security_scans_latest": {
      "name": "get /v2/security/scans/latest",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/security/scans/latest"
        }
      }
    },
    "get_v2_security_scans__scan_id__findings__finding_uuid__affected_resources": {
      "name": "get /v2/security/scans/{scan_id}/findings/{finding_uuid}/affected_resources",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/security/scans/{scan_id}/findings/{finding_uuid}/affected_resources"
        }
      }
    },
    "get_v2_security_settings": {
      "name": "get /v2/security/settings",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/security/settings"
        }
      }
    },
    "get_v2_sizes": {
      "name": "get /v2/sizes",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/sizes"
        }
      }
    },
    "get_v2_snapshots": {
      "name": "get /v2/snapshots",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/snapshots"
        }
      }
    },
    "get_v2_snapshots__snapshot_id_": {
      "name": "get /v2/snapshots/{snapshot_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/snapshots/{snapshot_id}"
        }
      }
    },
    "get_v2_spaces_keys": {
      "name": "get /v2/spaces/keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/spaces/keys"
        }
      }
    },
    "get_v2_spaces_keys__access_key_": {
      "name": "get /v2/spaces/keys/{access_key}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/spaces/keys/{access_key}"
        }
      }
    },
    "get_v2_tags": {
      "name": "get /v2/tags",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/tags"
        }
      }
    },
    "get_v2_tags__tag_id_": {
      "name": "get /v2/tags/{tag_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/tags/{tag_id}"
        }
      }
    },
    "get_v2_volumes": {
      "name": "get /v2/volumes",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/volumes"
        }
      }
    },
    "get_v2_volumes_snapshots__snapshot_id_": {
      "name": "get /v2/volumes/snapshots/{snapshot_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/volumes/snapshots/{snapshot_id}"
        }
      }
    },
    "get_v2_volumes__volume_id_": {
      "name": "get /v2/volumes/{volume_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/volumes/{volume_id}"
        }
      }
    },
    "get_v2_volumes__volume_id__actions": {
      "name": "get /v2/volumes/{volume_id}/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/volumes/{volume_id}/actions"
        }
      }
    },
    "get_v2_volumes__volume_id__actions__action_id_": {
      "name": "get /v2/volumes/{volume_id}/actions/{action_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/volumes/{volume_id}/actions/{action_id}"
        }
      }
    },
    "get_v2_volumes__volume_id__snapshots": {
      "name": "get /v2/volumes/{volume_id}/snapshots",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/volumes/{volume_id}/snapshots"
        }
      }
    },
    "get_v2_vpcs": {
      "name": "get /v2/vpcs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/vpcs"
        }
      }
    },
    "get_v2_vpcs__vpc_id_": {
      "name": "get /v2/vpcs/{vpc_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/vpcs/{vpc_id}"
        }
      }
    },
    "get_v2_vpcs__vpc_id__members": {
      "name": "get /v2/vpcs/{vpc_id}/members",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/vpcs/{vpc_id}/members"
        }
      }
    },
    "get_v2_vpcs__vpc_id__peerings": {
      "name": "get /v2/vpcs/{vpc_id}/peerings",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/vpcs/{vpc_id}/peerings"
        }
      }
    },
    "get_v2_vpc_peerings": {
      "name": "get /v2/vpc_peerings",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/vpc_peerings"
        }
      }
    },
    "get_v2_vpc_peerings__vpc_peering_id_": {
      "name": "get /v2/vpc_peerings/{vpc_peering_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/vpc_peerings/{vpc_peering_id}"
        }
      }
    },
    "get_v2_vpc_nat_gateways": {
      "name": "get /v2/vpc_nat_gateways",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/vpc_nat_gateways"
        }
      }
    },
    "get_v2_vpc_nat_gateways__id_": {
      "name": "get /v2/vpc_nat_gateways/{id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/vpc_nat_gateways/{id}"
        }
      }
    },
    "get_v2_uptime_checks": {
      "name": "get /v2/uptime/checks",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/uptime/checks"
        }
      }
    },
    "get_v2_uptime_checks__check_id_": {
      "name": "get /v2/uptime/checks/{check_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/uptime/checks/{check_id}"
        }
      }
    },
    "get_v2_uptime_checks__check_id__state": {
      "name": "get /v2/uptime/checks/{check_id}/state",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/uptime/checks/{check_id}/state"
        }
      }
    },
    "get_v2_uptime_checks__check_id__alerts": {
      "name": "get /v2/uptime/checks/{check_id}/alerts",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/uptime/checks/{check_id}/alerts"
        }
      }
    },
    "get_v2_uptime_checks__check_id__alerts__alert_id_": {
      "name": "get /v2/uptime/checks/{check_id}/alerts/{alert_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/uptime/checks/{check_id}/alerts/{alert_id}"
        }
      }
    },
    "get_v2_gen-ai_agents": {
      "name": "get /v2/gen-ai/agents",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/agents"
        }
      }
    },
    "get_v2_gen-ai_agents__agent_uuid__api_keys": {
      "name": "get /v2/gen-ai/agents/{agent_uuid}/api_keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/agents/{agent_uuid}/api_keys"
        }
      }
    },
    "get_v2_gen-ai_agents__uuid_": {
      "name": "get /v2/gen-ai/agents/{uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/agents/{uuid}"
        }
      }
    },
    "get_v2_gen-ai_agents__uuid__child_agents": {
      "name": "get /v2/gen-ai/agents/{uuid}/child_agents",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/agents/{uuid}/child_agents"
        }
      }
    },
    "get_v2_gen-ai_agents__uuid__usage": {
      "name": "get /v2/gen-ai/agents/{uuid}/usage",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/agents/{uuid}/usage"
        }
      }
    },
    "get_v2_gen-ai_agents__uuid__versions": {
      "name": "get /v2/gen-ai/agents/{uuid}/versions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/agents/{uuid}/versions"
        }
      }
    },
    "get_v2_gen-ai_anthropic_keys": {
      "name": "get /v2/gen-ai/anthropic/keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/anthropic/keys"
        }
      }
    },
    "get_v2_gen-ai_anthropic_keys__api_key_uuid_": {
      "name": "get /v2/gen-ai/anthropic/keys/{api_key_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/anthropic/keys/{api_key_uuid}"
        }
      }
    },
    "get_v2_gen-ai_anthropic_keys__uuid__agents": {
      "name": "get /v2/gen-ai/anthropic/keys/{uuid}/agents",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/anthropic/keys/{uuid}/agents"
        }
      }
    },
    "get_v2_gen-ai_custom_models": {
      "name": "get /v2/gen-ai/custom_models",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/custom_models"
        }
      }
    },
    "get_v2_gen-ai_evaluation_datasets__dataset_uuid__download_url": {
      "name": "get /v2/gen-ai/evaluation_datasets/{dataset_uuid}/download_url",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/evaluation_datasets/{dataset_uuid}/download_url"
        }
      }
    },
    "get_v2_gen-ai_evaluation_metrics": {
      "name": "get /v2/gen-ai/evaluation_metrics",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/evaluation_metrics"
        }
      }
    },
    "get_v2_gen-ai_evaluation_runs__evaluation_run_uuid_": {
      "name": "get /v2/gen-ai/evaluation_runs/{evaluation_run_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/evaluation_runs/{evaluation_run_uuid}"
        }
      }
    },
    "get_v2_gen-ai_evaluation_runs__evaluation_run_uuid__results": {
      "name": "get /v2/gen-ai/evaluation_runs/{evaluation_run_uuid}/results",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/evaluation_runs/{evaluation_run_uuid}/results"
        }
      }
    },
    "get_v2_gen-ai_evaluation_runs__evaluation_run_uuid__results__prompt_id_": {
      "name": "get /v2/gen-ai/evaluation_runs/{evaluation_run_uuid}/results/{prompt_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/evaluation_runs/{evaluation_run_uuid}/results/{prompt_id}"
        }
      }
    },
    "get_v2_gen-ai_evaluation_test_cases": {
      "name": "get /v2/gen-ai/evaluation_test_cases",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/evaluation_test_cases"
        }
      }
    },
    "get_v2_gen-ai_evaluation_test_cases__evaluation_test_case_uuid__evaluation_runs": {
      "name": "get /v2/gen-ai/evaluation_test_cases/{evaluation_test_case_uuid}/evaluation_runs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/evaluation_test_cases/{evaluation_test_case_uuid}/evaluation_runs"
        }
      }
    },
    "get_v2_gen-ai_evaluation_test_cases__test_case_uuid_": {
      "name": "get /v2/gen-ai/evaluation_test_cases/{test_case_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/evaluation_test_cases/{test_case_uuid}"
        }
      }
    },
    "get_v2_gen-ai_indexing_jobs": {
      "name": "get /v2/gen-ai/indexing_jobs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/indexing_jobs"
        }
      }
    },
    "get_v2_gen-ai_indexing_jobs__indexing_job_uuid__data_sources": {
      "name": "get /v2/gen-ai/indexing_jobs/{indexing_job_uuid}/data_sources",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/indexing_jobs/{indexing_job_uuid}/data_sources"
        }
      }
    },
    "get_v2_gen-ai_indexing_jobs__indexing_job_uuid__details_signed_url": {
      "name": "get /v2/gen-ai/indexing_jobs/{indexing_job_uuid}/details_signed_url",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/indexing_jobs/{indexing_job_uuid}/details_signed_url"
        }
      }
    },
    "get_v2_gen-ai_indexing_jobs__uuid_": {
      "name": "get /v2/gen-ai/indexing_jobs/{uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/indexing_jobs/{uuid}"
        }
      }
    },
    "get_v2_gen-ai_knowledge_bases": {
      "name": "get /v2/gen-ai/knowledge_bases",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/knowledge_bases"
        }
      }
    },
    "get_v2_gen-ai_knowledge_bases__knowledge_base_uuid__data_sources": {
      "name": "get /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources"
        }
      }
    },
    "get_v2_gen-ai_knowledge_bases__knowledge_base_uuid__indexing_jobs": {
      "name": "get /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/indexing_jobs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/indexing_jobs"
        }
      }
    },
    "get_v2_gen-ai_knowledge_bases__uuid_": {
      "name": "get /v2/gen-ai/knowledge_bases/{uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/knowledge_bases/{uuid}"
        }
      }
    },
    "get_v2_gen-ai_model_evaluation_metrics": {
      "name": "get /v2/gen-ai/model_evaluation_metrics",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/model_evaluation_metrics"
        }
      }
    },
    "get_v2_gen-ai_model_evaluation_runs": {
      "name": "get /v2/gen-ai/model_evaluation_runs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/model_evaluation_runs"
        }
      }
    },
    "get_v2_gen-ai_model_evaluation_runs__eval_run_uuid_": {
      "name": "get /v2/gen-ai/model_evaluation_runs/{eval_run_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/model_evaluation_runs/{eval_run_uuid}"
        }
      }
    },
    "get_v2_gen-ai_model_evaluation_runs__eval_run_uuid__results_download_url": {
      "name": "get /v2/gen-ai/model_evaluation_runs/{eval_run_uuid}/results/download_url",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/model_evaluation_runs/{eval_run_uuid}/results/download_url"
        }
      }
    },
    "get_v2_gen-ai_models": {
      "name": "get /v2/gen-ai/models",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/models"
        }
      }
    },
    "get_v2_gen-ai_models_api_keys": {
      "name": "get /v2/gen-ai/models/api_keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/models/api_keys"
        }
      }
    },
    "get_v2_gen-ai_models_catalog": {
      "name": "get /v2/gen-ai/models/catalog",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/models/catalog"
        }
      }
    },
    "get_v2_gen-ai_models_catalog__id_": {
      "name": "get /v2/gen-ai/models/catalog/{id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/models/catalog/{id}"
        }
      }
    },
    "get_v2_gen-ai_models_routers": {
      "name": "get /v2/gen-ai/models/routers",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/models/routers"
        }
      }
    },
    "get_v2_gen-ai_models_routers_presets": {
      "name": "get /v2/gen-ai/models/routers/presets",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/models/routers/presets"
        }
      }
    },
    "get_v2_gen-ai_models_routers_tasks_presets": {
      "name": "get /v2/gen-ai/models/routers/tasks/presets",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/models/routers/tasks/presets"
        }
      }
    },
    "get_v2_gen-ai_models_routers__uuid_": {
      "name": "get /v2/gen-ai/models/routers/{uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/models/routers/{uuid}"
        }
      }
    },
    "get_v2_gen-ai_oauth2_url": {
      "name": "get /v2/gen-ai/oauth2/url",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/oauth2/url"
        }
      }
    },
    "get_v2_gen-ai_openai_keys": {
      "name": "get /v2/gen-ai/openai/keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/openai/keys"
        }
      }
    },
    "get_v2_gen-ai_openai_keys__api_key_uuid_": {
      "name": "get /v2/gen-ai/openai/keys/{api_key_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/openai/keys/{api_key_uuid}"
        }
      }
    },
    "get_v2_gen-ai_openai_keys__uuid__agents": {
      "name": "get /v2/gen-ai/openai/keys/{uuid}/agents",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/openai/keys/{uuid}/agents"
        }
      }
    },
    "get_v2_gen-ai_regions": {
      "name": "get /v2/gen-ai/regions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/regions"
        }
      }
    },
    "get_v2_gen-ai_scheduled-indexing_knowledge-base__knowledge_base_uuid_": {
      "name": "get /v2/gen-ai/scheduled-indexing/knowledge-base/{knowledge_base_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/scheduled-indexing/knowledge-base/{knowledge_base_uuid}"
        }
      }
    },
    "get_v2_gen-ai_workspaces": {
      "name": "get /v2/gen-ai/workspaces",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/workspaces"
        }
      }
    },
    "get_v2_gen-ai_workspaces__workspace_uuid_": {
      "name": "get /v2/gen-ai/workspaces/{workspace_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/workspaces/{workspace_uuid}"
        }
      }
    },
    "get_v2_gen-ai_workspaces__workspace_uuid__agents": {
      "name": "get /v2/gen-ai/workspaces/{workspace_uuid}/agents",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/workspaces/{workspace_uuid}/agents"
        }
      }
    },
    "get_v2_gen-ai_workspaces__workspace_uuid__evaluation_test_cases": {
      "name": "get /v2/gen-ai/workspaces/{workspace_uuid}/evaluation_test_cases",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/gen-ai/workspaces/{workspace_uuid}/evaluation_test_cases"
        }
      }
    },
    "get_v1_models": {
      "name": "get /v1/models",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/models"
        }
      }
    },
    "get_v1_batches": {
      "name": "get /v1/batches",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/batches"
        }
      }
    },
    "get_v1_batches__batch_id_": {
      "name": "get /v1/batches/{batch_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/batches/{batch_id}"
        }
      }
    },
    "get_v1_batches__batch_id__results": {
      "name": "get /v1/batches/{batch_id}/results",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/batches/{batch_id}/results"
        }
      }
    }
  },
  "actions": {
    "post_v2_1-clicks_kubernetes": {
      "name": "post /v2/1-clicks/kubernetes",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/1-clicks/kubernetes"
        }
      }
    },
    "post_v2_account_keys": {
      "name": "post /v2/account/keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/account/keys"
        }
      }
    },
    "put_v2_account_keys__ssh_key_identifier_": {
      "name": "put /v2/account/keys/{ssh_key_identifier}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/account/keys/{ssh_key_identifier}"
        }
      }
    },
    "delete_v2_account_keys__ssh_key_identifier_": {
      "name": "delete /v2/account/keys/{ssh_key_identifier}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/account/keys/{ssh_key_identifier}"
        }
      }
    },
    "post_v2_add-ons_saas": {
      "name": "post /v2/add-ons/saas",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/add-ons/saas"
        }
      }
    },
    "delete_v2_add-ons_saas__resource_uuid_": {
      "name": "delete /v2/add-ons/saas/{resource_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/add-ons/saas/{resource_uuid}"
        }
      }
    },
    "patch_v2_add-ons_saas__resource_uuid_": {
      "name": "patch /v2/add-ons/saas/{resource_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/add-ons/saas/{resource_uuid}"
        }
      }
    },
    "patch_v2_add-ons_saas__resource_uuid__plan": {
      "name": "patch /v2/add-ons/saas/{resource_uuid}/plan",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/add-ons/saas/{resource_uuid}/plan"
        }
      }
    },
    "post_v2_apps": {
      "name": "post /v2/apps",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps"
        }
      }
    },
    "delete_v2_apps__id_": {
      "name": "delete /v2/apps/{id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/apps/{id}"
        }
      }
    },
    "put_v2_apps__id_": {
      "name": "put /v2/apps/{id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/apps/{id}"
        }
      }
    },
    "post_v2_apps__app_id__restart": {
      "name": "post /v2/apps/{app_id}/restart",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{app_id}/restart"
        }
      }
    },
    "post_v2_apps__app_id__deployments": {
      "name": "post /v2/apps/{app_id}/deployments",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{app_id}/deployments"
        }
      }
    },
    "post_v2_apps__app_id__deployments__deployment_id__cancel": {
      "name": "post /v2/apps/{app_id}/deployments/{deployment_id}/cancel",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{app_id}/deployments/{deployment_id}/cancel"
        }
      }
    },
    "post_v2_apps__app_id__job-invocations__job_invocation_id__cancel": {
      "name": "post /v2/apps/{app_id}/job-invocations/{job_invocation_id}/cancel",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{app_id}/job-invocations/{job_invocation_id}/cancel"
        }
      }
    },
    "post_v2_apps__app_id__events__event_id__cancel": {
      "name": "post /v2/apps/{app_id}/events/{event_id}/cancel",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{app_id}/events/{event_id}/cancel"
        }
      }
    },
    "post_v2_apps_propose": {
      "name": "post /v2/apps/propose",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/propose"
        }
      }
    },
    "post_v2_apps__app_id__alerts__alert_id__destinations": {
      "name": "post /v2/apps/{app_id}/alerts/{alert_id}/destinations",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{app_id}/alerts/{alert_id}/destinations"
        }
      }
    },
    "post_v2_apps__app_id__rollback": {
      "name": "post /v2/apps/{app_id}/rollback",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{app_id}/rollback"
        }
      }
    },
    "post_v2_apps__app_id__rollback_validate": {
      "name": "post /v2/apps/{app_id}/rollback/validate",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{app_id}/rollback/validate"
        }
      }
    },
    "post_v2_apps__app_id__rollback_commit": {
      "name": "post /v2/apps/{app_id}/rollback/commit",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{app_id}/rollback/commit"
        }
      }
    },
    "post_v2_apps__app_id__rollback_revert": {
      "name": "post /v2/apps/{app_id}/rollback/revert",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/{app_id}/rollback/revert"
        }
      }
    },
    "post_v2_apps_metrics_bandwidth_daily": {
      "name": "post /v2/apps/metrics/bandwidth_daily",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/apps/metrics/bandwidth_daily"
        }
      }
    },
    "post_v2_cdn_endpoints": {
      "name": "post /v2/cdn/endpoints",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/cdn/endpoints"
        }
      }
    },
    "put_v2_cdn_endpoints__cdn_id_": {
      "name": "put /v2/cdn/endpoints/{cdn_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/cdn/endpoints/{cdn_id}"
        }
      }
    },
    "delete_v2_cdn_endpoints__cdn_id_": {
      "name": "delete /v2/cdn/endpoints/{cdn_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/cdn/endpoints/{cdn_id}"
        }
      }
    },
    "delete_v2_cdn_endpoints__cdn_id__cache": {
      "name": "delete /v2/cdn/endpoints/{cdn_id}/cache",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/cdn/endpoints/{cdn_id}/cache"
        }
      }
    },
    "post_v2_certificates": {
      "name": "post /v2/certificates",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/certificates"
        }
      }
    },
    "delete_v2_certificates__certificate_id_": {
      "name": "delete /v2/certificates/{certificate_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/certificates/{certificate_id}"
        }
      }
    },
    "post_v2_databases": {
      "name": "post /v2/databases",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/databases"
        }
      }
    },
    "delete_v2_databases__database_cluster_uuid_": {
      "name": "delete /v2/databases/{database_cluster_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/databases/{database_cluster_uuid}"
        }
      }
    },
    "patch_v2_databases__database_cluster_uuid__config": {
      "name": "patch /v2/databases/{database_cluster_uuid}/config",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/databases/{database_cluster_uuid}/config"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__online-migration": {
      "name": "put /v2/databases/{database_cluster_uuid}/online-migration",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/online-migration"
        }
      }
    },
    "delete_v2_databases__database_cluster_uuid__online-migration__migration_id_": {
      "name": "delete /v2/databases/{database_cluster_uuid}/online-migration/{migration_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/databases/{database_cluster_uuid}/online-migration/{migration_id}"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__migrate": {
      "name": "put /v2/databases/{database_cluster_uuid}/migrate",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/migrate"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__resize": {
      "name": "put /v2/databases/{database_cluster_uuid}/resize",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/resize"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__firewall": {
      "name": "put /v2/databases/{database_cluster_uuid}/firewall",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/firewall"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__maintenance": {
      "name": "put /v2/databases/{database_cluster_uuid}/maintenance",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/maintenance"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__install_update": {
      "name": "put /v2/databases/{database_cluster_uuid}/install_update",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/install_update"
        }
      }
    },
    "post_v2_databases__database_cluster_uuid__replicas": {
      "name": "post /v2/databases/{database_cluster_uuid}/replicas",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/databases/{database_cluster_uuid}/replicas"
        }
      }
    },
    "delete_v2_databases__database_cluster_uuid__replicas__replica_name_": {
      "name": "delete /v2/databases/{database_cluster_uuid}/replicas/{replica_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/databases/{database_cluster_uuid}/replicas/{replica_name}"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__replicas__replica_name__promote": {
      "name": "put /v2/databases/{database_cluster_uuid}/replicas/{replica_name}/promote",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/replicas/{replica_name}/promote"
        }
      }
    },
    "post_v2_databases__database_cluster_uuid__users": {
      "name": "post /v2/databases/{database_cluster_uuid}/users",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/databases/{database_cluster_uuid}/users"
        }
      }
    },
    "delete_v2_databases__database_cluster_uuid__users__username_": {
      "name": "delete /v2/databases/{database_cluster_uuid}/users/{username}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/databases/{database_cluster_uuid}/users/{username}"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__users__username_": {
      "name": "put /v2/databases/{database_cluster_uuid}/users/{username}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/users/{username}"
        }
      }
    },
    "post_v2_databases__database_cluster_uuid__users__username__reset_auth": {
      "name": "post /v2/databases/{database_cluster_uuid}/users/{username}/reset_auth",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/databases/{database_cluster_uuid}/users/{username}/reset_auth"
        }
      }
    },
    "post_v2_databases__database_cluster_uuid__dbs": {
      "name": "post /v2/databases/{database_cluster_uuid}/dbs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/databases/{database_cluster_uuid}/dbs"
        }
      }
    },
    "delete_v2_databases__database_cluster_uuid__dbs__database_name_": {
      "name": "delete /v2/databases/{database_cluster_uuid}/dbs/{database_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/databases/{database_cluster_uuid}/dbs/{database_name}"
        }
      }
    },
    "post_v2_databases__database_cluster_uuid__pools": {
      "name": "post /v2/databases/{database_cluster_uuid}/pools",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/databases/{database_cluster_uuid}/pools"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__pools__pool_name_": {
      "name": "put /v2/databases/{database_cluster_uuid}/pools/{pool_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/pools/{pool_name}"
        }
      }
    },
    "delete_v2_databases__database_cluster_uuid__pools__pool_name_": {
      "name": "delete /v2/databases/{database_cluster_uuid}/pools/{pool_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/databases/{database_cluster_uuid}/pools/{pool_name}"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__eviction_policy": {
      "name": "put /v2/databases/{database_cluster_uuid}/eviction_policy",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/eviction_policy"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__sql_mode": {
      "name": "put /v2/databases/{database_cluster_uuid}/sql_mode",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/sql_mode"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__upgrade": {
      "name": "put /v2/databases/{database_cluster_uuid}/upgrade",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/upgrade"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__autoscale": {
      "name": "put /v2/databases/{database_cluster_uuid}/autoscale",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/autoscale"
        }
      }
    },
    "post_v2_databases__database_cluster_uuid__topics": {
      "name": "post /v2/databases/{database_cluster_uuid}/topics",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/databases/{database_cluster_uuid}/topics"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__topics__topic_name_": {
      "name": "put /v2/databases/{database_cluster_uuid}/topics/{topic_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/topics/{topic_name}"
        }
      }
    },
    "delete_v2_databases__database_cluster_uuid__topics__topic_name_": {
      "name": "delete /v2/databases/{database_cluster_uuid}/topics/{topic_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/databases/{database_cluster_uuid}/topics/{topic_name}"
        }
      }
    },
    "post_v2_databases__database_cluster_uuid__logsink": {
      "name": "post /v2/databases/{database_cluster_uuid}/logsink",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/databases/{database_cluster_uuid}/logsink"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__logsink__logsink_id_": {
      "name": "put /v2/databases/{database_cluster_uuid}/logsink/{logsink_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/logsink/{logsink_id}"
        }
      }
    },
    "delete_v2_databases__database_cluster_uuid__logsink__logsink_id_": {
      "name": "delete /v2/databases/{database_cluster_uuid}/logsink/{logsink_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/databases/{database_cluster_uuid}/logsink/{logsink_id}"
        }
      }
    },
    "post_v2_databases__database_cluster_uuid__schema-registry": {
      "name": "post /v2/databases/{database_cluster_uuid}/schema-registry",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/databases/{database_cluster_uuid}/schema-registry"
        }
      }
    },
    "delete_v2_databases__database_cluster_uuid__schema-registry__subject_name_": {
      "name": "delete /v2/databases/{database_cluster_uuid}/schema-registry/{subject_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/databases/{database_cluster_uuid}/schema-registry/{subject_name}"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__schema-registry_config": {
      "name": "put /v2/databases/{database_cluster_uuid}/schema-registry/config",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/schema-registry/config"
        }
      }
    },
    "put_v2_databases__database_cluster_uuid__schema-registry_config__subject_name_": {
      "name": "put /v2/databases/{database_cluster_uuid}/schema-registry/config/{subject_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/{database_cluster_uuid}/schema-registry/config/{subject_name}"
        }
      }
    },
    "put_v2_databases_metrics_credentials": {
      "name": "put /v2/databases/metrics/credentials",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/databases/metrics/credentials"
        }
      }
    },
    "delete_v2_databases__database_cluster_uuid__indexes__index_name_": {
      "name": "delete /v2/databases/{database_cluster_uuid}/indexes/{index_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/databases/{database_cluster_uuid}/indexes/{index_name}"
        }
      }
    },
    "patch_v2_dedicated-inferences__dedicated_inference_id_": {
      "name": "patch /v2/dedicated-inferences/{dedicated_inference_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/dedicated-inferences/{dedicated_inference_id}"
        }
      }
    },
    "delete_v2_dedicated-inferences__dedicated_inference_id_": {
      "name": "delete /v2/dedicated-inferences/{dedicated_inference_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/dedicated-inferences/{dedicated_inference_id}"
        }
      }
    },
    "post_v2_dedicated-inferences": {
      "name": "post /v2/dedicated-inferences",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/dedicated-inferences"
        }
      }
    },
    "post_v2_dedicated-inferences__dedicated_inference_id__tokens": {
      "name": "post /v2/dedicated-inferences/{dedicated_inference_id}/tokens",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/dedicated-inferences/{dedicated_inference_id}/tokens"
        }
      }
    },
    "delete_v2_dedicated-inferences__dedicated_inference_id__tokens__token_id_": {
      "name": "delete /v2/dedicated-inferences/{dedicated_inference_id}/tokens/{token_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/dedicated-inferences/{dedicated_inference_id}/tokens/{token_id}"
        }
      }
    },
    "post_v2_domains": {
      "name": "post /v2/domains",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/domains"
        }
      }
    },
    "delete_v2_domains__domain_name_": {
      "name": "delete /v2/domains/{domain_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/domains/{domain_name}"
        }
      }
    },
    "post_v2_domains__domain_name__records": {
      "name": "post /v2/domains/{domain_name}/records",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/domains/{domain_name}/records"
        }
      }
    },
    "patch_v2_domains__domain_name__records__domain_record_id_": {
      "name": "patch /v2/domains/{domain_name}/records/{domain_record_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/domains/{domain_name}/records/{domain_record_id}"
        }
      }
    },
    "put_v2_domains__domain_name__records__domain_record_id_": {
      "name": "put /v2/domains/{domain_name}/records/{domain_record_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/domains/{domain_name}/records/{domain_record_id}"
        }
      }
    },
    "delete_v2_domains__domain_name__records__domain_record_id_": {
      "name": "delete /v2/domains/{domain_name}/records/{domain_record_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/domains/{domain_name}/records/{domain_record_id}"
        }
      }
    },
    "post_v2_droplets": {
      "name": "post /v2/droplets",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/droplets"
        }
      }
    },
    "delete_v2_droplets": {
      "name": "delete /v2/droplets",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/droplets"
        }
      }
    },
    "delete_v2_droplets__droplet_id_": {
      "name": "delete /v2/droplets/{droplet_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/droplets/{droplet_id}"
        }
      }
    },
    "post_v2_droplets__droplet_id__actions": {
      "name": "post /v2/droplets/{droplet_id}/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/droplets/{droplet_id}/actions"
        }
      }
    },
    "post_v2_droplets_actions": {
      "name": "post /v2/droplets/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/droplets/actions"
        }
      }
    },
    "delete_v2_droplets__droplet_id__destroy_with_associated_resources_selective": {
      "name": "delete /v2/droplets/{droplet_id}/destroy_with_associated_resources/selective",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/droplets/{droplet_id}/destroy_with_associated_resources/selective"
        }
      }
    },
    "delete_v2_droplets__droplet_id__destroy_with_associated_resources_dangerous": {
      "name": "delete /v2/droplets/{droplet_id}/destroy_with_associated_resources/dangerous",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/droplets/{droplet_id}/destroy_with_associated_resources/dangerous"
        }
      }
    },
    "post_v2_droplets__droplet_id__destroy_with_associated_resources_retry": {
      "name": "post /v2/droplets/{droplet_id}/destroy_with_associated_resources/retry",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/droplets/{droplet_id}/destroy_with_associated_resources/retry"
        }
      }
    },
    "post_v2_droplets_autoscale": {
      "name": "post /v2/droplets/autoscale",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/droplets/autoscale"
        }
      }
    },
    "put_v2_droplets_autoscale__autoscale_pool_id_": {
      "name": "put /v2/droplets/autoscale/{autoscale_pool_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/droplets/autoscale/{autoscale_pool_id}"
        }
      }
    },
    "delete_v2_droplets_autoscale__autoscale_pool_id_": {
      "name": "delete /v2/droplets/autoscale/{autoscale_pool_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/droplets/autoscale/{autoscale_pool_id}"
        }
      }
    },
    "delete_v2_droplets_autoscale__autoscale_pool_id__dangerous": {
      "name": "delete /v2/droplets/autoscale/{autoscale_pool_id}/dangerous",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/droplets/autoscale/{autoscale_pool_id}/dangerous"
        }
      }
    },
    "post_v2_firewalls": {
      "name": "post /v2/firewalls",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/firewalls"
        }
      }
    },
    "put_v2_firewalls__firewall_id_": {
      "name": "put /v2/firewalls/{firewall_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/firewalls/{firewall_id}"
        }
      }
    },
    "delete_v2_firewalls__firewall_id_": {
      "name": "delete /v2/firewalls/{firewall_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/firewalls/{firewall_id}"
        }
      }
    },
    "post_v2_firewalls__firewall_id__droplets": {
      "name": "post /v2/firewalls/{firewall_id}/droplets",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/firewalls/{firewall_id}/droplets"
        }
      }
    },
    "delete_v2_firewalls__firewall_id__droplets": {
      "name": "delete /v2/firewalls/{firewall_id}/droplets",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/firewalls/{firewall_id}/droplets"
        }
      }
    },
    "post_v2_firewalls__firewall_id__tags": {
      "name": "post /v2/firewalls/{firewall_id}/tags",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/firewalls/{firewall_id}/tags"
        }
      }
    },
    "delete_v2_firewalls__firewall_id__tags": {
      "name": "delete /v2/firewalls/{firewall_id}/tags",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/firewalls/{firewall_id}/tags"
        }
      }
    },
    "post_v2_firewalls__firewall_id__rules": {
      "name": "post /v2/firewalls/{firewall_id}/rules",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/firewalls/{firewall_id}/rules"
        }
      }
    },
    "delete_v2_firewalls__firewall_id__rules": {
      "name": "delete /v2/firewalls/{firewall_id}/rules",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/firewalls/{firewall_id}/rules"
        }
      }
    },
    "post_v2_floating_ips": {
      "name": "post /v2/floating_ips",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/floating_ips"
        }
      }
    },
    "delete_v2_floating_ips__floating_ip_": {
      "name": "delete /v2/floating_ips/{floating_ip}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/floating_ips/{floating_ip}"
        }
      }
    },
    "post_v2_floating_ips__floating_ip__actions": {
      "name": "post /v2/floating_ips/{floating_ip}/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/floating_ips/{floating_ip}/actions"
        }
      }
    },
    "post_v2_functions_namespaces": {
      "name": "post /v2/functions/namespaces",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/functions/namespaces"
        }
      }
    },
    "delete_v2_functions_namespaces__namespace_id_": {
      "name": "delete /v2/functions/namespaces/{namespace_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/functions/namespaces/{namespace_id}"
        }
      }
    },
    "post_v2_functions_namespaces__namespace_id__triggers": {
      "name": "post /v2/functions/namespaces/{namespace_id}/triggers",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/functions/namespaces/{namespace_id}/triggers"
        }
      }
    },
    "put_v2_functions_namespaces__namespace_id__triggers__trigger_name_": {
      "name": "put /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}"
        }
      }
    },
    "delete_v2_functions_namespaces__namespace_id__triggers__trigger_name_": {
      "name": "delete /v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/functions/namespaces/{namespace_id}/triggers/{trigger_name}"
        }
      }
    },
    "post_v2_functions_namespaces__namespace_id__keys": {
      "name": "post /v2/functions/namespaces/{namespace_id}/keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/functions/namespaces/{namespace_id}/keys"
        }
      }
    },
    "put_v2_functions_namespaces__namespace_id__keys__key_id_": {
      "name": "put /v2/functions/namespaces/{namespace_id}/keys/{key_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/functions/namespaces/{namespace_id}/keys/{key_id}"
        }
      }
    },
    "delete_v2_functions_namespaces__namespace_id__keys__key_id_": {
      "name": "delete /v2/functions/namespaces/{namespace_id}/keys/{key_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/functions/namespaces/{namespace_id}/keys/{key_id}"
        }
      }
    },
    "post_v2_images": {
      "name": "post /v2/images",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/images"
        }
      }
    },
    "put_v2_images__image_id_": {
      "name": "put /v2/images/{image_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/images/{image_id}"
        }
      }
    },
    "delete_v2_images__image_id_": {
      "name": "delete /v2/images/{image_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/images/{image_id}"
        }
      }
    },
    "post_v2_images__image_id__account_transfer": {
      "name": "post /v2/images/{image_id}/account_transfer",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/images/{image_id}/account_transfer"
        }
      }
    },
    "post_v2_images__image_id__account_transfer_accept": {
      "name": "post /v2/images/{image_id}/account_transfer/accept",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/images/{image_id}/account_transfer/accept"
        }
      }
    },
    "post_v2_images__image_id__account_transfer_cancel": {
      "name": "post /v2/images/{image_id}/account_transfer/cancel",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/images/{image_id}/account_transfer/cancel"
        }
      }
    },
    "post_v2_images__image_id__account_transfer_decline": {
      "name": "post /v2/images/{image_id}/account_transfer/decline",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/images/{image_id}/account_transfer/decline"
        }
      }
    },
    "post_v2_images__image_id__actions": {
      "name": "post /v2/images/{image_id}/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/images/{image_id}/actions"
        }
      }
    },
    "post_v2_kubernetes_clusters": {
      "name": "post /v2/kubernetes/clusters",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/kubernetes/clusters"
        }
      }
    },
    "put_v2_kubernetes_clusters__cluster_id_": {
      "name": "put /v2/kubernetes/clusters/{cluster_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/kubernetes/clusters/{cluster_id}"
        }
      }
    },
    "delete_v2_kubernetes_clusters__cluster_id_": {
      "name": "delete /v2/kubernetes/clusters/{cluster_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/kubernetes/clusters/{cluster_id}"
        }
      }
    },
    "delete_v2_kubernetes_clusters__cluster_id__destroy_with_associated_resources_selective": {
      "name": "delete /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/selective",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/selective"
        }
      }
    },
    "delete_v2_kubernetes_clusters__cluster_id__destroy_with_associated_resources_dangerous": {
      "name": "delete /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/dangerous",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/dangerous"
        }
      }
    },
    "post_v2_kubernetes_clusters__cluster_id__upgrade": {
      "name": "post /v2/kubernetes/clusters/{cluster_id}/upgrade",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/kubernetes/clusters/{cluster_id}/upgrade"
        }
      }
    },
    "post_v2_kubernetes_clusters__cluster_id__node_pools": {
      "name": "post /v2/kubernetes/clusters/{cluster_id}/node_pools",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/kubernetes/clusters/{cluster_id}/node_pools"
        }
      }
    },
    "put_v2_kubernetes_clusters__cluster_id__node_pools__node_pool_id_": {
      "name": "put /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}"
        }
      }
    },
    "delete_v2_kubernetes_clusters__cluster_id__node_pools__node_pool_id_": {
      "name": "delete /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}"
        }
      }
    },
    "delete_v2_kubernetes_clusters__cluster_id__node_pools__node_pool_id__nodes__node_id_": {
      "name": "delete /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/nodes/{node_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/nodes/{node_id}"
        }
      }
    },
    "post_v2_kubernetes_clusters__cluster_id__node_pools__node_pool_id__recycle": {
      "name": "post /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/recycle",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/recycle"
        }
      }
    },
    "post_v2_kubernetes_clusters__cluster_id__clusterlint": {
      "name": "post /v2/kubernetes/clusters/{cluster_id}/clusterlint",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/kubernetes/clusters/{cluster_id}/clusterlint"
        }
      }
    },
    "post_v2_kubernetes_registry": {
      "name": "post /v2/kubernetes/registry",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/kubernetes/registry"
        }
      }
    },
    "delete_v2_kubernetes_registry": {
      "name": "delete /v2/kubernetes/registry",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/kubernetes/registry"
        }
      }
    },
    "post_v2_kubernetes_registries": {
      "name": "post /v2/kubernetes/registries",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/kubernetes/registries"
        }
      }
    },
    "delete_v2_kubernetes_registries": {
      "name": "delete /v2/kubernetes/registries",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/kubernetes/registries"
        }
      }
    },
    "post_v2_load_balancers": {
      "name": "post /v2/load_balancers",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/load_balancers"
        }
      }
    },
    "put_v2_load_balancers__lb_id_": {
      "name": "put /v2/load_balancers/{lb_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/load_balancers/{lb_id}"
        }
      }
    },
    "delete_v2_load_balancers__lb_id_": {
      "name": "delete /v2/load_balancers/{lb_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/load_balancers/{lb_id}"
        }
      }
    },
    "delete_v2_load_balancers__lb_id__cache": {
      "name": "delete /v2/load_balancers/{lb_id}/cache",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/load_balancers/{lb_id}/cache"
        }
      }
    },
    "post_v2_load_balancers__lb_id__droplets": {
      "name": "post /v2/load_balancers/{lb_id}/droplets",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/load_balancers/{lb_id}/droplets"
        }
      }
    },
    "delete_v2_load_balancers__lb_id__droplets": {
      "name": "delete /v2/load_balancers/{lb_id}/droplets",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/load_balancers/{lb_id}/droplets"
        }
      }
    },
    "post_v2_load_balancers__lb_id__forwarding_rules": {
      "name": "post /v2/load_balancers/{lb_id}/forwarding_rules",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/load_balancers/{lb_id}/forwarding_rules"
        }
      }
    },
    "delete_v2_load_balancers__lb_id__forwarding_rules": {
      "name": "delete /v2/load_balancers/{lb_id}/forwarding_rules",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/load_balancers/{lb_id}/forwarding_rules"
        }
      }
    },
    "post_v2_monitoring_alerts": {
      "name": "post /v2/monitoring/alerts",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/monitoring/alerts"
        }
      }
    },
    "put_v2_monitoring_alerts__alert_uuid_": {
      "name": "put /v2/monitoring/alerts/{alert_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/monitoring/alerts/{alert_uuid}"
        }
      }
    },
    "delete_v2_monitoring_alerts__alert_uuid_": {
      "name": "delete /v2/monitoring/alerts/{alert_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/monitoring/alerts/{alert_uuid}"
        }
      }
    },
    "post_v2_monitoring_sinks_destinations": {
      "name": "post /v2/monitoring/sinks/destinations",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/monitoring/sinks/destinations"
        }
      }
    },
    "post_v2_monitoring_sinks_destinations__destination_uuid_": {
      "name": "post /v2/monitoring/sinks/destinations/{destination_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/monitoring/sinks/destinations/{destination_uuid}"
        }
      }
    },
    "delete_v2_monitoring_sinks_destinations__destination_uuid_": {
      "name": "delete /v2/monitoring/sinks/destinations/{destination_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/monitoring/sinks/destinations/{destination_uuid}"
        }
      }
    },
    "post_v2_monitoring_sinks": {
      "name": "post /v2/monitoring/sinks",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/monitoring/sinks"
        }
      }
    },
    "delete_v2_monitoring_sinks__sink_uuid_": {
      "name": "delete /v2/monitoring/sinks/{sink_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/monitoring/sinks/{sink_uuid}"
        }
      }
    },
    "post_v2_nfs": {
      "name": "post /v2/nfs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/nfs"
        }
      }
    },
    "delete_v2_nfs__nfs_id_": {
      "name": "delete /v2/nfs/{nfs_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/nfs/{nfs_id}"
        }
      }
    },
    "post_v2_nfs__nfs_id__actions": {
      "name": "post /v2/nfs/{nfs_id}/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/nfs/{nfs_id}/actions"
        }
      }
    },
    "delete_v2_nfs_snapshots__nfs_snapshot_id_": {
      "name": "delete /v2/nfs/snapshots/{nfs_snapshot_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/nfs/snapshots/{nfs_snapshot_id}"
        }
      }
    },
    "post_v2_partner_network_connect_attachments": {
      "name": "post /v2/partner_network_connect/attachments",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/partner_network_connect/attachments"
        }
      }
    },
    "patch_v2_partner_network_connect_attachments__pa_id_": {
      "name": "patch /v2/partner_network_connect/attachments/{pa_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/partner_network_connect/attachments/{pa_id}"
        }
      }
    },
    "delete_v2_partner_network_connect_attachments__pa_id_": {
      "name": "delete /v2/partner_network_connect/attachments/{pa_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/partner_network_connect/attachments/{pa_id}"
        }
      }
    },
    "post_v2_partner_network_connect_attachments__pa_id__service_key": {
      "name": "post /v2/partner_network_connect/attachments/{pa_id}/service_key",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/partner_network_connect/attachments/{pa_id}/service_key"
        }
      }
    },
    "post_v2_projects": {
      "name": "post /v2/projects",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/projects"
        }
      }
    },
    "put_v2_projects_default": {
      "name": "put /v2/projects/default",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/projects/default"
        }
      }
    },
    "patch_v2_projects_default": {
      "name": "patch /v2/projects/default",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/projects/default"
        }
      }
    },
    "put_v2_projects__project_id_": {
      "name": "put /v2/projects/{project_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/projects/{project_id}"
        }
      }
    },
    "patch_v2_projects__project_id_": {
      "name": "patch /v2/projects/{project_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/projects/{project_id}"
        }
      }
    },
    "delete_v2_projects__project_id_": {
      "name": "delete /v2/projects/{project_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/projects/{project_id}"
        }
      }
    },
    "post_v2_projects__project_id__resources": {
      "name": "post /v2/projects/{project_id}/resources",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/projects/{project_id}/resources"
        }
      }
    },
    "post_v2_projects_default_resources": {
      "name": "post /v2/projects/default/resources",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/projects/default/resources"
        }
      }
    },
    "post_v2_registries": {
      "name": "post /v2/registries",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/registries"
        }
      }
    },
    "delete_v2_registries__registry_name_": {
      "name": "delete /v2/registries/{registry_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/registries/{registry_name}"
        }
      }
    },
    "post_v2_registries_subscription": {
      "name": "post /v2/registries/subscription",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/registries/subscription"
        }
      }
    },
    "post_v2_registries__registry_name__garbage-collection": {
      "name": "post /v2/registries/{registry_name}/garbage-collection",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/registries/{registry_name}/garbage-collection"
        }
      }
    },
    "put_v2_registries__registry_name__garbage-collection__garbage_collection_uuid_": {
      "name": "put /v2/registries/{registry_name}/garbage-collection/{garbage_collection_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/registries/{registry_name}/garbage-collection/{garbage_collection_uuid}"
        }
      }
    },
    "delete_v2_registries__registry_name__repositories__repository_name_": {
      "name": "delete /v2/registries/{registry_name}/repositories/{repository_name}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/registries/{registry_name}/repositories/{repository_name}"
        }
      }
    },
    "delete_v2_registries__registry_name__repositories__repository_name__tags__repository_tag_": {
      "name": "delete /v2/registries/{registry_name}/repositories/{repository_name}/tags/{repository_tag}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/registries/{registry_name}/repositories/{repository_name}/tags/{repository_tag}"
        }
      }
    },
    "delete_v2_registries__registry_name__repositories__repository_name__digests__manifest_digest_": {
      "name": "delete /v2/registries/{registry_name}/repositories/{repository_name}/digests/{manifest_digest}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/registries/{registry_name}/repositories/{repository_name}/digests/{manifest_digest}"
        }
      }
    },
    "post_v2_registries_validate-name": {
      "name": "post /v2/registries/validate-name",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/registries/validate-name"
        }
      }
    },
    "post_v2_registry": {
      "name": "post /v2/registry",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/registry"
        }
      }
    },
    "delete_v2_registry": {
      "name": "delete /v2/registry",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/registry"
        }
      }
    },
    "post_v2_registry_subscription": {
      "name": "post /v2/registry/subscription",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/registry/subscription"
        }
      }
    },
    "post_v2_registry_validate-name": {
      "name": "post /v2/registry/validate-name",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/registry/validate-name"
        }
      }
    },
    "delete_v2_registry__registry_name__repositories__repository_name__tags__repository_tag_": {
      "name": "delete /v2/registry/{registry_name}/repositories/{repository_name}/tags/{repository_tag}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/registry/{registry_name}/repositories/{repository_name}/tags/{repository_tag}"
        }
      }
    },
    "delete_v2_registry__registry_name__repositories__repository_name__digests__manifest_digest_": {
      "name": "delete /v2/registry/{registry_name}/repositories/{repository_name}/digests/{manifest_digest}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/registry/{registry_name}/repositories/{repository_name}/digests/{manifest_digest}"
        }
      }
    },
    "post_v2_registry__registry_name__garbage-collection": {
      "name": "post /v2/registry/{registry_name}/garbage-collection",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/registry/{registry_name}/garbage-collection"
        }
      }
    },
    "put_v2_registry__registry_name__garbage-collection__garbage_collection_uuid_": {
      "name": "put /v2/registry/{registry_name}/garbage-collection/{garbage_collection_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/registry/{registry_name}/garbage-collection/{garbage_collection_uuid}"
        }
      }
    },
    "post_v2_reserved_ips": {
      "name": "post /v2/reserved_ips",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/reserved_ips"
        }
      }
    },
    "delete_v2_reserved_ips__reserved_ip_": {
      "name": "delete /v2/reserved_ips/{reserved_ip}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/reserved_ips/{reserved_ip}"
        }
      }
    },
    "post_v2_reserved_ips__reserved_ip__actions": {
      "name": "post /v2/reserved_ips/{reserved_ip}/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/reserved_ips/{reserved_ip}/actions"
        }
      }
    },
    "post_v2_reserved_ipv6": {
      "name": "post /v2/reserved_ipv6",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/reserved_ipv6"
        }
      }
    },
    "delete_v2_reserved_ipv6__reserved_ipv6_": {
      "name": "delete /v2/reserved_ipv6/{reserved_ipv6}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/reserved_ipv6/{reserved_ipv6}"
        }
      }
    },
    "post_v2_reserved_ipv6__reserved_ipv6__actions": {
      "name": "post /v2/reserved_ipv6/{reserved_ipv6}/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/reserved_ipv6/{reserved_ipv6}/actions"
        }
      }
    },
    "post_v2_byoip_prefixes": {
      "name": "post /v2/byoip_prefixes",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/byoip_prefixes"
        }
      }
    },
    "delete_v2_byoip_prefixes__byoip_prefix_uuid_": {
      "name": "delete /v2/byoip_prefixes/{byoip_prefix_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/byoip_prefixes/{byoip_prefix_uuid}"
        }
      }
    },
    "patch_v2_byoip_prefixes__byoip_prefix_uuid_": {
      "name": "patch /v2/byoip_prefixes/{byoip_prefix_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/byoip_prefixes/{byoip_prefix_uuid}"
        }
      }
    },
    "post_v2_security_scans": {
      "name": "post /v2/security/scans",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/security/scans"
        }
      }
    },
    "post_v2_security_scans_rules": {
      "name": "post /v2/security/scans/rules",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/security/scans/rules"
        }
      }
    },
    "put_v2_security_settings_plan": {
      "name": "put /v2/security/settings/plan",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/security/settings/plan"
        }
      }
    },
    "post_v2_security_settings_suppressions": {
      "name": "post /v2/security/settings/suppressions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/security/settings/suppressions"
        }
      }
    },
    "delete_v2_security_settings_suppressions__suppression_uuid_": {
      "name": "delete /v2/security/settings/suppressions/{suppression_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/security/settings/suppressions/{suppression_uuid}"
        }
      }
    },
    "delete_v2_snapshots__snapshot_id_": {
      "name": "delete /v2/snapshots/{snapshot_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/snapshots/{snapshot_id}"
        }
      }
    },
    "post_v2_spaces_keys": {
      "name": "post /v2/spaces/keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/spaces/keys"
        }
      }
    },
    "delete_v2_spaces_keys__access_key_": {
      "name": "delete /v2/spaces/keys/{access_key}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/spaces/keys/{access_key}"
        }
      }
    },
    "put_v2_spaces_keys__access_key_": {
      "name": "put /v2/spaces/keys/{access_key}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/spaces/keys/{access_key}"
        }
      }
    },
    "patch_v2_spaces_keys__access_key_": {
      "name": "patch /v2/spaces/keys/{access_key}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/spaces/keys/{access_key}"
        }
      }
    },
    "post_v2_tags": {
      "name": "post /v2/tags",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/tags"
        }
      }
    },
    "delete_v2_tags__tag_id_": {
      "name": "delete /v2/tags/{tag_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/tags/{tag_id}"
        }
      }
    },
    "post_v2_tags__tag_id__resources": {
      "name": "post /v2/tags/{tag_id}/resources",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/tags/{tag_id}/resources"
        }
      }
    },
    "delete_v2_tags__tag_id__resources": {
      "name": "delete /v2/tags/{tag_id}/resources",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/tags/{tag_id}/resources"
        }
      }
    },
    "post_v2_volumes": {
      "name": "post /v2/volumes",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/volumes"
        }
      }
    },
    "delete_v2_volumes": {
      "name": "delete /v2/volumes",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/volumes"
        }
      }
    },
    "post_v2_volumes_actions": {
      "name": "post /v2/volumes/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/volumes/actions"
        }
      }
    },
    "delete_v2_volumes_snapshots__snapshot_id_": {
      "name": "delete /v2/volumes/snapshots/{snapshot_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/volumes/snapshots/{snapshot_id}"
        }
      }
    },
    "delete_v2_volumes__volume_id_": {
      "name": "delete /v2/volumes/{volume_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/volumes/{volume_id}"
        }
      }
    },
    "post_v2_volumes__volume_id__actions": {
      "name": "post /v2/volumes/{volume_id}/actions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/volumes/{volume_id}/actions"
        }
      }
    },
    "post_v2_volumes__volume_id__snapshots": {
      "name": "post /v2/volumes/{volume_id}/snapshots",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/volumes/{volume_id}/snapshots"
        }
      }
    },
    "post_v2_vpcs": {
      "name": "post /v2/vpcs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/vpcs"
        }
      }
    },
    "put_v2_vpcs__vpc_id_": {
      "name": "put /v2/vpcs/{vpc_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/vpcs/{vpc_id}"
        }
      }
    },
    "patch_v2_vpcs__vpc_id_": {
      "name": "patch /v2/vpcs/{vpc_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/vpcs/{vpc_id}"
        }
      }
    },
    "delete_v2_vpcs__vpc_id_": {
      "name": "delete /v2/vpcs/{vpc_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/vpcs/{vpc_id}"
        }
      }
    },
    "post_v2_vpcs__vpc_id__peerings": {
      "name": "post /v2/vpcs/{vpc_id}/peerings",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/vpcs/{vpc_id}/peerings"
        }
      }
    },
    "patch_v2_vpcs__vpc_id__peerings__vpc_peering_id_": {
      "name": "patch /v2/vpcs/{vpc_id}/peerings/{vpc_peering_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/vpcs/{vpc_id}/peerings/{vpc_peering_id}"
        }
      }
    },
    "post_v2_vpc_peerings": {
      "name": "post /v2/vpc_peerings",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/vpc_peerings"
        }
      }
    },
    "patch_v2_vpc_peerings__vpc_peering_id_": {
      "name": "patch /v2/vpc_peerings/{vpc_peering_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/vpc_peerings/{vpc_peering_id}"
        }
      }
    },
    "delete_v2_vpc_peerings__vpc_peering_id_": {
      "name": "delete /v2/vpc_peerings/{vpc_peering_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/vpc_peerings/{vpc_peering_id}"
        }
      }
    },
    "post_v2_vpc_nat_gateways": {
      "name": "post /v2/vpc_nat_gateways",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/vpc_nat_gateways"
        }
      }
    },
    "put_v2_vpc_nat_gateways__id_": {
      "name": "put /v2/vpc_nat_gateways/{id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/vpc_nat_gateways/{id}"
        }
      }
    },
    "delete_v2_vpc_nat_gateways__id_": {
      "name": "delete /v2/vpc_nat_gateways/{id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/vpc_nat_gateways/{id}"
        }
      }
    },
    "post_v2_uptime_checks": {
      "name": "post /v2/uptime/checks",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/uptime/checks"
        }
      }
    },
    "put_v2_uptime_checks__check_id_": {
      "name": "put /v2/uptime/checks/{check_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/uptime/checks/{check_id}"
        }
      }
    },
    "delete_v2_uptime_checks__check_id_": {
      "name": "delete /v2/uptime/checks/{check_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/uptime/checks/{check_id}"
        }
      }
    },
    "post_v2_uptime_checks__check_id__alerts": {
      "name": "post /v2/uptime/checks/{check_id}/alerts",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/uptime/checks/{check_id}/alerts"
        }
      }
    },
    "put_v2_uptime_checks__check_id__alerts__alert_id_": {
      "name": "put /v2/uptime/checks/{check_id}/alerts/{alert_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/uptime/checks/{check_id}/alerts/{alert_id}"
        }
      }
    },
    "delete_v2_uptime_checks__check_id__alerts__alert_id_": {
      "name": "delete /v2/uptime/checks/{check_id}/alerts/{alert_id}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/uptime/checks/{check_id}/alerts/{alert_id}"
        }
      }
    },
    "post_v2_gen-ai_agents": {
      "name": "post /v2/gen-ai/agents",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/agents"
        }
      }
    },
    "post_v2_gen-ai_agents__agent_uuid__api_keys": {
      "name": "post /v2/gen-ai/agents/{agent_uuid}/api_keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/agents/{agent_uuid}/api_keys"
        }
      }
    },
    "put_v2_gen-ai_agents__agent_uuid__api_keys__api_key_uuid_": {
      "name": "put /v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}"
        }
      }
    },
    "delete_v2_gen-ai_agents__agent_uuid__api_keys__api_key_uuid_": {
      "name": "delete /v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}"
        }
      }
    },
    "put_v2_gen-ai_agents__agent_uuid__api_keys__api_key_uuid__regenerate": {
      "name": "put /v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}/regenerate",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/agents/{agent_uuid}/api_keys/{api_key_uuid}/regenerate"
        }
      }
    },
    "post_v2_gen-ai_agents__agent_uuid__functions": {
      "name": "post /v2/gen-ai/agents/{agent_uuid}/functions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/agents/{agent_uuid}/functions"
        }
      }
    },
    "put_v2_gen-ai_agents__agent_uuid__functions__function_uuid_": {
      "name": "put /v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}"
        }
      }
    },
    "delete_v2_gen-ai_agents__agent_uuid__functions__function_uuid_": {
      "name": "delete /v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/agents/{agent_uuid}/functions/{function_uuid}"
        }
      }
    },
    "post_v2_gen-ai_agents__agent_uuid__guardrails": {
      "name": "post /v2/gen-ai/agents/{agent_uuid}/guardrails",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/agents/{agent_uuid}/guardrails"
        }
      }
    },
    "delete_v2_gen-ai_agents__agent_uuid__guardrails__guardrail_uuid_": {
      "name": "delete /v2/gen-ai/agents/{agent_uuid}/guardrails/{guardrail_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/agents/{agent_uuid}/guardrails/{guardrail_uuid}"
        }
      }
    },
    "post_v2_gen-ai_agents__agent_uuid__knowledge_bases": {
      "name": "post /v2/gen-ai/agents/{agent_uuid}/knowledge_bases",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/agents/{agent_uuid}/knowledge_bases"
        }
      }
    },
    "post_v2_gen-ai_agents__agent_uuid__knowledge_bases__knowledge_base_uuid_": {
      "name": "post /v2/gen-ai/agents/{agent_uuid}/knowledge_bases/{knowledge_base_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/agents/{agent_uuid}/knowledge_bases/{knowledge_base_uuid}"
        }
      }
    },
    "delete_v2_gen-ai_agents__agent_uuid__knowledge_bases__knowledge_base_uuid_": {
      "name": "delete /v2/gen-ai/agents/{agent_uuid}/knowledge_bases/{knowledge_base_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/agents/{agent_uuid}/knowledge_bases/{knowledge_base_uuid}"
        }
      }
    },
    "post_v2_gen-ai_agents__parent_agent_uuid__child_agents__child_agent_uuid_": {
      "name": "post /v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}"
        }
      }
    },
    "put_v2_gen-ai_agents__parent_agent_uuid__child_agents__child_agent_uuid_": {
      "name": "put /v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}"
        }
      }
    },
    "delete_v2_gen-ai_agents__parent_agent_uuid__child_agents__child_agent_uuid_": {
      "name": "delete /v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/agents/{parent_agent_uuid}/child_agents/{child_agent_uuid}"
        }
      }
    },
    "put_v2_gen-ai_agents__uuid_": {
      "name": "put /v2/gen-ai/agents/{uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/agents/{uuid}"
        }
      }
    },
    "delete_v2_gen-ai_agents__uuid_": {
      "name": "delete /v2/gen-ai/agents/{uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/agents/{uuid}"
        }
      }
    },
    "put_v2_gen-ai_agents__uuid__deployment_visibility": {
      "name": "put /v2/gen-ai/agents/{uuid}/deployment_visibility",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/agents/{uuid}/deployment_visibility"
        }
      }
    },
    "put_v2_gen-ai_agents__uuid__versions": {
      "name": "put /v2/gen-ai/agents/{uuid}/versions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/agents/{uuid}/versions"
        }
      }
    },
    "post_v2_gen-ai_anthropic_keys": {
      "name": "post /v2/gen-ai/anthropic/keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/anthropic/keys"
        }
      }
    },
    "put_v2_gen-ai_anthropic_keys__api_key_uuid_": {
      "name": "put /v2/gen-ai/anthropic/keys/{api_key_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/anthropic/keys/{api_key_uuid}"
        }
      }
    },
    "delete_v2_gen-ai_anthropic_keys__api_key_uuid_": {
      "name": "delete /v2/gen-ai/anthropic/keys/{api_key_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/anthropic/keys/{api_key_uuid}"
        }
      }
    },
    "post_v2_gen-ai_custom_models_import": {
      "name": "post /v2/gen-ai/custom_models/import",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/custom_models/import"
        }
      }
    },
    "delete_v2_gen-ai_custom_models__uuid_": {
      "name": "delete /v2/gen-ai/custom_models/{uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/custom_models/{uuid}"
        }
      }
    },
    "patch_v2_gen-ai_custom_models__uuid__metadata": {
      "name": "patch /v2/gen-ai/custom_models/{uuid}/metadata",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v2/gen-ai/custom_models/{uuid}/metadata"
        }
      }
    },
    "post_v2_gen-ai_evaluation_datasets": {
      "name": "post /v2/gen-ai/evaluation_datasets",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/evaluation_datasets"
        }
      }
    },
    "post_v2_gen-ai_evaluation_datasets_file_upload_presigned_urls": {
      "name": "post /v2/gen-ai/evaluation_datasets/file_upload_presigned_urls",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/evaluation_datasets/file_upload_presigned_urls"
        }
      }
    },
    "post_v2_gen-ai_evaluation_runs": {
      "name": "post /v2/gen-ai/evaluation_runs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/evaluation_runs"
        }
      }
    },
    "post_v2_gen-ai_evaluation_test_cases": {
      "name": "post /v2/gen-ai/evaluation_test_cases",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/evaluation_test_cases"
        }
      }
    },
    "put_v2_gen-ai_evaluation_test_cases__test_case_uuid_": {
      "name": "put /v2/gen-ai/evaluation_test_cases/{test_case_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/evaluation_test_cases/{test_case_uuid}"
        }
      }
    },
    "post_v2_gen-ai_indexing_jobs": {
      "name": "post /v2/gen-ai/indexing_jobs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/indexing_jobs"
        }
      }
    },
    "put_v2_gen-ai_indexing_jobs__uuid__cancel": {
      "name": "put /v2/gen-ai/indexing_jobs/{uuid}/cancel",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/indexing_jobs/{uuid}/cancel"
        }
      }
    },
    "post_v2_gen-ai_knowledge_bases": {
      "name": "post /v2/gen-ai/knowledge_bases",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/knowledge_bases"
        }
      }
    },
    "post_v2_gen-ai_knowledge_bases_data_sources_file_upload_presigned_urls": {
      "name": "post /v2/gen-ai/knowledge_bases/data_sources/file_upload_presigned_urls",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/knowledge_bases/data_sources/file_upload_presigned_urls"
        }
      }
    },
    "post_v2_gen-ai_knowledge_bases__knowledge_base_uuid__data_sources": {
      "name": "post /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources"
        }
      }
    },
    "put_v2_gen-ai_knowledge_bases__knowledge_base_uuid__data_sources__data_source_uuid_": {
      "name": "put /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}"
        }
      }
    },
    "delete_v2_gen-ai_knowledge_bases__knowledge_base_uuid__data_sources__data_source_uuid_": {
      "name": "delete /v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/knowledge_bases/{knowledge_base_uuid}/data_sources/{data_source_uuid}"
        }
      }
    },
    "put_v2_gen-ai_knowledge_bases__uuid_": {
      "name": "put /v2/gen-ai/knowledge_bases/{uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/knowledge_bases/{uuid}"
        }
      }
    },
    "delete_v2_gen-ai_knowledge_bases__uuid_": {
      "name": "delete /v2/gen-ai/knowledge_bases/{uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/knowledge_bases/{uuid}"
        }
      }
    },
    "post_v2_gen-ai_model_evaluation_datasets_file_upload_presigned_urls": {
      "name": "post /v2/gen-ai/model_evaluation/datasets/file_upload_presigned_urls",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/model_evaluation/datasets/file_upload_presigned_urls"
        }
      }
    },
    "post_v2_gen-ai_model_evaluation_runs": {
      "name": "post /v2/gen-ai/model_evaluation_runs",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/model_evaluation_runs"
        }
      }
    },
    "post_v2_gen-ai_models_api_keys": {
      "name": "post /v2/gen-ai/models/api_keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/models/api_keys"
        }
      }
    },
    "put_v2_gen-ai_models_api_keys__api_key_uuid_": {
      "name": "put /v2/gen-ai/models/api_keys/{api_key_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/models/api_keys/{api_key_uuid}"
        }
      }
    },
    "delete_v2_gen-ai_models_api_keys__api_key_uuid_": {
      "name": "delete /v2/gen-ai/models/api_keys/{api_key_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/models/api_keys/{api_key_uuid}"
        }
      }
    },
    "put_v2_gen-ai_models_api_keys__api_key_uuid__regenerate": {
      "name": "put /v2/gen-ai/models/api_keys/{api_key_uuid}/regenerate",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/models/api_keys/{api_key_uuid}/regenerate"
        }
      }
    },
    "post_v2_gen-ai_models_routers": {
      "name": "post /v2/gen-ai/models/routers",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/models/routers"
        }
      }
    },
    "put_v2_gen-ai_models_routers__uuid_": {
      "name": "put /v2/gen-ai/models/routers/{uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/models/routers/{uuid}"
        }
      }
    },
    "delete_v2_gen-ai_models_routers__uuid_": {
      "name": "delete /v2/gen-ai/models/routers/{uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/models/routers/{uuid}"
        }
      }
    },
    "post_v2_gen-ai_oauth2_dropbox_tokens": {
      "name": "post /v2/gen-ai/oauth2/dropbox/tokens",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/oauth2/dropbox/tokens"
        }
      }
    },
    "post_v2_gen-ai_openai_keys": {
      "name": "post /v2/gen-ai/openai/keys",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/openai/keys"
        }
      }
    },
    "put_v2_gen-ai_openai_keys__api_key_uuid_": {
      "name": "put /v2/gen-ai/openai/keys/{api_key_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/openai/keys/{api_key_uuid}"
        }
      }
    },
    "delete_v2_gen-ai_openai_keys__api_key_uuid_": {
      "name": "delete /v2/gen-ai/openai/keys/{api_key_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/openai/keys/{api_key_uuid}"
        }
      }
    },
    "post_v2_gen-ai_scheduled-indexing": {
      "name": "post /v2/gen-ai/scheduled-indexing",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/scheduled-indexing"
        }
      }
    },
    "delete_v2_gen-ai_scheduled-indexing__uuid_": {
      "name": "delete /v2/gen-ai/scheduled-indexing/{uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/scheduled-indexing/{uuid}"
        }
      }
    },
    "post_v2_gen-ai_workspaces": {
      "name": "post /v2/gen-ai/workspaces",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/gen-ai/workspaces"
        }
      }
    },
    "put_v2_gen-ai_workspaces__workspace_uuid_": {
      "name": "put /v2/gen-ai/workspaces/{workspace_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/workspaces/{workspace_uuid}"
        }
      }
    },
    "delete_v2_gen-ai_workspaces__workspace_uuid_": {
      "name": "delete /v2/gen-ai/workspaces/{workspace_uuid}",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v2/gen-ai/workspaces/{workspace_uuid}"
        }
      }
    },
    "put_v2_gen-ai_workspaces__workspace_uuid__agents": {
      "name": "put /v2/gen-ai/workspaces/{workspace_uuid}/agents",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/gen-ai/workspaces/{workspace_uuid}/agents"
        }
      }
    },
    "post_v1_chat_completions": {
      "name": "post /v1/chat/completions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/chat/completions"
        }
      }
    },
    "post_v1_messages": {
      "name": "post /v1/messages",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/messages"
        }
      }
    },
    "post_v1_embeddings": {
      "name": "post /v1/embeddings",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/embeddings"
        }
      }
    },
    "post_api_v1_chat_completions": {
      "name": "post /api/v1/chat/completions",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/api/v1/chat/completions"
        }
      }
    },
    "post_v1_images_generations": {
      "name": "post /v1/images/generations",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/images/generations"
        }
      }
    },
    "post_v1_responses": {
      "name": "post /v1/responses",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/responses"
        }
      }
    },
    "post_v1_async-invoke": {
      "name": "post /v1/async-invoke",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/async-invoke"
        }
      }
    },
    "post_v1_batches_files": {
      "name": "post /v1/batches/files",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/batches/files"
        }
      }
    },
    "put_<upload_url>": {
      "name": "put /<upload_url>",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/<upload_url>"
        }
      }
    },
    "post_v1_batches": {
      "name": "post /v1/batches",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/batches"
        }
      }
    },
    "post_v1_batches__batch_id__cancel": {
      "name": "post /v1/batches/{batch_id}/cancel",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/batches/{batch_id}/cancel"
        }
      }
    }
  }
};

export default spec;
