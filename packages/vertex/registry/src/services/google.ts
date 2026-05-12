import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "google",
  "type": "http",
  "connection": {
    "provider": "google",
    "baseUrl": "https://travelpartner.googleapis.com/"
  },
  "schemas": {
    "AccountLink": {
      "type": "object",
      "properties": {
        "accountLinkTarget": {
          "type": "ref",
          "ref": "AccountLinkTarget"
        },
        "googleAdsCustomerName": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "status": {
          "type": "string"
        }
      }
    },
    "AccountLinkTarget": {
      "type": "object",
      "properties": {
        "allHotels": {
          "type": "boolean"
        },
        "hotelList": {
          "type": "ref",
          "ref": "HotelList"
        }
      }
    },
    "Brand": {
      "type": "object",
      "properties": {
        "activeDisplayNames": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LocalizedText"
          }
        },
        "activeIcon": {
          "type": "string"
        },
        "activeIconUri": {
          "type": "string"
        },
        "displayNameDisapprovalReason": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DisplayNameDisapprovalReason"
          }
        },
        "displayNameState": {
          "type": "string"
        },
        "displayNames": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LocalizedText"
          }
        },
        "icon": {
          "type": "string"
        },
        "iconDisapprovalReasons": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "iconState": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "propertyCount": {
          "type": "string"
        },
        "submittedDisplayNames": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LocalizedText"
          }
        },
        "submittedIcon": {
          "type": "string"
        }
      }
    },
    "CreateReconciliationReportResponse": {
      "type": "object",
      "properties": {
        "issues": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ReconciliationReportValidationIssue"
          }
        },
        "reconciliationReport": {
          "type": "ref",
          "ref": "ReconciliationReport"
        },
        "successfulRecordCount": {
          "type": "number"
        }
      }
    },
    "DataIssueDetail": {
      "type": "object",
      "properties": {
        "dataIssueSeverity": {
          "type": "string"
        },
        "dataIssueType": {
          "type": "string"
        },
        "isSelfResolving": {
          "type": "boolean"
        }
      }
    },
    "Date": {
      "type": "object",
      "properties": {
        "day": {
          "type": "number"
        },
        "month": {
          "type": "number"
        },
        "year": {
          "type": "number"
        }
      }
    },
    "DisplayNameDisapprovalReason": {
      "type": "object",
      "properties": {
        "disapprovalReason": {
          "type": "string"
        },
        "languageCode": {
          "type": "string"
        }
      }
    },
    "Empty": {
      "type": "object",
      "properties": {}
    },
    "FreeBookingLinksResult": {
      "type": "object",
      "properties": {
        "clickCount": {
          "type": "string"
        },
        "date": {
          "type": "ref",
          "ref": "Date"
        },
        "deviceType": {
          "type": "string"
        },
        "partnerHotelDisplayName": {
          "type": "string"
        },
        "partnerHotelId": {
          "type": "string"
        },
        "userRegionCode": {
          "type": "string"
        }
      }
    },
    "HotelList": {
      "type": "object",
      "properties": {
        "partnerHotelIds": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "HotelPricePerItinerary": {
      "type": "object",
      "properties": {
        "checkinDate": {
          "type": "ref",
          "ref": "Date"
        },
        "currencyCode": {
          "type": "string"
        },
        "fees": {
          "type": "number"
        },
        "lengthOfStayDays": {
          "type": "number"
        },
        "price": {
          "type": "number"
        },
        "taxes": {
          "type": "number"
        },
        "updateTime": {
          "type": "string"
        }
      }
    },
    "HotelView": {
      "type": "object",
      "properties": {
        "dataIssueDetail": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DataIssueDetail"
          }
        },
        "dataIssues": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "googleClusterId": {
          "type": "string"
        },
        "googleHotelDisplayName": {
          "type": "string"
        },
        "googleHotelId": {
          "type": "string"
        },
        "liveOnGoogle": {
          "type": "boolean"
        },
        "matchStatus": {
          "type": "string"
        },
        "overclusteredPartnerHotelIds": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "partnerHotelDisplayName": {
          "type": "string"
        },
        "partnerHotelId": {
          "type": "string"
        },
        "primaryOverclusteredPartnerHotelId": {
          "type": "string"
        },
        "propertyDetails": {
          "type": "string"
        }
      }
    },
    "Icon": {
      "type": "object",
      "properties": {
        "disapprovalReasons": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "iconUri": {
          "type": "string"
        },
        "imageData": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "reference": {
          "type": "string"
        },
        "state": {
          "type": "string"
        }
      }
    },
    "Image": {
      "type": "object",
      "properties": {
        "galleryUri": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LocalizedText"
          }
        },
        "title": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LocalizedText"
          }
        },
        "uri": {
          "type": "string"
        }
      }
    },
    "Key": {
      "type": "object",
      "properties": {
        "advanceBookingWindow": {
          "type": "number"
        },
        "checkinDate": {
          "type": "ref",
          "ref": "Date"
        },
        "date": {
          "type": "ref",
          "ref": "Date"
        },
        "deviceType": {
          "type": "string"
        },
        "hotelRegionCode": {
          "type": "string"
        },
        "lengthOfStayDays": {
          "type": "number"
        },
        "occupancy": {
          "type": "number"
        },
        "partnerHotelId": {
          "type": "string"
        },
        "userRegionCode": {
          "type": "string"
        }
      }
    },
    "LatLng": {
      "type": "object",
      "properties": {
        "latitude": {
          "type": "number"
        },
        "longitude": {
          "type": "number"
        }
      }
    },
    "ListAccountLinksResponse": {
      "type": "object",
      "properties": {
        "accountLinks": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AccountLink"
          }
        }
      }
    },
    "ListBrandsResponse": {
      "type": "object",
      "properties": {
        "brands": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Brand"
          }
        }
      }
    },
    "ListHotelViewsResponse": {
      "type": "object",
      "properties": {
        "hotelViews": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "HotelView"
          }
        },
        "nextPageToken": {
          "type": "string"
        }
      }
    },
    "ListIconsResponse": {
      "type": "object",
      "properties": {
        "icons": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Icon"
          }
        }
      }
    },
    "ListPriceAccuracyViewsResponse": {
      "type": "object",
      "properties": {
        "priceAccuracyViews": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PriceAccuracyView"
          }
        }
      }
    },
    "ListPriceCoverageViewsResponse": {
      "type": "object",
      "properties": {
        "priceCoverageViews": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PriceCoverageView"
          }
        }
      }
    },
    "ListReconciliationReportsResponse": {
      "type": "object",
      "properties": {
        "reconciliationReports": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ReconciliationReport"
          }
        }
      }
    },
    "LocalizedText": {
      "type": "object",
      "properties": {
        "languageCode": {
          "type": "string"
        },
        "text": {
          "type": "string"
        }
      }
    },
    "MissedParticipationCountDetails": {
      "type": "object",
      "properties": {
        "hotelSuspendedCount": {
          "type": "string"
        },
        "noAvailabilityCount": {
          "type": "string"
        },
        "noLandingPageCount": {
          "type": "string"
        },
        "noPriceCount": {
          "type": "string"
        },
        "noPriceCountDetails": {
          "type": "ref",
          "ref": "NoPriceCountDetails"
        },
        "noTaxBreakdownCount": {
          "type": "string"
        },
        "otherReasonCount": {
          "type": "string"
        },
        "priceMissingCount": {
          "type": "string"
        },
        "priceMissingCountDetails": {
          "type": "ref",
          "ref": "PriceMissingCountDetails"
        },
        "priceProblemCount": {
          "type": "string"
        },
        "priceProblemCountDetails": {
          "type": "ref",
          "ref": "PriceProblemCountDetails"
        },
        "priceUnavailableCount": {
          "type": "string"
        },
        "priceUnavailableCountDetails": {
          "type": "ref",
          "ref": "PriceUnavailableCountDetails"
        }
      }
    },
    "NoPriceCountDetails": {
      "type": "object",
      "properties": {
        "livePricingConfigIssueCount": {
          "type": "string"
        },
        "livePricingNotAvailableCount": {
          "type": "string"
        },
        "livePricingNotTriggeredCount": {
          "type": "string"
        },
        "livePricingOtherReasonCount": {
          "type": "string"
        },
        "livePricingTechnicalIssueCount": {
          "type": "string"
        }
      }
    },
    "ParsedListing": {
      "type": "object",
      "properties": {
        "brand": {
          "type": "string"
        },
        "category": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LocalizedText"
          }
        },
        "dataIssueDetail": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DataIssueDetail"
          }
        },
        "description": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LocalizedText"
          }
        },
        "image": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Image"
          }
        },
        "imprecisionRadiusMeters": {
          "type": "number"
        },
        "isServed": {
          "type": "boolean"
        },
        "listingName": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LocalizedText"
          }
        },
        "location": {
          "type": "ref",
          "ref": "LatLng"
        },
        "partnerListId": {
          "type": "string"
        },
        "regionCode": {
          "type": "string"
        },
        "review": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Review"
          }
        },
        "unitAttributes": {
          "type": "object",
          "properties": {}
        }
      }
    },
    "ParticipationResult": {
      "type": "object",
      "properties": {
        "key": {
          "type": "ref",
          "ref": "Key"
        },
        "missedParticipationCount": {
          "type": "string"
        },
        "missedParticipationCountDetails": {
          "type": "ref",
          "ref": "MissedParticipationCountDetails"
        },
        "opportunityCount": {
          "type": "string"
        },
        "participationCount": {
          "type": "string"
        },
        "participationPercent": {
          "type": "number"
        },
        "partnerHotelDisplayName": {
          "type": "string"
        }
      }
    },
    "PriceAccuracyRow": {
      "type": "object",
      "properties": {
        "adultOccupancy": {
          "type": "number"
        },
        "affectsScore": {
          "type": "boolean"
        },
        "cachedPriceRecord": {
          "type": "ref",
          "ref": "PriceRecord"
        },
        "checkinDate": {
          "type": "ref",
          "ref": "Date"
        },
        "childOccupancy": {
          "type": "number"
        },
        "correctionTime": {
          "type": "string"
        },
        "deviceType": {
          "type": "string"
        },
        "fetchedPriceRecord": {
          "type": "ref",
          "ref": "PriceRecord"
        },
        "finalDomain": {
          "type": "string"
        },
        "hotel": {
          "type": "string"
        },
        "hotelCountryCode": {
          "type": "string"
        },
        "lengthOfStayDays": {
          "type": "number"
        },
        "mismatchReason": {
          "type": "string"
        },
        "rateRuleId": {
          "type": "string"
        },
        "signalSource": {
          "type": "string"
        },
        "url": {
          "type": "string"
        },
        "userRegionCode": {
          "type": "string"
        }
      }
    },
    "PriceAccuracyView": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "results": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PriceAccuracyRow"
          }
        }
      }
    },
    "PriceCoverageBucket": {
      "type": "object",
      "properties": {
        "advanceBookingWindowRange": {
          "type": "string"
        },
        "availablePriceCount": {
          "type": "string"
        },
        "lengthOfStayRange": {
          "type": "string"
        },
        "priceCoveragePercent": {
          "type": "number"
        }
      }
    },
    "PriceCoverageView": {
      "type": "object",
      "properties": {
        "calculationDate": {
          "type": "ref",
          "ref": "Date"
        },
        "matchedPropertyCount": {
          "type": "number"
        },
        "priceCoverageBinaryPercent": {
          "type": "number"
        },
        "priceCoverageBuckets": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PriceCoverageBucket"
          }
        },
        "priceCoveragePercent": {
          "type": "number"
        }
      }
    },
    "PriceMissingCountDetails": {
      "type": "object",
      "properties": {
        "bandwidthDepletedCount": {
          "type": "string"
        },
        "cacheRateMissingCount": {
          "type": "string"
        },
        "itineraryBlockedCount": {
          "type": "string"
        },
        "livePricingErrorCount": {
          "type": "string"
        },
        "livePricingNotSetupCount": {
          "type": "string"
        },
        "livePricingTimeoutCount": {
          "type": "string"
        }
      }
    },
    "PriceProblemCountDetails": {
      "type": "object",
      "properties": {
        "hotelSuspendedCount": {
          "type": "string"
        },
        "priceUnusuallyHighCount": {
          "type": "string"
        },
        "priceUnusuallyLowCount": {
          "type": "string"
        },
        "taxesAndFeesMissingCount": {
          "type": "string"
        }
      }
    },
    "PriceRecord": {
      "type": "object",
      "properties": {
        "basePrice": {
          "type": "number"
        },
        "currencyCode": {
          "type": "string"
        },
        "taxesAndFees": {
          "type": "number"
        },
        "time": {
          "type": "string"
        }
      }
    },
    "PriceUnavailableCountDetails": {
      "type": "object",
      "properties": {
        "participationNotLikelyCount": {
          "type": "string"
        },
        "priceUnavailableCount": {
          "type": "string"
        }
      }
    },
    "PriceView": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "perItineraryPrices": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "HotelPricePerItinerary"
          }
        }
      }
    },
    "PropertyPerformanceResult": {
      "type": "object",
      "properties": {
        "adsClickCount": {
          "type": "string"
        },
        "adsClickthroughRate": {
          "type": "number"
        },
        "adsImpressionCount": {
          "type": "string"
        },
        "advanceBookingWindow": {
          "type": "string"
        },
        "brand": {
          "type": "string"
        },
        "clickCount": {
          "type": "string"
        },
        "clickthroughRate": {
          "type": "number"
        },
        "date": {
          "type": "ref",
          "ref": "Date"
        },
        "deviceType": {
          "type": "string"
        },
        "highIntentUsers": {
          "type": "boolean"
        },
        "impressionCount": {
          "type": "string"
        },
        "lengthOfStay": {
          "type": "string"
        },
        "occupancy": {
          "type": "string"
        },
        "partnerPropertyDisplayName": {
          "type": "string"
        },
        "partnerPropertyId": {
          "type": "string"
        },
        "propertyRegionCode": {
          "type": "string"
        },
        "userRegionCode": {
          "type": "string"
        }
      }
    },
    "QueryFreeBookingLinksReportResponse": {
      "type": "object",
      "properties": {
        "nextPageToken": {
          "type": "string"
        },
        "results": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "FreeBookingLinksResult"
          }
        }
      }
    },
    "QueryParticipationReportResponse": {
      "type": "object",
      "properties": {
        "nextPageToken": {
          "type": "string"
        },
        "results": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ParticipationResult"
          }
        }
      }
    },
    "QueryPropertyPerformanceReportResponse": {
      "type": "object",
      "properties": {
        "nextPageToken": {
          "type": "string"
        },
        "results": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "PropertyPerformanceResult"
          }
        }
      }
    },
    "Rating": {
      "type": "object",
      "properties": {
        "ratingScale": {
          "type": "number"
        },
        "score": {
          "type": "number"
        },
        "type": {
          "type": "string"
        }
      }
    },
    "ReconciliationReport": {
      "type": "object",
      "properties": {
        "contents": {
          "type": "string"
        },
        "fileName": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "ReconciliationReportValidationIssue": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "fieldName": {
          "type": "string"
        },
        "lineNum": {
          "type": "number"
        }
      }
    },
    "Review": {
      "type": "object",
      "properties": {
        "author": {
          "type": "string"
        },
        "body": {
          "type": "string"
        },
        "languageCode": {
          "type": "string"
        },
        "link": {
          "type": "string"
        },
        "rating": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Rating"
          }
        },
        "reviewTime": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "visitTime": {
          "type": "string"
        }
      }
    },
    "SetLiveOnGoogleRequest": {
      "type": "object",
      "properties": {
        "liveOnGoogle": {
          "type": "boolean"
        },
        "partnerHotelIds": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "SetLiveOnGoogleResponse": {
      "type": "object",
      "properties": {
        "failedHotelIds": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "updatedHotelIds": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "SummarizeHotelViewsResponse": {
      "type": "object",
      "properties": {
        "lastFeedSubmissionTime": {
          "type": "string"
        },
        "lastManifestUpdateTime": {
          "type": "string"
        },
        "liveOnGooglePropertyCount": {
          "type": "string"
        },
        "matchedPropertyCount": {
          "type": "string"
        },
        "overclusteredPropertyCount": {
          "type": "string"
        },
        "overclusteredPropertyWithErrorsCount": {
          "type": "string"
        },
        "unmatchedPropertyCount": {
          "type": "string"
        },
        "unmatchedPropertyWithErrorsCount": {
          "type": "string"
        }
      }
    },
    "SummarizePriceAccuracyResponse": {
      "type": "object",
      "properties": {
        "currentBookOnGoogleScore": {
          "type": "string"
        },
        "currentOverallScore": {
          "type": "string"
        },
        "currentScore": {
          "type": "string"
        },
        "currentWebsiteScore": {
          "type": "string"
        },
        "predictedBookOnGoogleScore": {
          "type": "string"
        },
        "predictedOverallScore": {
          "type": "string"
        },
        "predictedScore": {
          "type": "string"
        },
        "predictedWebsiteScore": {
          "type": "string"
        },
        "updateTime": {
          "type": "string"
        }
      }
    },
    "ValidateReconciliationReportResponse": {
      "type": "object",
      "properties": {
        "issues": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ReconciliationReportValidationIssue"
          }
        },
        "successfulRecordCount": {
          "type": "number"
        }
      }
    },
    "VerifyListingsRequest": {
      "type": "object",
      "properties": {
        "xmlListing": {
          "type": "string"
        }
      }
    },
    "VerifyListingsResponse": {
      "type": "object",
      "properties": {
        "parsedListing": {
          "type": "ref",
          "ref": "ParsedListing"
        }
      }
    }
  },
  "entities": {},
  "queries": {
    "travelpartner.accounts.reconciliationReports.get": {
      "name": "travelpartner.accounts.reconciliationReports.get",
      "schema": {
        "type": "ref",
        "ref": "ReconciliationReport"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "name": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "includeMatchedPrices": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "includeNonScoring": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "includePixels": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{name}",
          "params": {
            "name": {
              "$resolve": "args.name"
            }
          },
          "query": {
            "includeMatchedPrices": {
              "$resolve": "args.includeMatchedPrices"
            },
            "includeNonScoring": {
              "$resolve": "args.includeNonScoring"
            },
            "includePixels": {
              "$resolve": "args.includePixels"
            }
          }
        }
      }
    },
    "travelpartner.accounts.freeBookingLinksReportViews.query": {
      "name": "travelpartner.accounts.freeBookingLinksReportViews.query",
      "schema": {
        "type": "ref",
        "ref": "QueryFreeBookingLinksReportResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "name": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "aggregateBy": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "filter": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "pageSize": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pageToken": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{name}/freeBookingLinksReportViews:query",
          "params": {
            "name": {
              "$resolve": "args.name"
            }
          },
          "query": {
            "aggregateBy": {
              "$resolve": "args.aggregateBy"
            },
            "filter": {
              "$resolve": "args.filter"
            },
            "pageSize": {
              "$resolve": "args.pageSize"
            },
            "pageToken": {
              "$resolve": "args.pageToken"
            }
          }
        }
      }
    },
    "travelpartner.accounts.participationReportViews.query": {
      "name": "travelpartner.accounts.participationReportViews.query",
      "schema": {
        "type": "ref",
        "ref": "QueryParticipationReportResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "name": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "aggregateBy": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "filter": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "pageSize": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pageToken": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{name}/participationReportViews:query",
          "params": {
            "name": {
              "$resolve": "args.name"
            }
          },
          "query": {
            "aggregateBy": {
              "$resolve": "args.aggregateBy"
            },
            "filter": {
              "$resolve": "args.filter"
            },
            "pageSize": {
              "$resolve": "args.pageSize"
            },
            "pageToken": {
              "$resolve": "args.pageToken"
            }
          }
        }
      }
    },
    "travelpartner.accounts.propertyPerformanceReportViews.query": {
      "name": "travelpartner.accounts.propertyPerformanceReportViews.query",
      "schema": {
        "type": "ref",
        "ref": "QueryPropertyPerformanceReportResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "name": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "aggregateBy": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "filter": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "pageSize": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pageToken": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{name}/propertyPerformanceReportViews:query",
          "params": {
            "name": {
              "$resolve": "args.name"
            }
          },
          "query": {
            "aggregateBy": {
              "$resolve": "args.aggregateBy"
            },
            "filter": {
              "$resolve": "args.filter"
            },
            "pageSize": {
              "$resolve": "args.pageSize"
            },
            "pageToken": {
              "$resolve": "args.pageToken"
            }
          }
        }
      }
    },
    "travelpartner.accounts.accountLinks.list": {
      "name": "travelpartner.accounts.accountLinks.list",
      "schema": {
        "type": "ref",
        "ref": "ListAccountLinksResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{parent}/accountLinks",
          "params": {
            "parent": {
              "$resolve": "args.parent"
            }
          }
        }
      }
    },
    "travelpartner.accounts.brands.list": {
      "name": "travelpartner.accounts.brands.list",
      "schema": {
        "type": "ref",
        "ref": "ListBrandsResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{parent}/brands",
          "params": {
            "parent": {
              "$resolve": "args.parent"
            }
          }
        }
      }
    },
    "travelpartner.accounts.hotelViews.list": {
      "name": "travelpartner.accounts.hotelViews.list",
      "schema": {
        "type": "ref",
        "ref": "ListHotelViewsResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "filter": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "pageSize": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "pageToken": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{parent}/hotelViews",
          "params": {
            "parent": {
              "$resolve": "args.parent"
            }
          },
          "query": {
            "filter": {
              "$resolve": "args.filter"
            },
            "pageSize": {
              "$resolve": "args.pageSize"
            },
            "pageToken": {
              "$resolve": "args.pageToken"
            }
          }
        }
      }
    },
    "travelpartner.accounts.hotelViews.summarize": {
      "name": "travelpartner.accounts.hotelViews.summarize",
      "schema": {
        "type": "ref",
        "ref": "SummarizeHotelViewsResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{parent}/hotelViews:summarize",
          "params": {
            "parent": {
              "$resolve": "args.parent"
            }
          }
        }
      }
    },
    "travelpartner.accounts.icons.list": {
      "name": "travelpartner.accounts.icons.list",
      "schema": {
        "type": "ref",
        "ref": "ListIconsResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{parent}/icons",
          "params": {
            "parent": {
              "$resolve": "args.parent"
            }
          }
        }
      }
    },
    "travelpartner.accounts.priceAccuracyViews.list": {
      "name": "travelpartner.accounts.priceAccuracyViews.list",
      "schema": {
        "type": "ref",
        "ref": "ListPriceAccuracyViewsResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{parent}/priceAccuracyViews",
          "params": {
            "parent": {
              "$resolve": "args.parent"
            }
          }
        }
      }
    },
    "travelpartner.accounts.priceAccuracyViews.summarize": {
      "name": "travelpartner.accounts.priceAccuracyViews.summarize",
      "schema": {
        "type": "ref",
        "ref": "SummarizePriceAccuracyResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{parent}/priceAccuracyViews:summarize",
          "params": {
            "parent": {
              "$resolve": "args.parent"
            }
          }
        }
      }
    },
    "travelpartner.accounts.priceCoverageViews.list": {
      "name": "travelpartner.accounts.priceCoverageViews.list",
      "schema": {
        "type": "ref",
        "ref": "ListPriceCoverageViewsResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{parent}/priceCoverageViews",
          "params": {
            "parent": {
              "$resolve": "args.parent"
            }
          }
        }
      }
    },
    "travelpartner.accounts.priceCoverageViews.getLatest": {
      "name": "travelpartner.accounts.priceCoverageViews.getLatest",
      "schema": {
        "type": "ref",
        "ref": "PriceCoverageView"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{parent}/priceCoverageViews:latest",
          "params": {
            "parent": {
              "$resolve": "args.parent"
            }
          }
        }
      }
    },
    "travelpartner.accounts.reconciliationReports.list": {
      "name": "travelpartner.accounts.reconciliationReports.list",
      "schema": {
        "type": "ref",
        "ref": "ListReconciliationReportsResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "endDate": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "startDate": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v3/{parent}/reconciliationReports",
          "params": {
            "parent": {
              "$resolve": "args.parent"
            }
          },
          "query": {
            "endDate": {
              "$resolve": "args.endDate"
            },
            "startDate": {
              "$resolve": "args.startDate"
            }
          }
        }
      }
    }
  },
  "actions": {
    "travelpartner.accounts.hotels.setLiveOnGoogle": {
      "name": "travelpartner.accounts.hotels.setLiveOnGoogle",
      "schema": {
        "type": "ref",
        "ref": "SetLiveOnGoogleResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "account": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "SetLiveOnGoogleRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v3/{account}/hotels:setLiveOnGoogle",
          "params": {
            "account": {
              "$resolve": "args.account"
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
    "travelpartner.accounts.accountLinks.delete": {
      "name": "travelpartner.accounts.accountLinks.delete",
      "schema": {
        "type": "ref",
        "ref": "Empty"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "name": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v3/{name}",
          "params": {
            "name": {
              "$resolve": "args.name"
            }
          }
        }
      }
    },
    "travelpartner.accounts.brands.patch": {
      "name": "travelpartner.accounts.brands.patch",
      "schema": {
        "type": "ref",
        "ref": "Brand"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "name": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "allowMissing": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "updateMask": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "Brand"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PATCH",
          "path": "/v3/{name}",
          "params": {
            "name": {
              "$resolve": "args.name"
            }
          },
          "query": {
            "allowMissing": {
              "$resolve": "args.allowMissing"
            },
            "updateMask": {
              "$resolve": "args.updateMask"
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
    "travelpartner.accounts.accountLinks.create": {
      "name": "travelpartner.accounts.accountLinks.create",
      "schema": {
        "type": "ref",
        "ref": "AccountLink"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "AccountLink"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v3/{parent}/accountLinks",
          "params": {
            "parent": {
              "$resolve": "args.parent"
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
    "travelpartner.accounts.brands.create": {
      "name": "travelpartner.accounts.brands.create",
      "schema": {
        "type": "ref",
        "ref": "Brand"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "brandId": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "Brand"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v3/{parent}/brands",
          "params": {
            "parent": {
              "$resolve": "args.parent"
            }
          },
          "query": {
            "brandId": {
              "$resolve": "args.brandId"
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
    "travelpartner.accounts.icons.create": {
      "name": "travelpartner.accounts.icons.create",
      "schema": {
        "type": "ref",
        "ref": "Icon"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "Icon"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v3/{parent}/icons",
          "params": {
            "parent": {
              "$resolve": "args.parent"
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
    "travelpartner.accounts.listings.verify": {
      "name": "travelpartner.accounts.listings.verify",
      "schema": {
        "type": "ref",
        "ref": "VerifyListingsResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "VerifyListingsRequest"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v3/{parent}/listings:verify",
          "params": {
            "parent": {
              "$resolve": "args.parent"
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
    "travelpartner.accounts.reconciliationReports.create": {
      "name": "travelpartner.accounts.reconciliationReports.create",
      "schema": {
        "type": "ref",
        "ref": "CreateReconciliationReportResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ReconciliationReport"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v3/{parent}/reconciliationReports",
          "params": {
            "parent": {
              "$resolve": "args.parent"
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
    "travelpartner.accounts.reconciliationReports.validate": {
      "name": "travelpartner.accounts.reconciliationReports.validate",
      "schema": {
        "type": "ref",
        "ref": "ValidateReconciliationReportResponse"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "parent": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "ref",
            "ref": "ReconciliationReport"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v3/{parent}/reconciliationReports:validate",
          "params": {
            "parent": {
              "$resolve": "args.parent"
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
    }
  }
};

export default spec;
