import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "pipedrive",
  "type": "http",
  "connection": {
    "provider": "pipedrive",
    "baseUrl": "https://api.pipedrive.com/v1"
  },
  "schemas": {},
  "entities": {},
  "queries": {
    "getActivityFields": {
      "name": "Get all activity fields",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/activityFields"
        }
      }
    },
    "getActivityTypes": {
      "name": "Get all activity types",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/activityTypes"
        }
      }
    },
    "getCompanyAddons": {
      "name": "Get all add-ons for a single company",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/billing/subscriptions/addons"
        }
      }
    },
    "getUserCallLogs": {
      "name": "Get all call logs assigned to a particular user",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "user_id": {
                  "type": "number"
                },
                "activity_id": {
                  "type": "number"
                },
                "subject": {
                  "type": "string"
                },
                "duration": {
                  "type": "string"
                },
                "outcome": {
                  "type": "string"
                },
                "from_phone_number": {
                  "type": "string"
                },
                "to_phone_number": {
                  "type": "string"
                },
                "start_time": {
                  "type": "string"
                },
                "end_time": {
                  "type": "string"
                },
                "person_id": {
                  "type": "number"
                },
                "org_id": {
                  "type": "number"
                },
                "deal_id": {
                  "type": "number"
                },
                "lead_id": {
                  "type": "string"
                },
                "note": {
                  "type": "string"
                }
              },
              "required": [
                "to_phone_number",
                "outcome",
                "start_time",
                "end_time"
              ]
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "pagination": {
                "type": "object",
                "properties": {
                  "start": {
                    "type": "number"
                  },
                  "limit": {
                    "type": "number"
                  },
                  "more_items_in_collection": {
                    "type": "boolean"
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/callLogs",
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getCallLog": {
      "name": "Get details of a call log",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "user_id": {
                "type": "number"
              },
              "activity_id": {
                "type": "number"
              },
              "subject": {
                "type": "string"
              },
              "duration": {
                "type": "string"
              },
              "outcome": {
                "type": "string"
              },
              "from_phone_number": {
                "type": "string"
              },
              "to_phone_number": {
                "type": "string"
              },
              "start_time": {
                "type": "string"
              },
              "end_time": {
                "type": "string"
              },
              "person_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              },
              "deal_id": {
                "type": "number"
              },
              "lead_id": {
                "type": "string"
              },
              "note": {
                "type": "string"
              }
            },
            "required": [
              "to_phone_number",
              "outcome",
              "start_time",
              "end_time"
            ]
          }
        }
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
          "path": "/callLogs/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getCurrencies": {
      "name": "Get all supported currencies",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "code": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "decimal_points": {
                  "type": "number"
                },
                "symbol": {
                  "type": "string"
                },
                "active_flag": {
                  "type": "boolean"
                },
                "is_custom_flag": {
                  "type": "boolean"
                }
              }
            }
          }
        }
      },
      "args": {
        "term": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/currencies",
          "query": {
            "term": {
              "$resolve": "args.term"
            }
          }
        }
      }
    },
    "getArchivedDeals": {
      "name": "Get all archived deals",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "creator_user_id": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "name": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string"
                    },
                    "has_pic": {
                      "type": "boolean"
                    },
                    "pic_hash": {
                      "type": "string"
                    },
                    "active_flag": {
                      "type": "boolean"
                    },
                    "value": {
                      "type": "number"
                    }
                  }
                },
                "user_id": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "name": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string"
                    },
                    "has_pic": {
                      "type": "boolean"
                    },
                    "pic_hash": {
                      "type": "string"
                    },
                    "active_flag": {
                      "type": "boolean"
                    }
                  }
                },
                "person_id": {
                  "type": "object",
                  "properties": {
                    "active_flag": {
                      "type": "boolean"
                    },
                    "name": {
                      "type": "string"
                    },
                    "email": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "label": {
                            "type": "string"
                          },
                          "value": {
                            "type": "string"
                          },
                          "primary": {
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "phone": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "label": {
                            "type": "string"
                          },
                          "value": {
                            "type": "string"
                          },
                          "primary": {
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "owner_id": {
                      "type": "number"
                    }
                  }
                },
                "org_id": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "people_count": {
                      "type": "number"
                    },
                    "owner_id": {
                      "type": "number"
                    },
                    "address": {
                      "type": "string"
                    },
                    "active_flag": {
                      "type": "boolean"
                    },
                    "cc_email": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "start": {
                "type": "number"
              },
              "limit": {
                "type": "number"
              },
              "more_items_in_collection": {
                "type": "boolean"
              }
            }
          },
          "related_objects": {
            "type": "object",
            "properties": {
              "user": {
                "type": "object",
                "properties": {
                  "USER_ID": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "number"
                      },
                      "name": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string"
                      },
                      "has_pic": {
                        "type": "number"
                      },
                      "pic_hash": {
                        "type": "string"
                      },
                      "active_flag": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              },
              "organization": {
                "type": "object",
                "properties": {
                  "ORGANIZATION_ID": {
                    "type": "object",
                    "properties": {
                      "active_flag": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              },
              "person": {
                "type": "object",
                "properties": {
                  "PERSON_ID": {
                    "type": "object",
                    "properties": {
                      "active_flag": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "user_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "filter_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "person_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "org_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "product_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pipeline_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "stage_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "status": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "sort": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "owned_by_you": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/deals/archived",
          "query": {
            "user_id": {
              "$resolve": "args.user_id"
            },
            "filter_id": {
              "$resolve": "args.filter_id"
            },
            "person_id": {
              "$resolve": "args.person_id"
            },
            "org_id": {
              "$resolve": "args.org_id"
            },
            "product_id": {
              "$resolve": "args.product_id"
            },
            "pipeline_id": {
              "$resolve": "args.pipeline_id"
            },
            "stage_id": {
              "$resolve": "args.stage_id"
            },
            "status": {
              "$resolve": "args.status"
            },
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "sort": {
              "$resolve": "args.sort"
            },
            "owned_by_you": {
              "$resolve": "args.owned_by_you"
            }
          }
        }
      }
    },
    "getDealsSummary": {
      "name": "Get deals summary",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "values_total": {
                "type": "object",
                "properties": {
                  "value": {
                    "type": "number"
                  },
                  "count": {
                    "type": "number"
                  },
                  "value_converted": {
                    "type": "number"
                  },
                  "value_formatted": {
                    "type": "string"
                  },
                  "value_converted_formatted": {
                    "type": "string"
                  }
                }
              },
              "weighted_values_total": {
                "type": "object",
                "properties": {
                  "value": {
                    "type": "number"
                  },
                  "count": {
                    "type": "number"
                  },
                  "value_formatted": {
                    "type": "string"
                  }
                }
              },
              "total_count": {
                "type": "number"
              },
              "total_currency_converted_value": {
                "type": "number"
              },
              "total_weighted_currency_converted_value": {
                "type": "number"
              },
              "total_currency_converted_value_formatted": {
                "type": "string"
              },
              "total_weighted_currency_converted_value_formatted": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "status": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "filter_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "user_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pipeline_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "stage_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/deals/summary",
          "query": {
            "status": {
              "$resolve": "args.status"
            },
            "filter_id": {
              "$resolve": "args.filter_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            },
            "pipeline_id": {
              "$resolve": "args.pipeline_id"
            },
            "stage_id": {
              "$resolve": "args.stage_id"
            }
          }
        }
      }
    },
    "getArchivedDealsSummary": {
      "name": "Get archived deals summary",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "values_total": {
                "type": "object",
                "properties": {
                  "value": {
                    "type": "number"
                  },
                  "count": {
                    "type": "number"
                  },
                  "value_converted": {
                    "type": "number"
                  },
                  "value_formatted": {
                    "type": "string"
                  },
                  "value_converted_formatted": {
                    "type": "string"
                  }
                }
              },
              "weighted_values_total": {
                "type": "object",
                "properties": {
                  "value": {
                    "type": "number"
                  },
                  "count": {
                    "type": "number"
                  },
                  "value_formatted": {
                    "type": "string"
                  }
                }
              },
              "total_count": {
                "type": "number"
              },
              "total_currency_converted_value": {
                "type": "number"
              },
              "total_weighted_currency_converted_value": {
                "type": "number"
              },
              "total_currency_converted_value_formatted": {
                "type": "string"
              },
              "total_weighted_currency_converted_value_formatted": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "status": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "filter_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "user_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pipeline_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "stage_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/deals/summary/archived",
          "query": {
            "status": {
              "$resolve": "args.status"
            },
            "filter_id": {
              "$resolve": "args.filter_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            },
            "pipeline_id": {
              "$resolve": "args.pipeline_id"
            },
            "stage_id": {
              "$resolve": "args.stage_id"
            }
          }
        }
      }
    },
    "getDealsTimeline": {
      "name": "Get deals timeline",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "period_start": {
                "type": "string"
              },
              "period_end": {
                "type": "string"
              },
              "deals": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "creator_user_id": {
                      "type": "number"
                    },
                    "user_id": {
                      "type": "number"
                    },
                    "person_id": {
                      "type": "number"
                    },
                    "org_id": {
                      "type": "number"
                    }
                  }
                }
              },
              "totals": {
                "type": "object",
                "properties": {
                  "count": {
                    "type": "number"
                  },
                  "values": {
                    "type": "object",
                    "properties": {}
                  },
                  "weighted_values": {
                    "type": "object",
                    "properties": {}
                  },
                  "open_count": {
                    "type": "number"
                  },
                  "open_values": {
                    "type": "object",
                    "properties": {}
                  },
                  "weighted_open_values": {
                    "type": "object",
                    "properties": {}
                  },
                  "won_count": {
                    "type": "number"
                  },
                  "won_values": {
                    "type": "object",
                    "properties": {}
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "start_date": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "interval": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "amount": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "field_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pipeline_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "filter_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "exclude_deals": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "totals_convert_currency": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/deals/timeline",
          "query": {
            "start_date": {
              "$resolve": "args.start_date"
            },
            "interval": {
              "$resolve": "args.interval"
            },
            "amount": {
              "$resolve": "args.amount"
            },
            "field_key": {
              "$resolve": "args.field_key"
            },
            "user_id": {
              "$resolve": "args.user_id"
            },
            "pipeline_id": {
              "$resolve": "args.pipeline_id"
            },
            "filter_id": {
              "$resolve": "args.filter_id"
            },
            "exclude_deals": {
              "$resolve": "args.exclude_deals"
            },
            "totals_convert_currency": {
              "$resolve": "args.totals_convert_currency"
            }
          }
        }
      }
    },
    "getArchivedDealsTimeline": {
      "name": "Get archived deals timeline",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "period_start": {
                "type": "string"
              },
              "period_end": {
                "type": "string"
              },
              "deals": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "creator_user_id": {
                      "type": "number"
                    },
                    "user_id": {
                      "type": "number"
                    },
                    "person_id": {
                      "type": "number"
                    },
                    "org_id": {
                      "type": "number"
                    }
                  }
                }
              },
              "totals": {
                "type": "object",
                "properties": {
                  "count": {
                    "type": "number"
                  },
                  "values": {
                    "type": "object",
                    "properties": {}
                  },
                  "weighted_values": {
                    "type": "object",
                    "properties": {}
                  },
                  "open_count": {
                    "type": "number"
                  },
                  "open_values": {
                    "type": "object",
                    "properties": {}
                  },
                  "weighted_open_values": {
                    "type": "object",
                    "properties": {}
                  },
                  "won_count": {
                    "type": "number"
                  },
                  "won_values": {
                    "type": "object",
                    "properties": {}
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "start_date": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "interval": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "amount": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "field_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pipeline_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "filter_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "exclude_deals": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "totals_convert_currency": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/deals/timeline/archived",
          "query": {
            "start_date": {
              "$resolve": "args.start_date"
            },
            "interval": {
              "$resolve": "args.interval"
            },
            "amount": {
              "$resolve": "args.amount"
            },
            "field_key": {
              "$resolve": "args.field_key"
            },
            "user_id": {
              "$resolve": "args.user_id"
            },
            "pipeline_id": {
              "$resolve": "args.pipeline_id"
            },
            "filter_id": {
              "$resolve": "args.filter_id"
            },
            "exclude_deals": {
              "$resolve": "args.exclude_deals"
            },
            "totals_convert_currency": {
              "$resolve": "args.totals_convert_currency"
            }
          }
        }
      }
    },
    "getDealChangelog": {
      "name": "List updates about deal field values",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/deals/{id}/changelog",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "cursor": {
              "$resolve": "args.cursor"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getDealFiles": {
      "name": "List files attached to a deal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "sort": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/deals/{id}/files",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "sort": {
              "$resolve": "args.sort"
            }
          }
        }
      }
    },
    "getDealUpdates": {
      "name": "List updates about a deal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "all_changes": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "items": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/deals/{id}/flow",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "all_changes": {
              "$resolve": "args.all_changes"
            },
            "items": {
              "$resolve": "args.items"
            }
          }
        }
      }
    },
    "getDealParticipantsChangelog": {
      "name": "List updates about participants of a deal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "actor_user_id": {
                  "type": "number"
                },
                "person_id": {
                  "type": "number"
                },
                "action": {
                  "type": "string"
                },
                "time": {
                  "type": "string"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "start": {
                "type": "number"
              },
              "limit": {
                "type": "number"
              },
              "more_items_in_collection": {
                "type": "boolean"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/deals/{id}/participantsChangelog",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "limit": {
              "$resolve": "args.limit"
            },
            "cursor": {
              "$resolve": "args.cursor"
            }
          }
        }
      }
    },
    "getDealFollowers": {
      "name": "List followers of a deal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/deals/{id}/followers",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getDealMailMessages": {
      "name": "List mail messages associated with a deal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/deals/{id}/mailMessages",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getDealParticipants": {
      "name": "List participants of a deal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "person_id": {
                  "type": "object",
                  "properties": {
                    "active_flag": {
                      "type": "boolean"
                    },
                    "name": {
                      "type": "string"
                    },
                    "email": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "value": {
                            "type": "string"
                          },
                          "primary": {
                            "type": "boolean"
                          },
                          "label": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "phone": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "value": {
                            "type": "string"
                          },
                          "primary": {
                            "type": "boolean"
                          },
                          "label": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "owner_id": {
                      "type": "number"
                    },
                    "company_id": {
                      "type": "number"
                    },
                    "value": {
                      "type": "number"
                    }
                  }
                },
                "add_time": {
                  "type": "string"
                },
                "active_flag": {
                  "type": "boolean"
                },
                "related_item_data": {
                  "type": "object",
                  "properties": {
                    "deal_id": {
                      "type": "number"
                    },
                    "title": {
                      "type": "string"
                    }
                  }
                },
                "person": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "company_id": {
                      "type": "number"
                    },
                    "active_flag": {
                      "type": "boolean"
                    },
                    "phone": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "value": {
                            "type": "string"
                          },
                          "primary": {
                            "type": "boolean"
                          },
                          "label": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "email": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "value": {
                            "type": "string"
                          },
                          "primary": {
                            "type": "boolean"
                          },
                          "label": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "first_char": {
                      "type": "string"
                    },
                    "add_time": {
                      "type": "string"
                    },
                    "update_time": {
                      "type": "string"
                    },
                    "visible_to": {
                      "type": "string"
                    },
                    "picture_id": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number"
                        },
                        "item_type": {
                          "type": "string"
                        },
                        "item_id": {
                          "type": "number"
                        },
                        "active_flag": {
                          "type": "boolean"
                        },
                        "add_time": {
                          "type": "string"
                        },
                        "update_time": {
                          "type": "string"
                        },
                        "added_by_user_id": {
                          "type": "number"
                        },
                        "pictures": {
                          "type": "object",
                          "properties": {
                            "128": {
                              "type": "string"
                            },
                            "512": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    },
                    "label": {
                      "type": "number"
                    },
                    "label_ids": {
                      "type": "array",
                      "items": {
                        "type": "number"
                      }
                    },
                    "org_name": {
                      "type": "string"
                    },
                    "owner_name": {
                      "type": "string"
                    },
                    "cc_email": {
                      "type": "string"
                    }
                  }
                },
                "added_by_user_id": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    }
                  }
                },
                "related_item_type": {
                  "type": "string"
                },
                "related_item_id": {
                  "type": "number"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "start": {
                "type": "number"
              },
              "limit": {
                "type": "number"
              },
              "more_items_in_collection": {
                "type": "boolean"
              }
            }
          },
          "related_objects": {
            "type": "object",
            "properties": {
              "user": {
                "type": "object",
                "properties": {
                  "USER_ID": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "number"
                      },
                      "name": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string"
                      },
                      "has_pic": {
                        "type": "number"
                      },
                      "pic_hash": {
                        "type": "string"
                      },
                      "active_flag": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              },
              "organization": {
                "type": "object",
                "properties": {
                  "ORGANIZATION_ID": {
                    "type": "object",
                    "properties": {
                      "active_flag": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              },
              "person": {
                "type": "object",
                "properties": {
                  "PERSON_ID": {
                    "type": "object",
                    "properties": {
                      "active_flag": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/deals/{id}/participants",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getDealUsers": {
      "name": "List permitted users",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/deals/{id}/permittedUsers",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getDealFields": {
      "name": "Get all deal fields",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/dealFields",
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getDealField": {
      "name": "Get one deal field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/dealFields/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getFiles": {
      "name": "Get all files",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "user_id": {
                  "type": "number"
                },
                "deal_id": {
                  "type": "number"
                },
                "person_id": {
                  "type": "number"
                },
                "org_id": {
                  "type": "number"
                },
                "product_id": {
                  "type": "number"
                },
                "activity_id": {
                  "type": "number"
                },
                "lead_id": {
                  "type": "string"
                },
                "add_time": {
                  "type": "string"
                },
                "update_time": {
                  "type": "string"
                },
                "file_name": {
                  "type": "string"
                },
                "file_size": {
                  "type": "number"
                },
                "active_flag": {
                  "type": "boolean"
                },
                "inline_flag": {
                  "type": "boolean"
                },
                "remote_location": {
                  "type": "string"
                },
                "remote_id": {
                  "type": "string"
                },
                "cid": {
                  "type": "string"
                },
                "s3_bucket": {
                  "type": "string"
                },
                "mail_message_id": {
                  "type": "string"
                },
                "mail_template_id": {
                  "type": "string"
                },
                "deal_name": {
                  "type": "string"
                },
                "person_name": {
                  "type": "string"
                },
                "org_name": {
                  "type": "string"
                },
                "product_name": {
                  "type": "string"
                },
                "lead_name": {
                  "type": "string"
                },
                "url": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "pagination": {
                "type": "object",
                "properties": {
                  "start": {
                    "type": "number"
                  },
                  "limit": {
                    "type": "number"
                  },
                  "more_items_in_collection": {
                    "type": "boolean"
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "sort": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/files",
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "sort": {
              "$resolve": "args.sort"
            }
          }
        }
      }
    },
    "getFile": {
      "name": "Get one file",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "user_id": {
                "type": "number"
              },
              "deal_id": {
                "type": "number"
              },
              "person_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              },
              "product_id": {
                "type": "number"
              },
              "activity_id": {
                "type": "number"
              },
              "lead_id": {
                "type": "string"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              },
              "file_name": {
                "type": "string"
              },
              "file_size": {
                "type": "number"
              },
              "active_flag": {
                "type": "boolean"
              },
              "inline_flag": {
                "type": "boolean"
              },
              "remote_location": {
                "type": "string"
              },
              "remote_id": {
                "type": "string"
              },
              "cid": {
                "type": "string"
              },
              "s3_bucket": {
                "type": "string"
              },
              "mail_message_id": {
                "type": "string"
              },
              "mail_template_id": {
                "type": "string"
              },
              "deal_name": {
                "type": "string"
              },
              "person_name": {
                "type": "string"
              },
              "org_name": {
                "type": "string"
              },
              "product_name": {
                "type": "string"
              },
              "lead_name": {
                "type": "string"
              },
              "url": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/files/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "downloadFile": {
      "name": "Download one file",
      "schema": {
        "type": "object"
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/files/{id}/download",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getFilters": {
      "name": "Get all filters",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "type": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/filters",
          "query": {
            "type": {
              "$resolve": "args.type"
            }
          }
        }
      }
    },
    "getFilterHelpers": {
      "name": "Get all filter helpers",
      "schema": {
        "type": "object",
        "properties": {}
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/filters/helpers"
        }
      }
    },
    "getFilter": {
      "name": "Get one filter",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "include_field_code": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/filters/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "include_field_code": {
              "$resolve": "args.include_field_code"
            }
          }
        }
      }
    },
    "getGoals": {
      "name": "Find goals",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "goals": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "owner_id": {
                      "type": "number"
                    },
                    "title": {
                      "type": "string"
                    },
                    "type": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "params": {
                          "type": "object",
                          "properties": {
                            "pipeline_id": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            },
                            "activity_type_id": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          }
                        }
                      }
                    },
                    "assignee": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number"
                        },
                        "type": {
                          "type": "string"
                        }
                      }
                    },
                    "interval": {
                      "type": "string"
                    },
                    "duration": {
                      "type": "object",
                      "properties": {
                        "start": {
                          "type": "string"
                        },
                        "end": {
                          "type": "string"
                        }
                      }
                    },
                    "expected_outcome": {
                      "type": "object",
                      "properties": {
                        "target": {
                          "type": "number"
                        },
                        "tracking_metric": {
                          "type": "string"
                        }
                      }
                    },
                    "is_active": {
                      "type": "boolean"
                    },
                    "report_ids": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "type.name": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "title": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "is_active": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "assignee.id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "assignee.type": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "expected_outcome.target": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "expected_outcome.tracking_metric": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "expected_outcome.currency_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "type.params.pipeline_id": {
          "schema": {
            "type": "array",
            "items": {
              "type": "number"
            }
          },
          "required": false
        },
        "type.params.stage_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "type.params.activity_type_id": {
          "schema": {
            "type": "array",
            "items": {
              "type": "number"
            }
          },
          "required": false
        },
        "period.start": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "period.end": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/goals/find",
          "query": {
            "type.name": {
              "$resolve": "args.type.name"
            },
            "title": {
              "$resolve": "args.title"
            },
            "is_active": {
              "$resolve": "args.is_active"
            },
            "assignee.id": {
              "$resolve": "args.assignee.id"
            },
            "assignee.type": {
              "$resolve": "args.assignee.type"
            },
            "expected_outcome.target": {
              "$resolve": "args.expected_outcome.target"
            },
            "expected_outcome.tracking_metric": {
              "$resolve": "args.expected_outcome.tracking_metric"
            },
            "expected_outcome.currency_id": {
              "$resolve": "args.expected_outcome.currency_id"
            },
            "type.params.pipeline_id": {
              "$resolve": "args.type.params.pipeline_id"
            },
            "type.params.stage_id": {
              "$resolve": "args.type.params.stage_id"
            },
            "type.params.activity_type_id": {
              "$resolve": "args.type.params.activity_type_id"
            },
            "period.start": {
              "$resolve": "args.period.start"
            },
            "period.end": {
              "$resolve": "args.period.end"
            }
          }
        }
      }
    },
    "getGoalResult": {
      "name": "Get result of a goal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "progress": {
                "type": "number"
              },
              "goal": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "owner_id": {
                    "type": "number"
                  },
                  "title": {
                    "type": "string"
                  },
                  "type": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "params": {
                        "type": "object",
                        "properties": {
                          "pipeline_id": {
                            "type": "array",
                            "items": {
                              "type": "number"
                            }
                          },
                          "activity_type_id": {
                            "type": "array",
                            "items": {
                              "type": "number"
                            }
                          }
                        }
                      }
                    }
                  },
                  "assignee": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "number"
                      },
                      "type": {
                        "type": "string"
                      }
                    }
                  },
                  "interval": {
                    "type": "string"
                  },
                  "duration": {
                    "type": "object",
                    "properties": {
                      "start": {
                        "type": "string"
                      },
                      "end": {
                        "type": "string"
                      }
                    }
                  },
                  "expected_outcome": {
                    "type": "object",
                    "properties": {
                      "target": {
                        "type": "number"
                      },
                      "tracking_metric": {
                        "type": "string"
                      }
                    }
                  },
                  "is_active": {
                    "type": "boolean"
                  },
                  "report_ids": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "period.start": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "period.end": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/goals/{id}/results",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "period.start": {
              "$resolve": "args.period.start"
            },
            "period.end": {
              "$resolve": "args.period.end"
            }
          }
        }
      }
    },
    "getLeads": {
      "name": "Get all leads",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
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
                "title": {
                  "type": "string"
                },
                "owner_id": {
                  "type": "number"
                },
                "creator_id": {
                  "type": "number"
                },
                "label_ids": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "person_id": {
                  "type": "number"
                },
                "organization_id": {
                  "type": "number"
                },
                "source_name": {
                  "type": "string"
                },
                "origin": {
                  "type": "string"
                },
                "origin_id": {
                  "type": "string"
                },
                "channel": {
                  "type": "number"
                },
                "channel_id": {
                  "type": "string"
                },
                "source_deal_id": {
                  "type": "number"
                },
                "is_archived": {
                  "type": "boolean"
                },
                "was_seen": {
                  "type": "boolean"
                },
                "value": {
                  "type": "object",
                  "properties": {
                    "amount": {
                      "type": "number"
                    },
                    "currency": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "amount",
                    "currency"
                  ]
                },
                "expected_close_date": {
                  "type": "string"
                },
                "next_activity_id": {
                  "type": "number"
                },
                "add_time": {
                  "type": "string"
                },
                "update_time": {
                  "type": "string"
                },
                "visible_to": {
                  "type": "string"
                },
                "cc_email": {
                  "type": "string"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "start": {
                "type": "number"
              },
              "limit": {
                "type": "number"
              },
              "more_items_in_collection": {
                "type": "boolean"
              }
            }
          }
        }
      },
      "args": {
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "owner_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "person_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "organization_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "filter_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "updated_since": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "sort": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/leads",
          "query": {
            "limit": {
              "$resolve": "args.limit"
            },
            "start": {
              "$resolve": "args.start"
            },
            "owner_id": {
              "$resolve": "args.owner_id"
            },
            "person_id": {
              "$resolve": "args.person_id"
            },
            "organization_id": {
              "$resolve": "args.organization_id"
            },
            "filter_id": {
              "$resolve": "args.filter_id"
            },
            "updated_since": {
              "$resolve": "args.updated_since"
            },
            "sort": {
              "$resolve": "args.sort"
            }
          }
        }
      }
    },
    "getArchivedLeads": {
      "name": "Get all archived leads",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
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
                "title": {
                  "type": "string"
                },
                "owner_id": {
                  "type": "number"
                },
                "creator_id": {
                  "type": "number"
                },
                "label_ids": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "person_id": {
                  "type": "number"
                },
                "organization_id": {
                  "type": "number"
                },
                "source_name": {
                  "type": "string"
                },
                "origin": {
                  "type": "string"
                },
                "origin_id": {
                  "type": "string"
                },
                "channel": {
                  "type": "number"
                },
                "channel_id": {
                  "type": "string"
                },
                "source_deal_id": {
                  "type": "number"
                },
                "is_archived": {
                  "type": "boolean"
                },
                "was_seen": {
                  "type": "boolean"
                },
                "value": {
                  "type": "object",
                  "properties": {
                    "amount": {
                      "type": "number"
                    },
                    "currency": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "amount",
                    "currency"
                  ]
                },
                "expected_close_date": {
                  "type": "string"
                },
                "next_activity_id": {
                  "type": "number"
                },
                "add_time": {
                  "type": "string"
                },
                "update_time": {
                  "type": "string"
                },
                "visible_to": {
                  "type": "string"
                },
                "cc_email": {
                  "type": "string"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "start": {
                "type": "number"
              },
              "limit": {
                "type": "number"
              },
              "more_items_in_collection": {
                "type": "boolean"
              }
            }
          }
        }
      },
      "args": {
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "owner_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "person_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "organization_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "filter_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "sort": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/leads/archived",
          "query": {
            "limit": {
              "$resolve": "args.limit"
            },
            "start": {
              "$resolve": "args.start"
            },
            "owner_id": {
              "$resolve": "args.owner_id"
            },
            "person_id": {
              "$resolve": "args.person_id"
            },
            "organization_id": {
              "$resolve": "args.organization_id"
            },
            "filter_id": {
              "$resolve": "args.filter_id"
            },
            "sort": {
              "$resolve": "args.sort"
            }
          }
        }
      }
    },
    "getLead": {
      "name": "Get one lead",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "title": {
                "type": "string"
              },
              "owner_id": {
                "type": "number"
              },
              "creator_id": {
                "type": "number"
              },
              "label_ids": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "person_id": {
                "type": "number"
              },
              "organization_id": {
                "type": "number"
              },
              "source_name": {
                "type": "string"
              },
              "origin": {
                "type": "string"
              },
              "origin_id": {
                "type": "string"
              },
              "channel": {
                "type": "number"
              },
              "channel_id": {
                "type": "string"
              },
              "source_deal_id": {
                "type": "number"
              },
              "is_archived": {
                "type": "boolean"
              },
              "was_seen": {
                "type": "boolean"
              },
              "value": {
                "type": "object",
                "properties": {
                  "amount": {
                    "type": "number"
                  },
                  "currency": {
                    "type": "string"
                  }
                },
                "required": [
                  "amount",
                  "currency"
                ]
              },
              "expected_close_date": {
                "type": "string"
              },
              "next_activity_id": {
                "type": "number"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              },
              "visible_to": {
                "type": "string"
              },
              "cc_email": {
                "type": "string"
              }
            }
          }
        }
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
          "path": "/leads/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getLeadUsers": {
      "name": "List permitted users",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
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
          "path": "/leads/{id}/permittedUsers",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "searchLeads": {
      "name": "Search leads",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "term": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "fields": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "exact_match": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "person_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "organization_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "include_fields": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/leads/search",
          "query": {
            "term": {
              "$resolve": "args.term"
            },
            "fields": {
              "$resolve": "args.fields"
            },
            "exact_match": {
              "$resolve": "args.exact_match"
            },
            "person_id": {
              "$resolve": "args.person_id"
            },
            "organization_id": {
              "$resolve": "args.organization_id"
            },
            "include_fields": {
              "$resolve": "args.include_fields"
            },
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getLeadFields": {
      "name": "Get all lead fields",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/leadFields",
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getLeadLabels": {
      "name": "Get all lead labels",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
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
                "color": {
                  "type": "string"
                },
                "add_time": {
                  "type": "string"
                },
                "update_time": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/leadLabels"
        }
      }
    },
    "getLeadSources": {
      "name": "Get all lead sources",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/leadSources"
        }
      }
    },
    "getTeams": {
      "name": "Get all teams",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "order_by": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "skip_users": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/legacyTeams",
          "query": {
            "order_by": {
              "$resolve": "args.order_by"
            },
            "skip_users": {
              "$resolve": "args.skip_users"
            }
          }
        }
      }
    },
    "getTeam": {
      "name": "Get a single team",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "skip_users": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/legacyTeams/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "skip_users": {
              "$resolve": "args.skip_users"
            }
          }
        }
      }
    },
    "getTeamUsers": {
      "name": "Get all users in a team",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/legacyTeams/{id}/users",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getUserTeams": {
      "name": "Get all teams of a user",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "order_by": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "skip_users": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/legacyTeams/user/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "order_by": {
              "$resolve": "args.order_by"
            },
            "skip_users": {
              "$resolve": "args.skip_users"
            }
          }
        }
      }
    },
    "getMailMessage": {
      "name": "Get one mail message",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "statusCode": {
            "type": "number"
          },
          "statusText": {
            "type": "string"
          },
          "service": {
            "type": "string"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "include_body": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/mailbox/mailMessages/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "include_body": {
              "$resolve": "args.include_body"
            }
          }
        }
      }
    },
    "getMailThreads": {
      "name": "Get mail threads",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "folder": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/mailbox/mailThreads",
          "query": {
            "folder": {
              "$resolve": "args.folder"
            },
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getMailThread": {
      "name": "Get one mail thread",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/mailbox/mailThreads/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getMailThreadMessages": {
      "name": "Get all mail messages of mail thread",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/mailbox/mailThreads/{id}/mailMessages",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getNotes": {
      "name": "Get all notes",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "active_flag": {
                  "type": "boolean"
                },
                "add_time": {
                  "type": "string"
                },
                "content": {
                  "type": "string"
                },
                "deal": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string"
                    }
                  }
                },
                "lead_id": {
                  "type": "string"
                },
                "deal_id": {
                  "type": "number"
                },
                "last_update_user_id": {
                  "type": "number"
                },
                "org_id": {
                  "type": "number"
                },
                "organization": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    }
                  }
                },
                "person": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    }
                  }
                },
                "person_id": {
                  "type": "number"
                },
                "project_id": {
                  "type": "number"
                },
                "project": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string"
                    }
                  }
                },
                "task_id": {
                  "type": "number"
                },
                "task": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string"
                    }
                  }
                },
                "pinned_to_deal_flag": {
                  "type": "boolean"
                },
                "pinned_to_organization_flag": {
                  "type": "boolean"
                },
                "pinned_to_person_flag": {
                  "type": "boolean"
                },
                "pinned_to_project_flag": {
                  "type": "boolean"
                },
                "pinned_to_task_flag": {
                  "type": "boolean"
                },
                "update_time": {
                  "type": "string"
                },
                "user": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string"
                    },
                    "icon_url": {
                      "type": "string"
                    },
                    "is_you": {
                      "type": "boolean"
                    },
                    "name": {
                      "type": "string"
                    }
                  }
                },
                "user_id": {
                  "type": "number"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "pagination": {
                "type": "object",
                "properties": {
                  "next_start": {
                    "type": "number"
                  },
                  "start": {
                    "type": "number"
                  },
                  "limit": {
                    "type": "number"
                  },
                  "more_items_in_collection": {
                    "type": "boolean"
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "user_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "lead_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "deal_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "person_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "org_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "project_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "task_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "sort": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "start_date": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "end_date": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "updated_since": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "pinned_to_lead_flag": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pinned_to_deal_flag": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pinned_to_organization_flag": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pinned_to_person_flag": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pinned_to_project_flag": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pinned_to_task_flag": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/notes",
          "query": {
            "user_id": {
              "$resolve": "args.user_id"
            },
            "lead_id": {
              "$resolve": "args.lead_id"
            },
            "deal_id": {
              "$resolve": "args.deal_id"
            },
            "person_id": {
              "$resolve": "args.person_id"
            },
            "org_id": {
              "$resolve": "args.org_id"
            },
            "project_id": {
              "$resolve": "args.project_id"
            },
            "task_id": {
              "$resolve": "args.task_id"
            },
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "sort": {
              "$resolve": "args.sort"
            },
            "start_date": {
              "$resolve": "args.start_date"
            },
            "end_date": {
              "$resolve": "args.end_date"
            },
            "updated_since": {
              "$resolve": "args.updated_since"
            },
            "pinned_to_lead_flag": {
              "$resolve": "args.pinned_to_lead_flag"
            },
            "pinned_to_deal_flag": {
              "$resolve": "args.pinned_to_deal_flag"
            },
            "pinned_to_organization_flag": {
              "$resolve": "args.pinned_to_organization_flag"
            },
            "pinned_to_person_flag": {
              "$resolve": "args.pinned_to_person_flag"
            },
            "pinned_to_project_flag": {
              "$resolve": "args.pinned_to_project_flag"
            },
            "pinned_to_task_flag": {
              "$resolve": "args.pinned_to_task_flag"
            }
          }
        }
      }
    },
    "getNote": {
      "name": "Get one note",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "active_flag": {
                "type": "boolean"
              },
              "add_time": {
                "type": "string"
              },
              "content": {
                "type": "string"
              },
              "deal": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  }
                }
              },
              "lead_id": {
                "type": "string"
              },
              "deal_id": {
                "type": "number"
              },
              "last_update_user_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              },
              "organization": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  }
                }
              },
              "person": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  }
                }
              },
              "person_id": {
                "type": "number"
              },
              "project_id": {
                "type": "number"
              },
              "project": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  }
                }
              },
              "task_id": {
                "type": "number"
              },
              "task": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  }
                }
              },
              "pinned_to_deal_flag": {
                "type": "boolean"
              },
              "pinned_to_organization_flag": {
                "type": "boolean"
              },
              "pinned_to_person_flag": {
                "type": "boolean"
              },
              "pinned_to_project_flag": {
                "type": "boolean"
              },
              "pinned_to_task_flag": {
                "type": "boolean"
              },
              "update_time": {
                "type": "string"
              },
              "user": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "icon_url": {
                    "type": "string"
                  },
                  "is_you": {
                    "type": "boolean"
                  },
                  "name": {
                    "type": "string"
                  }
                }
              },
              "user_id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/notes/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getNoteComments": {
      "name": "Get all comments for a note",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "uuid": {
                  "type": "string"
                },
                "active_flag": {
                  "type": "boolean"
                },
                "add_time": {
                  "type": "string"
                },
                "update_time": {
                  "type": "string"
                },
                "content": {
                  "type": "string"
                },
                "object_id": {
                  "type": "string"
                },
                "object_type": {
                  "type": "string"
                },
                "user_id": {
                  "type": "number"
                },
                "updater_id": {
                  "type": "number"
                },
                "company_id": {
                  "type": "number"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "pagination": {
                "type": "object",
                "properties": {
                  "next_start": {
                    "type": "number"
                  },
                  "start": {
                    "type": "number"
                  },
                  "limit": {
                    "type": "number"
                  },
                  "more_items_in_collection": {
                    "type": "boolean"
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/notes/{id}/comments",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getComment": {
      "name": "Get one comment",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "uuid": {
                "type": "string"
              },
              "active_flag": {
                "type": "boolean"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              },
              "content": {
                "type": "string"
              },
              "object_id": {
                "type": "string"
              },
              "object_type": {
                "type": "string"
              },
              "user_id": {
                "type": "number"
              },
              "updater_id": {
                "type": "number"
              },
              "company_id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "commentId": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/notes/{id}/comments/{commentId}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "commentId": {
              "$resolve": "args.commentId"
            }
          }
        }
      }
    },
    "getNoteFields": {
      "name": "Get all note fields",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/noteFields"
        }
      }
    },
    "authorize": {
      "name": "Requesting authorization",
      "schema": {
        "type": "object"
      },
      "args": {
        "client_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "redirect_uri": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "state": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/oauth/authorize",
          "query": {
            "client_id": {
              "$resolve": "args.client_id"
            },
            "redirect_uri": {
              "$resolve": "args.redirect_uri"
            },
            "state": {
              "$resolve": "args.state"
            }
          }
        }
      }
    },
    "getOrganizationChangelog": {
      "name": "List updates about organization field values",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/organizations/{id}/changelog",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "cursor": {
              "$resolve": "args.cursor"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getOrganizationFiles": {
      "name": "List files attached to an organization",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "sort": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/organizations/{id}/files",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "sort": {
              "$resolve": "args.sort"
            }
          }
        }
      }
    },
    "getOrganizationUpdates": {
      "name": "List updates about an organization",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "all_changes": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "items": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/organizations/{id}/flow",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "all_changes": {
              "$resolve": "args.all_changes"
            },
            "items": {
              "$resolve": "args.items"
            }
          }
        }
      }
    },
    "getOrganizationFollowers": {
      "name": "List followers of an organization",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "org_id": {
                  "type": "number"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "pagination": {
                "type": "object",
                "properties": {
                  "start": {
                    "type": "number"
                  },
                  "limit": {
                    "type": "number"
                  },
                  "more_items_in_collection": {
                    "type": "boolean"
                  },
                  "next_start": {
                    "type": "number"
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/organizations/{id}/followers",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getOrganizationMailMessages": {
      "name": "List mail messages associated with an organization",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/organizations/{id}/mailMessages",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getOrganizationUsers": {
      "name": "List permitted users",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/organizations/{id}/permittedUsers",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getOrganizationFields": {
      "name": "Get all organization fields",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/organizationFields",
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getOrganizationField": {
      "name": "Get one organization field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/organizationFields/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getOrganizationRelationships": {
      "name": "Get all relationships for organization",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "org_id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/organizationRelationships",
          "query": {
            "org_id": {
              "$resolve": "args.org_id"
            }
          }
        }
      }
    },
    "getOrganizationRelationship": {
      "name": "Get one organization relationship",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "org_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/organizationRelationships/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "org_id": {
              "$resolve": "args.org_id"
            }
          }
        }
      }
    },
    "getPermissionSets": {
      "name": "Get all permission sets",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "app": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/permissionSets",
          "query": {
            "app": {
              "$resolve": "args.app"
            }
          }
        }
      }
    },
    "getPermissionSet": {
      "name": "Get one permission set",
      "schema": {
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
          "app": {
            "type": "string"
          },
          "type": {
            "type": "string"
          },
          "assignment_count": {
            "type": "number"
          }
        }
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
          "path": "/permissionSets/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getPermissionSetAssignments": {
      "name": "List permission set assignments",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/permissionSets/{id}/assignments",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getPersonChangelog": {
      "name": "List updates about person field values",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/persons/{id}/changelog",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "cursor": {
              "$resolve": "args.cursor"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getPersonFiles": {
      "name": "List files attached to a person",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "sort": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/persons/{id}/files",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "sort": {
              "$resolve": "args.sort"
            }
          }
        }
      }
    },
    "getPersonUpdates": {
      "name": "List updates about a person",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "all_changes": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "items": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/persons/{id}/flow",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "all_changes": {
              "$resolve": "args.all_changes"
            },
            "items": {
              "$resolve": "args.items"
            }
          }
        }
      }
    },
    "getPersonFollowers": {
      "name": "List followers of a person",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/persons/{id}/followers",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getPersonMailMessages": {
      "name": "List mail messages associated with a person",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/persons/{id}/mailMessages",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getPersonUsers": {
      "name": "List permitted users",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/persons/{id}/permittedUsers",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getPersonProducts": {
      "name": "List products associated with a person",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/persons/{id}/products",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getPersonFields": {
      "name": "Get all person fields",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/personFields",
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getPersonField": {
      "name": "Get one person field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/personFields/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getPipelineConversionStatistics": {
      "name": "Get deals conversion rates in pipeline",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start_date": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "end_date": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/pipelines/{id}/conversion_statistics",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start_date": {
              "$resolve": "args.start_date"
            },
            "end_date": {
              "$resolve": "args.end_date"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "getPipelineDeals": {
      "name": "Get deals in a pipeline",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "creator_user_id": {
                  "type": "number"
                },
                "user_id": {
                  "type": "number"
                },
                "person_id": {
                  "type": "number"
                },
                "org_id": {
                  "type": "number"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "start": {
                "type": "number"
              },
              "limit": {
                "type": "number"
              },
              "more_items_in_collection": {
                "type": "boolean"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "filter_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "user_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "everyone": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "stage_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "get_summary": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "totals_convert_currency": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/pipelines/{id}/deals",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "filter_id": {
              "$resolve": "args.filter_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            },
            "everyone": {
              "$resolve": "args.everyone"
            },
            "stage_id": {
              "$resolve": "args.stage_id"
            },
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "get_summary": {
              "$resolve": "args.get_summary"
            },
            "totals_convert_currency": {
              "$resolve": "args.totals_convert_currency"
            }
          }
        }
      }
    },
    "getPipelineMovementStatistics": {
      "name": "Get deals movements in pipeline",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start_date": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "end_date": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "user_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/pipelines/{id}/movement_statistics",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start_date": {
              "$resolve": "args.start_date"
            },
            "end_date": {
              "$resolve": "args.end_date"
            },
            "user_id": {
              "$resolve": "args.user_id"
            }
          }
        }
      }
    },
    "getProductDeals": {
      "name": "Get deals where a product is attached to",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "status": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/products/{id}/deals",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "status": {
              "$resolve": "args.status"
            }
          }
        }
      }
    },
    "getProductFiles": {
      "name": "List files attached to a product",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "sort": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/products/{id}/files",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "sort": {
              "$resolve": "args.sort"
            }
          }
        }
      }
    },
    "getProductFollowers": {
      "name": "List followers of a product",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/products/{id}/followers",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getProductUsers": {
      "name": "List permitted users",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/products/{id}/permittedUsers",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getProductFields": {
      "name": "Get all product fields",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "options": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {}
                  }
                },
                "field_type": {
                  "type": "string"
                }
              },
              "required": [
                "name",
                "field_type"
              ]
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/productFields",
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getProductField": {
      "name": "Get one product field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "options": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {}
                }
              },
              "field_type": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "field_type"
            ]
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/productFields/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getProjects": {
      "name": "Get all projects",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "next_cursor": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "filter_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "status": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "phase_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "include_archived": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projects",
          "query": {
            "cursor": {
              "$resolve": "args.cursor"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "filter_id": {
              "$resolve": "args.filter_id"
            },
            "status": {
              "$resolve": "args.status"
            },
            "phase_id": {
              "$resolve": "args.phase_id"
            },
            "include_archived": {
              "$resolve": "args.include_archived"
            }
          }
        }
      }
    },
    "getProject": {
      "name": "Get details of a project",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projects/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getProjectPlan": {
      "name": "Returns project plan",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "item_id": {
                  "type": "number"
                },
                "item_type": {
                  "type": "string"
                },
                "phase_id": {
                  "type": "number"
                },
                "group_id": {
                  "type": "number"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projects/{id}/plan",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getProjectGroups": {
      "name": "Returns project groups",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "name": {
                  "type": "string"
                },
                "order_nr": {
                  "type": "number"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projects/{id}/groups",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getProjectTasks": {
      "name": "Returns project tasks",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "next_cursor": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projects/{id}/tasks",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getProjectActivities": {
      "name": "Returns project activities",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "due_date": {
                  "type": "string"
                },
                "due_time": {
                  "type": "string"
                },
                "duration": {
                  "type": "string"
                },
                "deal_id": {
                  "type": "number"
                },
                "lead_id": {
                  "type": "string"
                },
                "person_id": {
                  "type": "number"
                },
                "project_id": {
                  "type": "number"
                },
                "org_id": {
                  "type": "number"
                },
                "location": {
                  "type": "string"
                },
                "public_description": {
                  "type": "string"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "next_cursor": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projects/{id}/activities",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getProjectsBoards": {
      "name": "Get all project boards",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "name": {
                  "type": "string"
                },
                "order_nr": {
                  "type": "number"
                },
                "add_time": {
                  "type": "string"
                },
                "update_time": {
                  "type": "string"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projects/boards"
        }
      }
    },
    "getProjectsBoard": {
      "name": "Get details of a board",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "name": {
                "type": "string"
              },
              "order_nr": {
                "type": "number"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projects/boards/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getProjectsPhases": {
      "name": "Get project phases",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "name": {
                  "type": "string"
                },
                "board_id": {
                  "type": "number"
                },
                "order_nr": {
                  "type": "number"
                },
                "add_time": {
                  "type": "string"
                },
                "update_time": {
                  "type": "string"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "board_id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projects/phases",
          "query": {
            "board_id": {
              "$resolve": "args.board_id"
            }
          }
        }
      }
    },
    "getProjectsPhase": {
      "name": "Get details of a phase",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "name": {
                "type": "string"
              },
              "board_id": {
                "type": "number"
              },
              "order_nr": {
                "type": "number"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projects/phases/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getProjectTemplates": {
      "name": "Get all project templates",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "title": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "projects_board_id": {
                  "type": "number"
                },
                "owner_id": {
                  "type": "number"
                },
                "add_time": {
                  "type": "string"
                },
                "update_time": {
                  "type": "string"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "next_cursor": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projectTemplates",
          "query": {
            "cursor": {
              "$resolve": "args.cursor"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getProjectTemplate": {
      "name": "Get details of a template",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "title": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "projects_board_id": {
                "type": "number"
              },
              "owner_id": {
                "type": "number"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/projectTemplates/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getRecents": {
      "name": "Get recents",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "item": {
                  "type": "string"
                },
                "id": {
                  "type": "number"
                },
                "data": {
                  "type": "object",
                  "properties": {
                    "due_date": {
                      "type": "string"
                    },
                    "due_time": {
                      "type": "string"
                    },
                    "duration": {
                      "type": "string"
                    },
                    "deal_id": {
                      "type": "number"
                    },
                    "lead_id": {
                      "type": "string"
                    },
                    "person_id": {
                      "type": "number"
                    },
                    "project_id": {
                      "type": "number"
                    },
                    "org_id": {
                      "type": "number"
                    },
                    "location": {
                      "type": "string"
                    },
                    "public_description": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "since_timestamp": {
                "type": "string"
              },
              "last_timestamp_on_page": {
                "type": "string"
              },
              "pagination": {
                "type": "object",
                "properties": {
                  "start": {
                    "type": "number"
                  },
                  "limit": {
                    "type": "number"
                  },
                  "more_items_in_collection": {
                    "type": "boolean"
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "since_timestamp": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "items": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/recents",
          "query": {
            "since_timestamp": {
              "$resolve": "args.since_timestamp"
            },
            "items": {
              "$resolve": "args.items"
            },
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getRoles": {
      "name": "Get all roles",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/roles",
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getRole": {
      "name": "Get one role",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/roles/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getRoleAssignments": {
      "name": "List role assignments",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/roles/{id}/assignments",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getRoleSettings": {
      "name": "List role settings",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/roles/{id}/settings",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getRolePipelines": {
      "name": "List pipeline visibility for a role",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "visible": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/roles/{id}/pipelines",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "visible": {
              "$resolve": "args.visible"
            }
          }
        }
      }
    },
    "getStageDeals": {
      "name": "Get deals in a stage",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "creator_user_id": {
                  "type": "number"
                },
                "user_id": {
                  "type": "number"
                },
                "person_id": {
                  "type": "number"
                },
                "org_id": {
                  "type": "number"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "start": {
                "type": "number"
              },
              "limit": {
                "type": "number"
              },
              "more_items_in_collection": {
                "type": "boolean"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "filter_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "user_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "everyone": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/stages/{id}/deals",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "filter_id": {
              "$resolve": "args.filter_id"
            },
            "user_id": {
              "$resolve": "args.user_id"
            },
            "everyone": {
              "$resolve": "args.everyone"
            },
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getTasks": {
      "name": "Get all tasks",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {
              "next_cursor": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "assignee_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "project_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "parent_task_id": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "done": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/tasks",
          "query": {
            "cursor": {
              "$resolve": "args.cursor"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "assignee_id": {
              "$resolve": "args.assignee_id"
            },
            "project_id": {
              "$resolve": "args.project_id"
            },
            "parent_task_id": {
              "$resolve": "args.parent_task_id"
            },
            "done": {
              "$resolve": "args.done"
            }
          }
        }
      }
    },
    "getTask": {
      "name": "Get details of a task",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/tasks/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getUsers": {
      "name": "Get all users",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users"
        }
      }
    },
    "findUsersByName": {
      "name": "Find users by name",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "term": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "search_by_email": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/find",
          "query": {
            "term": {
              "$resolve": "args.term"
            },
            "search_by_email": {
              "$resolve": "args.search_by_email"
            }
          }
        }
      }
    },
    "getCurrentUser": {
      "name": "Get current user data",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/me"
        }
      }
    },
    "getUser": {
      "name": "Get one user",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getUserFollowers": {
      "name": "List followers of a user",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/{id}/followers",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getUserPermissions": {
      "name": "List user permissions",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/{id}/permissions",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getUserRoleAssignments": {
      "name": "List role assignments",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "start": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/{id}/roleAssignments",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "start": {
              "$resolve": "args.start"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "getUserRoleSettings": {
      "name": "List user role settings",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/{id}/roleSettings",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "getUserConnections": {
      "name": "Get all user connections",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/userConnections"
        }
      }
    },
    "getUserSettings": {
      "name": "List settings of an authorized user",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/userSettings"
        }
      }
    },
    "getWebhooks": {
      "name": "Get all Webhooks",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/webhooks"
        }
      }
    }
  },
  "actions": {
    "addActivityType": {
      "name": "Add new activity type",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "icon_key": {
                "type": "string"
              },
              "color": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "icon_key"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/activityTypes",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteActivityType": {
      "name": "Delete an activity type",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/activityTypes/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "updateActivityType": {
      "name": "Update an activity type",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "icon_key": {
                "type": "string"
              },
              "color": {
                "type": "string"
              },
              "order_nr": {
                "type": "number"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/activityTypes/{id}",
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
    "addCallLog": {
      "name": "Add a call log",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "user_id": {
                "type": "number"
              },
              "activity_id": {
                "type": "number"
              },
              "subject": {
                "type": "string"
              },
              "duration": {
                "type": "string"
              },
              "outcome": {
                "type": "string"
              },
              "from_phone_number": {
                "type": "string"
              },
              "to_phone_number": {
                "type": "string"
              },
              "start_time": {
                "type": "string"
              },
              "end_time": {
                "type": "string"
              },
              "person_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              },
              "deal_id": {
                "type": "number"
              },
              "lead_id": {
                "type": "string"
              },
              "note": {
                "type": "string"
              }
            },
            "required": [
              "to_phone_number",
              "outcome",
              "start_time",
              "end_time"
            ]
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "user_id": {
                "type": "number"
              },
              "activity_id": {
                "type": "number"
              },
              "subject": {
                "type": "string"
              },
              "duration": {
                "type": "string"
              },
              "outcome": {
                "type": "string"
              },
              "from_phone_number": {
                "type": "string"
              },
              "to_phone_number": {
                "type": "string"
              },
              "start_time": {
                "type": "string"
              },
              "end_time": {
                "type": "string"
              },
              "person_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              },
              "deal_id": {
                "type": "number"
              },
              "lead_id": {
                "type": "string"
              },
              "note": {
                "type": "string"
              }
            },
            "required": [
              "to_phone_number",
              "outcome",
              "start_time",
              "end_time"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/callLogs",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteCallLog": {
      "name": "Delete a call log",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
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
          "path": "/callLogs/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "addCallLogAudioFile": {
      "name": "Attach an audio file to the call log",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
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
          "path": "/callLogs/{id}/recordings",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "addChannel": {
      "name": "Add a channel",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "avatar_url": {
                "type": "string"
              },
              "provider_channel_id": {
                "type": "string"
              },
              "marketplace_client_id": {
                "type": "string"
              },
              "pd_company_id": {
                "type": "number"
              },
              "pd_user_id": {
                "type": "number"
              },
              "created_at": {
                "type": "string"
              },
              "provider_type": {
                "type": "string"
              },
              "template_support": {
                "type": "boolean"
              }
            }
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "provider_channel_id": {
                "type": "string"
              },
              "avatar_url": {
                "type": "string"
              },
              "template_support": {
                "type": "boolean"
              },
              "provider_type": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "provider_channel_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/channels",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteChannel": {
      "name": "Delete a channel",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
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
          "path": "/channels/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "receiveMessage": {
      "name": "Receives an incoming message",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "channel_id": {
                "type": "string"
              },
              "sender_id": {
                "type": "string"
              },
              "conversation_id": {
                "type": "string"
              },
              "message": {
                "type": "string"
              },
              "status": {
                "type": "string"
              },
              "created_at": {
                "type": "string"
              },
              "reply_by": {
                "type": "string"
              },
              "conversation_link": {
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
                    "type": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "size": {
                      "type": "number"
                    },
                    "url": {
                      "type": "string"
                    },
                    "preview_url": {
                      "type": "string"
                    },
                    "link_expires": {
                      "type": "boolean"
                    }
                  },
                  "required": [
                    "id",
                    "type",
                    "url"
                  ]
                }
              }
            },
            "required": [
              "id",
              "channel_id",
              "sender_id",
              "conversation_id",
              "message",
              "status",
              "created_at"
            ]
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "channel_id": {
                "type": "string"
              },
              "sender_id": {
                "type": "string"
              },
              "conversation_id": {
                "type": "string"
              },
              "message": {
                "type": "string"
              },
              "status": {
                "type": "string"
              },
              "created_at": {
                "type": "string"
              },
              "reply_by": {
                "type": "string"
              },
              "conversation_link": {
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
                    "type": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "size": {
                      "type": "number"
                    },
                    "url": {
                      "type": "string"
                    },
                    "preview_url": {
                      "type": "string"
                    },
                    "link_expires": {
                      "type": "boolean"
                    }
                  },
                  "required": [
                    "id",
                    "type",
                    "url"
                  ]
                }
              }
            },
            "required": [
              "id",
              "channel_id",
              "sender_id",
              "conversation_id",
              "message",
              "status",
              "created_at"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/channels/messages/receive",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteConversation": {
      "name": "Delete a conversation",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "channel-id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "conversation-id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/channels/{channel-id}/conversations/{conversation-id}",
          "params": {
            "channel-id": {
              "$resolve": "args.channel-id"
            },
            "conversation-id": {
              "$resolve": "args.conversation-id"
            }
          }
        }
      }
    },
    "duplicateDeal": {
      "name": "Duplicate deal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "creator_user_id": {
                "type": "number"
              },
              "user_id": {
                "type": "number"
              },
              "person_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/deals/{id}/duplicate",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "addDealFollower": {
      "name": "Add a follower to a deal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "user_id": {
                "type": "number"
              },
              "id": {
                "type": "number"
              },
              "deal_id": {
                "type": "number"
              },
              "add_time": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "user_id": {
                "type": "number"
              }
            },
            "required": [
              "user_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/deals/{id}/followers",
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
    "deleteDealFollower": {
      "name": "Delete a follower from a deal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "follower_id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/deals/{id}/followers/{follower_id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "follower_id": {
              "$resolve": "args.follower_id"
            }
          }
        }
      }
    },
    "mergeDeals": {
      "name": "Merge two deals",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "creator_user_id": {
                "type": "number"
              },
              "user_id": {
                "type": "number"
              },
              "person_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "merge_with_id": {
                "type": "number"
              }
            },
            "required": [
              "merge_with_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/deals/{id}/merge",
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
    "addDealParticipant": {
      "name": "Add a participant to a deal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "person_id": {
                "type": "object",
                "properties": {
                  "active_flag": {
                    "type": "boolean"
                  },
                  "name": {
                    "type": "string"
                  },
                  "email": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "value": {
                          "type": "string"
                        },
                        "primary": {
                          "type": "boolean"
                        },
                        "label": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "phone": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "value": {
                          "type": "string"
                        },
                        "primary": {
                          "type": "boolean"
                        },
                        "label": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "owner_id": {
                    "type": "number"
                  },
                  "company_id": {
                    "type": "number"
                  },
                  "value": {
                    "type": "number"
                  }
                }
              },
              "add_time": {
                "type": "string"
              },
              "active_flag": {
                "type": "boolean"
              },
              "related_item_data": {
                "type": "object",
                "properties": {
                  "deal_id": {
                    "type": "number"
                  },
                  "title": {
                    "type": "string"
                  }
                }
              },
              "person": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "number"
                  },
                  "company_id": {
                    "type": "number"
                  },
                  "active_flag": {
                    "type": "boolean"
                  },
                  "phone": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "value": {
                          "type": "string"
                        },
                        "primary": {
                          "type": "boolean"
                        },
                        "label": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "email": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "value": {
                          "type": "string"
                        },
                        "primary": {
                          "type": "boolean"
                        },
                        "label": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "first_char": {
                    "type": "string"
                  },
                  "add_time": {
                    "type": "string"
                  },
                  "update_time": {
                    "type": "string"
                  },
                  "visible_to": {
                    "type": "string"
                  },
                  "picture_id": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "number"
                      },
                      "item_type": {
                        "type": "string"
                      },
                      "item_id": {
                        "type": "number"
                      },
                      "active_flag": {
                        "type": "boolean"
                      },
                      "add_time": {
                        "type": "string"
                      },
                      "update_time": {
                        "type": "string"
                      },
                      "added_by_user_id": {
                        "type": "number"
                      },
                      "pictures": {
                        "type": "object",
                        "properties": {
                          "128": {
                            "type": "string"
                          },
                          "512": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  },
                  "label": {
                    "type": "number"
                  },
                  "label_ids": {
                    "type": "array",
                    "items": {
                      "type": "number"
                    }
                  },
                  "org_name": {
                    "type": "string"
                  },
                  "owner_name": {
                    "type": "string"
                  },
                  "cc_email": {
                    "type": "string"
                  }
                }
              },
              "added_by_user_id": {
                "type": "object",
                "properties": {
                  "success": {
                    "type": "boolean"
                  }
                }
              },
              "related_item_type": {
                "type": "string"
              },
              "related_item_id": {
                "type": "number"
              }
            }
          },
          "related_objects": {
            "type": "object",
            "properties": {
              "user": {
                "type": "object",
                "properties": {
                  "USER_ID": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "number"
                      },
                      "name": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string"
                      },
                      "has_pic": {
                        "type": "number"
                      },
                      "pic_hash": {
                        "type": "string"
                      },
                      "active_flag": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              },
              "person": {
                "type": "object",
                "properties": {
                  "PERSON_ID": {
                    "type": "object",
                    "properties": {
                      "active_flag": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "person_id": {
                "type": "number"
              }
            },
            "required": [
              "person_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/deals/{id}/participants",
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
    "deleteDealParticipant": {
      "name": "Delete a participant from a deal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "deal_participant_id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/deals/{id}/participants/{deal_participant_id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "deal_participant_id": {
              "$resolve": "args.deal_participant_id"
            }
          }
        }
      }
    },
    "addDealField": {
      "name": "Add a new deal field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "options": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {}
                }
              },
              "add_visible_flag": {
                "type": "boolean"
              }
            },
            "required": [
              "name"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/dealFields",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteDealFields": {
      "name": "Delete multiple deal fields in bulk",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "ids": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/dealFields",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "deleteDealField": {
      "name": "Delete a deal field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/dealFields/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "updateDealField": {
      "name": "Update a deal field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "options": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {}
                }
              },
              "add_visible_flag": {
                "type": "boolean"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/dealFields/{id}",
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
    "addFile": {
      "name": "Add file",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "user_id": {
                "type": "number"
              },
              "deal_id": {
                "type": "number"
              },
              "person_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              },
              "product_id": {
                "type": "number"
              },
              "activity_id": {
                "type": "number"
              },
              "lead_id": {
                "type": "string"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              },
              "file_name": {
                "type": "string"
              },
              "file_size": {
                "type": "number"
              },
              "active_flag": {
                "type": "boolean"
              },
              "inline_flag": {
                "type": "boolean"
              },
              "remote_location": {
                "type": "string"
              },
              "remote_id": {
                "type": "string"
              },
              "cid": {
                "type": "string"
              },
              "s3_bucket": {
                "type": "string"
              },
              "mail_message_id": {
                "type": "string"
              },
              "mail_template_id": {
                "type": "string"
              },
              "deal_name": {
                "type": "string"
              },
              "person_name": {
                "type": "string"
              },
              "org_name": {
                "type": "string"
              },
              "product_name": {
                "type": "string"
              },
              "lead_name": {
                "type": "string"
              },
              "url": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/files"
        }
      }
    },
    "addFileAndLinkIt": {
      "name": "Create a remote file and link it to an item",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "user_id": {
                "type": "number"
              },
              "deal_id": {
                "type": "number"
              },
              "person_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              },
              "product_id": {
                "type": "number"
              },
              "activity_id": {
                "type": "number"
              },
              "lead_id": {
                "type": "string"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              },
              "file_name": {
                "type": "string"
              },
              "file_size": {
                "type": "number"
              },
              "active_flag": {
                "type": "boolean"
              },
              "inline_flag": {
                "type": "boolean"
              },
              "remote_location": {
                "type": "string"
              },
              "remote_id": {
                "type": "string"
              },
              "cid": {
                "type": "string"
              },
              "s3_bucket": {
                "type": "string"
              },
              "mail_message_id": {
                "type": "string"
              },
              "mail_template_id": {
                "type": "string"
              },
              "deal_name": {
                "type": "string"
              },
              "person_name": {
                "type": "string"
              },
              "org_name": {
                "type": "string"
              },
              "product_name": {
                "type": "string"
              },
              "lead_name": {
                "type": "string"
              },
              "url": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/files/remote"
        }
      }
    },
    "linkFileToItem": {
      "name": "Link a remote file to an item",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "user_id": {
                "type": "number"
              },
              "deal_id": {
                "type": "number"
              },
              "person_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              },
              "product_id": {
                "type": "number"
              },
              "activity_id": {
                "type": "number"
              },
              "lead_id": {
                "type": "string"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              },
              "file_name": {
                "type": "string"
              },
              "file_size": {
                "type": "number"
              },
              "active_flag": {
                "type": "boolean"
              },
              "inline_flag": {
                "type": "boolean"
              },
              "remote_location": {
                "type": "string"
              },
              "remote_id": {
                "type": "string"
              },
              "cid": {
                "type": "string"
              },
              "s3_bucket": {
                "type": "string"
              },
              "mail_message_id": {
                "type": "string"
              },
              "mail_template_id": {
                "type": "string"
              },
              "deal_name": {
                "type": "string"
              },
              "person_name": {
                "type": "string"
              },
              "org_name": {
                "type": "string"
              },
              "product_name": {
                "type": "string"
              },
              "lead_name": {
                "type": "string"
              },
              "url": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "POST",
          "path": "/files/remoteLink"
        }
      }
    },
    "deleteFile": {
      "name": "Delete a file",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/files/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "updateFile": {
      "name": "Update file details",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "user_id": {
                "type": "number"
              },
              "deal_id": {
                "type": "number"
              },
              "person_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              },
              "product_id": {
                "type": "number"
              },
              "activity_id": {
                "type": "number"
              },
              "lead_id": {
                "type": "string"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              },
              "file_name": {
                "type": "string"
              },
              "file_size": {
                "type": "number"
              },
              "active_flag": {
                "type": "boolean"
              },
              "inline_flag": {
                "type": "boolean"
              },
              "remote_location": {
                "type": "string"
              },
              "remote_id": {
                "type": "string"
              },
              "cid": {
                "type": "string"
              },
              "s3_bucket": {
                "type": "string"
              },
              "mail_message_id": {
                "type": "string"
              },
              "mail_template_id": {
                "type": "string"
              },
              "deal_name": {
                "type": "string"
              },
              "person_name": {
                "type": "string"
              },
              "org_name": {
                "type": "string"
              },
              "product_name": {
                "type": "string"
              },
              "lead_name": {
                "type": "string"
              },
              "url": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/files/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "deleteFilters": {
      "name": "Delete multiple filters in bulk",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "ids": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/filters",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "addFilter": {
      "name": "Add a new filter",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "include_field_code": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "conditions": {
                "type": "object",
                "properties": {}
              },
              "type": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "conditions",
              "type"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/filters",
          "query": {
            "include_field_code": {
              "$resolve": "args.include_field_code"
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
    "deleteFilter": {
      "name": "Delete a filter",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/filters/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "updateFilter": {
      "name": "Update filter",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "include_field_code": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "conditions": {
                "type": "object",
                "properties": {}
              }
            },
            "required": [
              "conditions"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/filters/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          },
          "query": {
            "include_field_code": {
              "$resolve": "args.include_field_code"
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
    "addGoal": {
      "name": "Add a new goal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "goal": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "owner_id": {
                    "type": "number"
                  },
                  "title": {
                    "type": "string"
                  },
                  "type": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "params": {
                        "type": "object",
                        "properties": {
                          "pipeline_id": {
                            "type": "array",
                            "items": {
                              "type": "number"
                            }
                          },
                          "activity_type_id": {
                            "type": "array",
                            "items": {
                              "type": "number"
                            }
                          }
                        }
                      }
                    }
                  },
                  "assignee": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "number"
                      },
                      "type": {
                        "type": "string"
                      }
                    }
                  },
                  "interval": {
                    "type": "string"
                  },
                  "duration": {
                    "type": "object",
                    "properties": {
                      "start": {
                        "type": "string"
                      },
                      "end": {
                        "type": "string"
                      }
                    }
                  },
                  "expected_outcome": {
                    "type": "object",
                    "properties": {
                      "target": {
                        "type": "number"
                      },
                      "tracking_metric": {
                        "type": "string"
                      }
                    }
                  },
                  "is_active": {
                    "type": "boolean"
                  },
                  "report_ids": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string"
              },
              "assignee": {
                "type": "object",
                "properties": {}
              },
              "type": {
                "type": "object",
                "properties": {}
              },
              "expected_outcome": {
                "type": "object",
                "properties": {}
              },
              "duration": {
                "type": "object",
                "properties": {}
              },
              "interval": {
                "type": "string"
              }
            },
            "required": [
              "type",
              "assignee",
              "expected_outcome",
              "duration",
              "interval"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/goals",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateGoal": {
      "name": "Update existing goal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "goal": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "owner_id": {
                    "type": "number"
                  },
                  "title": {
                    "type": "string"
                  },
                  "type": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "params": {
                        "type": "object",
                        "properties": {
                          "pipeline_id": {
                            "type": "array",
                            "items": {
                              "type": "number"
                            }
                          },
                          "activity_type_id": {
                            "type": "array",
                            "items": {
                              "type": "number"
                            }
                          }
                        }
                      }
                    }
                  },
                  "assignee": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "number"
                      },
                      "type": {
                        "type": "string"
                      }
                    }
                  },
                  "interval": {
                    "type": "string"
                  },
                  "duration": {
                    "type": "object",
                    "properties": {
                      "start": {
                        "type": "string"
                      },
                      "end": {
                        "type": "string"
                      }
                    }
                  },
                  "expected_outcome": {
                    "type": "object",
                    "properties": {
                      "target": {
                        "type": "number"
                      },
                      "tracking_metric": {
                        "type": "string"
                      }
                    }
                  },
                  "is_active": {
                    "type": "boolean"
                  },
                  "report_ids": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
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
            "type": "object",
            "properties": {
              "title": {
                "type": "string"
              },
              "assignee": {
                "type": "object",
                "properties": {}
              },
              "type": {
                "type": "object",
                "properties": {}
              },
              "expected_outcome": {
                "type": "object",
                "properties": {}
              },
              "duration": {
                "type": "object",
                "properties": {}
              },
              "interval": {
                "type": "string"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/goals/{id}",
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
    "deleteGoal": {
      "name": "Delete existing goal",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
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
          "path": "/goals/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "addLead": {
      "name": "Add a lead",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string"
              },
              "owner_id": {
                "type": "number"
              },
              "label_ids": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "person_id": {
                "type": "number"
              },
              "organization_id": {
                "type": "number"
              },
              "value": {
                "type": "object",
                "properties": {
                  "amount": {
                    "type": "number"
                  },
                  "currency": {
                    "type": "string"
                  }
                },
                "required": [
                  "amount",
                  "currency"
                ]
              },
              "expected_close_date": {
                "type": "string"
              },
              "visible_to": {
                "type": "string"
              },
              "was_seen": {
                "type": "boolean"
              },
              "origin_id": {
                "type": "string"
              },
              "channel": {
                "type": "number"
              },
              "channel_id": {
                "type": "string"
              }
            },
            "required": [
              "title"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/leads",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateLead": {
      "name": "Update a lead",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "title": {
                "type": "string"
              },
              "owner_id": {
                "type": "number"
              },
              "creator_id": {
                "type": "number"
              },
              "label_ids": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "person_id": {
                "type": "number"
              },
              "organization_id": {
                "type": "number"
              },
              "source_name": {
                "type": "string"
              },
              "origin": {
                "type": "string"
              },
              "origin_id": {
                "type": "string"
              },
              "channel": {
                "type": "number"
              },
              "channel_id": {
                "type": "string"
              },
              "source_deal_id": {
                "type": "number"
              },
              "is_archived": {
                "type": "boolean"
              },
              "was_seen": {
                "type": "boolean"
              },
              "value": {
                "type": "object",
                "properties": {
                  "amount": {
                    "type": "number"
                  },
                  "currency": {
                    "type": "string"
                  }
                },
                "required": [
                  "amount",
                  "currency"
                ]
              },
              "expected_close_date": {
                "type": "string"
              },
              "next_activity_id": {
                "type": "number"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              },
              "visible_to": {
                "type": "string"
              },
              "cc_email": {
                "type": "string"
              }
            }
          }
        }
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
            "type": "object",
            "properties": {
              "title": {
                "type": "string"
              },
              "owner_id": {
                "type": "number"
              },
              "label_ids": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "person_id": {
                "type": "number"
              },
              "organization_id": {
                "type": "number"
              },
              "is_archived": {
                "type": "boolean"
              },
              "value": {
                "type": "object",
                "properties": {
                  "amount": {
                    "type": "number"
                  },
                  "currency": {
                    "type": "string"
                  }
                },
                "required": [
                  "amount",
                  "currency"
                ]
              },
              "expected_close_date": {
                "type": "string"
              },
              "visible_to": {
                "type": "string"
              },
              "was_seen": {
                "type": "boolean"
              },
              "channel": {
                "type": "number"
              },
              "channel_id": {
                "type": "string"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/leads/{id}",
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
    "deleteLead": {
      "name": "Delete a lead",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              }
            }
          }
        }
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
          "path": "/leads/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "addLeadLabel": {
      "name": "Add a lead label",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "color": {
                "type": "string"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "color": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "color"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/leadLabels",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateLeadLabel": {
      "name": "Update a lead label",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "color": {
                "type": "string"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              }
            }
          }
        }
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
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "color": {
                "type": "string"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/leadLabels/{id}",
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
    "deleteLeadLabel": {
      "name": "Delete a lead label",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              }
            }
          }
        }
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
          "path": "/leadLabels/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "addTeam": {
      "name": "Add a new team",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "manager_id": {
                "type": "number"
              },
              "users": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              }
            },
            "required": [
              "name",
              "manager_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/legacyTeams",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateTeam": {
      "name": "Update a team",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "manager_id": {
                "type": "number"
              },
              "users": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/legacyTeams/{id}",
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
    "addTeamUser": {
      "name": "Add users to a team",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "users": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              }
            },
            "required": [
              "users"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/legacyTeams/{id}/users",
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
    "deleteTeamUser": {
      "name": "Delete users from a team",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "users": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              }
            },
            "required": [
              "users"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/legacyTeams/{id}/users",
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
    "deleteMailThread": {
      "name": "Delete mail thread",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/mailbox/mailThreads/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "updateMailThreadDetails": {
      "name": "Update mail thread details",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/mailbox/mailThreads/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "saveUserProviderLink": {
      "name": "Link a user with the installed video call integration",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "message": {
                "type": "string"
              }
            }
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "user_provider_id": {
                "type": "string"
              },
              "user_id": {
                "type": "number"
              },
              "company_id": {
                "type": "number"
              },
              "marketplace_client_id": {
                "type": "string"
              }
            },
            "required": [
              "user_provider_id",
              "user_id",
              "company_id",
              "marketplace_client_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/meetings/userProviderLinks",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteUserProviderLink": {
      "name": "Delete the link between a user and the installed video call integration",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "message": {
                "type": "string"
              }
            }
          }
        }
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
          "path": "/meetings/userProviderLinks/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "addNote": {
      "name": "Add a note",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "active_flag": {
                "type": "boolean"
              },
              "add_time": {
                "type": "string"
              },
              "content": {
                "type": "string"
              },
              "deal": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  }
                }
              },
              "lead_id": {
                "type": "string"
              },
              "deal_id": {
                "type": "number"
              },
              "last_update_user_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              },
              "organization": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  }
                }
              },
              "person": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  }
                }
              },
              "person_id": {
                "type": "number"
              },
              "project_id": {
                "type": "number"
              },
              "project": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  }
                }
              },
              "task_id": {
                "type": "number"
              },
              "task": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  }
                }
              },
              "pinned_to_deal_flag": {
                "type": "boolean"
              },
              "pinned_to_organization_flag": {
                "type": "boolean"
              },
              "pinned_to_person_flag": {
                "type": "boolean"
              },
              "pinned_to_project_flag": {
                "type": "boolean"
              },
              "pinned_to_task_flag": {
                "type": "boolean"
              },
              "update_time": {
                "type": "string"
              },
              "user": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "icon_url": {
                    "type": "string"
                  },
                  "is_you": {
                    "type": "boolean"
                  },
                  "name": {
                    "type": "string"
                  }
                }
              },
              "user_id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "content": {
                "type": "string"
              },
              "lead_id": {
                "type": "string"
              },
              "deal_id": {
                "type": "number"
              },
              "person_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              },
              "project_id": {
                "type": "number"
              },
              "task_id": {
                "type": "number"
              }
            },
            "required": [
              "content"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/notes",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteNote": {
      "name": "Delete a note",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/notes/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "updateNote": {
      "name": "Update a note",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "active_flag": {
                "type": "boolean"
              },
              "add_time": {
                "type": "string"
              },
              "content": {
                "type": "string"
              },
              "deal": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  }
                }
              },
              "lead_id": {
                "type": "string"
              },
              "deal_id": {
                "type": "number"
              },
              "last_update_user_id": {
                "type": "number"
              },
              "org_id": {
                "type": "number"
              },
              "organization": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  }
                }
              },
              "person": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  }
                }
              },
              "person_id": {
                "type": "number"
              },
              "project_id": {
                "type": "number"
              },
              "project": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  }
                }
              },
              "task_id": {
                "type": "number"
              },
              "task": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  }
                }
              },
              "pinned_to_deal_flag": {
                "type": "boolean"
              },
              "pinned_to_organization_flag": {
                "type": "boolean"
              },
              "pinned_to_person_flag": {
                "type": "boolean"
              },
              "pinned_to_project_flag": {
                "type": "boolean"
              },
              "pinned_to_task_flag": {
                "type": "boolean"
              },
              "update_time": {
                "type": "string"
              },
              "user": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "icon_url": {
                    "type": "string"
                  },
                  "is_you": {
                    "type": "boolean"
                  },
                  "name": {
                    "type": "string"
                  }
                }
              },
              "user_id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "content": {
                "type": "string"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/notes/{id}",
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
    "addNoteComment": {
      "name": "Add a comment to a note",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "uuid": {
                "type": "string"
              },
              "active_flag": {
                "type": "boolean"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              },
              "content": {
                "type": "string"
              },
              "object_id": {
                "type": "string"
              },
              "object_type": {
                "type": "string"
              },
              "user_id": {
                "type": "number"
              },
              "updater_id": {
                "type": "number"
              },
              "company_id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "content": {
                "type": "string"
              }
            },
            "required": [
              "content"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/notes/{id}/comments",
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
    "updateCommentForNote": {
      "name": "Update a comment related to a note",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "uuid": {
                "type": "string"
              },
              "active_flag": {
                "type": "boolean"
              },
              "add_time": {
                "type": "string"
              },
              "update_time": {
                "type": "string"
              },
              "content": {
                "type": "string"
              },
              "object_id": {
                "type": "string"
              },
              "object_type": {
                "type": "string"
              },
              "user_id": {
                "type": "number"
              },
              "updater_id": {
                "type": "number"
              },
              "company_id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "commentId": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "content": {
                "type": "string"
              }
            },
            "required": [
              "content"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/notes/{id}/comments/{commentId}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "commentId": {
              "$resolve": "args.commentId"
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
    "deleteComment": {
      "name": "Delete a comment related to a note",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "commentId": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/notes/{id}/comments/{commentId}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "commentId": {
              "$resolve": "args.commentId"
            }
          }
        }
      }
    },
    "get-tokens": {
      "name": "Getting the tokens",
      "schema": {
        "type": "object",
        "properties": {
          "access_token": {
            "type": "string"
          },
          "token_type": {
            "type": "string"
          },
          "refresh_token": {
            "type": "string"
          },
          "scope": {
            "type": "string"
          },
          "expires_in": {
            "type": "number"
          },
          "api_domain": {
            "type": "string"
          }
        }
      },
      "args": {
        "Authorization": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/oauth/token"
        }
      }
    },
    "refresh-tokens": {
      "name": "Refreshing the tokens",
      "schema": {
        "type": "object",
        "properties": {
          "access_token": {
            "type": "string"
          },
          "token_type": {
            "type": "string"
          },
          "refresh_token": {
            "type": "string"
          },
          "scope": {
            "type": "string"
          },
          "expires_in": {
            "type": "number"
          },
          "api_domain": {
            "type": "string"
          }
        }
      },
      "args": {
        "Authorization": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/oauth/token/"
        }
      }
    },
    "addOrganizationFollower": {
      "name": "Add a follower to an organization",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "org_id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "user_id": {
                "type": "number"
              }
            },
            "required": [
              "user_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/organizations/{id}/followers",
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
    "deleteOrganizationFollower": {
      "name": "Delete a follower from an organization",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "follower_id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/organizations/{id}/followers/{follower_id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "follower_id": {
              "$resolve": "args.follower_id"
            }
          }
        }
      }
    },
    "mergeOrganizations": {
      "name": "Merge two organizations",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "merge_with_id": {
                "type": "number"
              }
            },
            "required": [
              "merge_with_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/organizations/{id}/merge",
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
    "addOrganizationField": {
      "name": "Add a new organization field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "options": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {}
                }
              },
              "add_visible_flag": {
                "type": "boolean"
              }
            },
            "required": [
              "name"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/organizationFields",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteOrganizationFields": {
      "name": "Delete multiple organization fields in bulk",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "ids": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/organizationFields",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "deleteOrganizationField": {
      "name": "Delete an organization field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/organizationFields/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "updateOrganizationField": {
      "name": "Update an organization field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "options": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {}
                }
              },
              "add_visible_flag": {
                "type": "boolean"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/organizationFields/{id}",
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
    "addOrganizationRelationship": {
      "name": "Create an organization relationship",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "org_id": {
                "type": "number"
              },
              "type": {
                "type": "string"
              },
              "rel_owner_org_id": {
                "type": "number"
              },
              "rel_linked_org_id": {
                "type": "number"
              }
            },
            "required": [
              "type",
              "rel_owner_org_id",
              "rel_linked_org_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/organizationRelationships",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteOrganizationRelationship": {
      "name": "Delete an organization relationship",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/organizationRelationships/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "updateOrganizationRelationship": {
      "name": "Update an organization relationship",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "org_id": {
                "type": "number"
              },
              "type": {
                "type": "string"
              },
              "rel_owner_org_id": {
                "type": "number"
              },
              "rel_linked_org_id": {
                "type": "number"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/organizationRelationships/{id}",
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
    "addPersonFollower": {
      "name": "Add a follower to a person",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "user_id": {
                "type": "number"
              }
            },
            "required": [
              "user_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/persons/{id}/followers",
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
    "deletePersonFollower": {
      "name": "Delete a follower from a person",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "follower_id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/persons/{id}/followers/{follower_id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "follower_id": {
              "$resolve": "args.follower_id"
            }
          }
        }
      }
    },
    "mergePersons": {
      "name": "Merge two persons",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "merge_with_id": {
                "type": "number"
              }
            },
            "required": [
              "merge_with_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/persons/{id}/merge",
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
    "deletePersonPicture": {
      "name": "Delete person picture",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/persons/{id}/picture",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "addPersonPicture": {
      "name": "Add person picture",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/persons/{id}/picture",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "addPersonField": {
      "name": "Add a new person field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "options": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {}
                }
              },
              "add_visible_flag": {
                "type": "boolean"
              }
            },
            "required": [
              "name"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/personFields",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deletePersonFields": {
      "name": "Delete multiple person fields in bulk",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "ids": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/personFields",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "deletePersonField": {
      "name": "Delete a person field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/personFields/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "updatePersonField": {
      "name": "Update a person field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "options": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {}
                }
              },
              "add_visible_flag": {
                "type": "boolean"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/personFields/{id}",
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
    "addProductFollower": {
      "name": "Add a follower to a product",
      "schema": {
        "type": "object"
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "user_id": {
                "type": "number"
              }
            },
            "required": [
              "user_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/products/{id}/followers",
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
    "deleteProductFollower": {
      "name": "Delete a follower from a product",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "follower_id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/products/{id}/followers/{follower_id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "follower_id": {
              "$resolve": "args.follower_id"
            }
          }
        }
      }
    },
    "deleteProductFields": {
      "name": "Delete multiple product fields in bulk",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              }
            }
          }
        }
      },
      "args": {
        "ids": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/productFields",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "addProductField": {
      "name": "Add a new product field",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "options": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {}
                }
              },
              "field_type": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "field_type"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/productFields",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteProductField": {
      "name": "Delete a product field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              }
            }
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/productFields/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "updateProductField": {
      "name": "Update a product field",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "options": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {}
                }
              },
              "field_type": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "field_type"
            ]
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "options": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/productFields/{id}",
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
    "addProject": {
      "name": "Add a project",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string"
              }
            },
            "required": [
              "title"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateProject": {
      "name": "Update a project",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/projects/{id}",
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
    "deleteProject": {
      "name": "Delete a project",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "success": {
                "type": "boolean"
              },
              "data": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "number"
                  }
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/projects/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "archiveProject": {
      "name": "Archive a project",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/projects/{id}/archive",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "putProjectPlanActivity": {
      "name": "Update activity in project plan",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "item_id": {
                "type": "number"
              },
              "item_type": {
                "type": "string"
              },
              "phase_id": {
                "type": "number"
              },
              "group_id": {
                "type": "number"
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "activityId": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "phase_id": {
                "type": "number"
              },
              "group_id": {
                "type": "number"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/projects/{id}/plan/activities/{activityId}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "activityId": {
              "$resolve": "args.activityId"
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
    "putProjectPlanTask": {
      "name": "Update task in project plan",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "item_id": {
                "type": "number"
              },
              "item_type": {
                "type": "string"
              },
              "phase_id": {
                "type": "number"
              },
              "group_id": {
                "type": "number"
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "taskId": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "phase_id": {
                "type": "number"
              },
              "group_id": {
                "type": "number"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/projects/{id}/plan/tasks/{taskId}",
          "params": {
            "id": {
              "$resolve": "args.id"
            },
            "taskId": {
              "$resolve": "args.taskId"
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
    "addRole": {
      "name": "Add a role",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "parent_role_id": {
                "type": "number"
              }
            },
            "required": [
              "name"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/roles",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteRole": {
      "name": "Delete a role",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/roles/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "updateRole": {
      "name": "Update role details",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "parent_role_id": {
                "type": "number"
              },
              "name": {
                "type": "string"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/roles/{id}",
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
    "deleteRoleAssignment": {
      "name": "Delete a role assignment",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "user_id": {
                "type": "number"
              }
            },
            "required": [
              "user_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/roles/{id}/assignments",
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
    "addRoleAssignment": {
      "name": "Add role assignment",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "user_id": {
                "type": "number"
              }
            },
            "required": [
              "user_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/roles/{id}/assignments",
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
    "addOrUpdateRoleSetting": {
      "name": "Add or update role setting",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "setting_key": {
                "type": "string"
              },
              "value": {
                "type": "number"
              }
            },
            "required": [
              "setting_key",
              "value"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/roles/{id}/settings",
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
    "updateRolePipelines": {
      "name": "Update pipeline visibility for a role",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "visible_pipeline_ids": {
                "type": "object",
                "properties": {}
              }
            },
            "required": [
              "visible_pipeline_ids"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/roles/{id}/pipelines",
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
    "addTask": {
      "name": "Add a task",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string"
              },
              "project_id": {
                "type": "number"
              }
            },
            "required": [
              "title",
              "project_id"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/tasks",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateTask": {
      "name": "Update a task",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string"
              },
              "project_id": {
                "type": "number"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/tasks/{id}",
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
    "deleteTask": {
      "name": "Delete a task",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "data": {
            "type": "object",
            "properties": {
              "success": {
                "type": "boolean"
              },
              "data": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "number"
                  }
                }
              }
            }
          },
          "additional_data": {
            "type": "object",
            "properties": {}
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/tasks/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "addUser": {
      "name": "Add a new user",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "email": {
                "type": "string"
              },
              "access": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "app": {
                      "type": "string"
                    },
                    "admin": {
                      "type": "boolean"
                    },
                    "permission_set_id": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "app"
                  ]
                }
              },
              "active_flag": {
                "type": "boolean"
              }
            },
            "required": [
              "email"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/users",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "updateUser": {
      "name": "Update user details",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "active_flag": {
                "type": "boolean"
              }
            },
            "required": [
              "active_flag"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/users/{id}",
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
    "addWebhook": {
      "name": "Create a new Webhook",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "subscription_url": {
                "type": "string"
              },
              "event_action": {
                "type": "string"
              },
              "event_object": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "user_id": {
                "type": "number"
              },
              "http_auth_user": {
                "type": "string"
              },
              "http_auth_password": {
                "type": "string"
              },
              "version": {
                "type": "string"
              }
            },
            "required": [
              "subscription_url",
              "event_action",
              "event_object",
              "name"
            ]
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
    "deleteWebhook": {
      "name": "Delete existing Webhook",
      "schema": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          }
        }
      },
      "args": {
        "id": {
          "schema": {
            "type": "number"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/webhooks/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    }
  }
};

export default spec;
