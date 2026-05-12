import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "spotify",
  "type": "http",
  "connection": {
    "provider": "spotify",
    "baseUrl": "https://api.spotify.com/v1"
  },
  "schemas": {
    "AlbumBase": {
      "type": "object",
      "properties": {
        "album_type": {
          "type": "string"
        },
        "available_markets": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "copyrights": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CopyrightObject"
          }
        },
        "external_ids": {
          "type": "ref",
          "ref": "ExternalIdObject"
        },
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "genres": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "images": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ImageObject"
          }
        },
        "label": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "popularity": {
          "type": "number"
        },
        "release_date": {
          "type": "string"
        },
        "release_date_precision": {
          "type": "string"
        },
        "restrictions": {
          "type": "ref",
          "ref": "AlbumRestrictionObject"
        },
        "total_tracks": {
          "type": "number"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      },
      "required": [
        "album_type",
        "total_tracks",
        "available_markets",
        "external_urls",
        "href",
        "id",
        "images",
        "name",
        "release_date",
        "release_date_precision",
        "type",
        "uri"
      ]
    },
    "AlbumObject": {
      "type": "ref",
      "ref": "AlbumBase"
    },
    "AlbumRestrictionObject": {
      "type": "object",
      "properties": {
        "reason": {
          "type": "string"
        }
      }
    },
    "ArtistObject": {
      "type": "object",
      "properties": {
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "followers": {
          "type": "ref",
          "ref": "FollowersObject"
        },
        "genres": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "images": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ImageObject"
          }
        },
        "name": {
          "type": "string"
        },
        "popularity": {
          "type": "number"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      }
    },
    "AudioAnalysisObject": {
      "type": "object",
      "properties": {
        "bars": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TimeIntervalObject"
          }
        },
        "beats": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TimeIntervalObject"
          }
        },
        "meta": {
          "type": "object",
          "properties": {
            "analysis_time": {
              "type": "number"
            },
            "analyzer_version": {
              "type": "string"
            },
            "detailed_status": {
              "type": "string"
            },
            "input_process": {
              "type": "string"
            },
            "platform": {
              "type": "string"
            },
            "status_code": {
              "type": "number"
            },
            "timestamp": {
              "type": "number"
            }
          }
        },
        "sections": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SectionObject"
          }
        },
        "segments": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SegmentObject"
          }
        },
        "tatums": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TimeIntervalObject"
          }
        },
        "track": {
          "type": "object",
          "properties": {
            "analysis_channels": {
              "type": "number"
            },
            "analysis_sample_rate": {
              "type": "number"
            },
            "code_version": {
              "type": "number"
            },
            "codestring": {
              "type": "string"
            },
            "duration": {
              "type": "number"
            },
            "echoprint_version": {
              "type": "number"
            },
            "echoprintstring": {
              "type": "string"
            },
            "end_of_fade_in": {
              "type": "number"
            },
            "key": {
              "type": "ref",
              "ref": "Key"
            },
            "key_confidence": {
              "type": "number"
            },
            "loudness": {
              "type": "ref",
              "ref": "Loudness"
            },
            "mode": {
              "type": "ref",
              "ref": "Mode"
            },
            "mode_confidence": {
              "type": "number"
            },
            "num_samples": {
              "type": "number"
            },
            "offset_seconds": {
              "type": "number"
            },
            "rhythm_version": {
              "type": "number"
            },
            "rhythmstring": {
              "type": "string"
            },
            "sample_md5": {
              "type": "string"
            },
            "start_of_fade_out": {
              "type": "number"
            },
            "synch_version": {
              "type": "number"
            },
            "synchstring": {
              "type": "string"
            },
            "tempo": {
              "type": "ref",
              "ref": "Tempo"
            },
            "tempo_confidence": {
              "type": "number"
            },
            "time_signature": {
              "type": "ref",
              "ref": "TimeSignature"
            },
            "time_signature_confidence": {
              "type": "number"
            },
            "window_seconds": {
              "type": "number"
            }
          }
        }
      }
    },
    "AudioFeaturesObject": {
      "type": "object",
      "properties": {
        "acousticness": {
          "type": "number"
        },
        "analysis_url": {
          "type": "string"
        },
        "danceability": {
          "type": "number"
        },
        "duration_ms": {
          "type": "number"
        },
        "energy": {
          "type": "number"
        },
        "id": {
          "type": "string"
        },
        "instrumentalness": {
          "type": "number"
        },
        "key": {
          "type": "ref",
          "ref": "Key"
        },
        "liveness": {
          "type": "number"
        },
        "loudness": {
          "type": "ref",
          "ref": "Loudness"
        },
        "mode": {
          "type": "ref",
          "ref": "Mode"
        },
        "speechiness": {
          "type": "number"
        },
        "tempo": {
          "type": "ref",
          "ref": "Tempo"
        },
        "time_signature": {
          "type": "ref",
          "ref": "TimeSignature"
        },
        "track_href": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        },
        "valence": {
          "type": "number"
        }
      }
    },
    "AudiobookBase": {
      "type": "object",
      "properties": {
        "authors": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "AuthorObject"
          }
        },
        "available_markets": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "copyrights": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CopyrightObject"
          }
        },
        "description": {
          "type": "string"
        },
        "edition": {
          "type": "string"
        },
        "explicit": {
          "type": "boolean"
        },
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "href": {
          "type": "string"
        },
        "html_description": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "images": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ImageObject"
          }
        },
        "languages": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "media_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "narrators": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "NarratorObject"
          }
        },
        "publisher": {
          "type": "string"
        },
        "total_chapters": {
          "type": "number"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      },
      "required": [
        "authors",
        "available_markets",
        "copyrights",
        "description",
        "explicit",
        "external_urls",
        "href",
        "html_description",
        "id",
        "images",
        "languages",
        "media_type",
        "name",
        "narrators",
        "publisher",
        "total_chapters",
        "type",
        "uri"
      ]
    },
    "AudiobookObject": {
      "type": "ref",
      "ref": "AudiobookBase"
    },
    "AuthorObject": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      }
    },
    "CategoryObject": {
      "type": "object",
      "properties": {
        "href": {
          "type": "string"
        },
        "icons": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ImageObject"
          }
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "href",
        "icons",
        "id",
        "name"
      ]
    },
    "ChapterBase": {
      "type": "object",
      "properties": {
        "audio_preview_url": {
          "type": "string"
        },
        "available_markets": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "chapter_number": {
          "type": "number"
        },
        "description": {
          "type": "string"
        },
        "duration_ms": {
          "type": "number"
        },
        "explicit": {
          "type": "boolean"
        },
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "href": {
          "type": "string"
        },
        "html_description": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "images": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ImageObject"
          }
        },
        "is_playable": {
          "type": "boolean"
        },
        "languages": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "name": {
          "type": "string"
        },
        "release_date": {
          "type": "string"
        },
        "release_date_precision": {
          "type": "string"
        },
        "restrictions": {
          "type": "ref",
          "ref": "ChapterRestrictionObject"
        },
        "resume_point": {
          "type": "ref",
          "ref": "ResumePointObject"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      },
      "required": [
        "audio_preview_url",
        "chapter_number",
        "description",
        "html_description",
        "duration_ms",
        "explicit",
        "external_urls",
        "href",
        "id",
        "images",
        "is_playable",
        "languages",
        "name",
        "release_date",
        "release_date_precision",
        "resume_point",
        "type",
        "uri"
      ]
    },
    "ChapterObject": {
      "type": "ref",
      "ref": "ChapterBase"
    },
    "ChapterRestrictionObject": {
      "type": "object",
      "properties": {
        "reason": {
          "type": "string"
        }
      }
    },
    "ContextObject": {
      "type": "object",
      "properties": {
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "href": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      }
    },
    "CopyrightObject": {
      "type": "object",
      "properties": {
        "text": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      }
    },
    "CurrentlyPlayingContextObject": {
      "type": "object",
      "properties": {
        "actions": {
          "type": "ref",
          "ref": "DisallowsObject"
        },
        "context": {
          "type": "ref",
          "ref": "ContextObject"
        },
        "currently_playing_type": {
          "type": "string"
        },
        "device": {
          "type": "ref",
          "ref": "DeviceObject"
        },
        "is_playing": {
          "type": "boolean"
        },
        "item": {
          "type": "ref",
          "ref": "TrackObject"
        },
        "progress_ms": {
          "type": "number"
        },
        "repeat_state": {
          "type": "string"
        },
        "shuffle_state": {
          "type": "boolean"
        },
        "timestamp": {
          "type": "number"
        }
      }
    },
    "CurrentlyPlayingObject": {
      "type": "object",
      "properties": {
        "context": {
          "type": "ref",
          "ref": "ContextObject"
        },
        "currently_playing_type": {
          "type": "string"
        },
        "is_playing": {
          "type": "boolean"
        },
        "item": {
          "type": "ref",
          "ref": "TrackObject"
        },
        "progress_ms": {
          "type": "number"
        },
        "timestamp": {
          "type": "number"
        }
      }
    },
    "CursorObject": {
      "type": "object",
      "properties": {
        "after": {
          "type": "string"
        },
        "before": {
          "type": "string"
        }
      }
    },
    "CursorPagingObject": {
      "type": "object",
      "properties": {
        "cursors": {
          "type": "ref",
          "ref": "CursorObject"
        },
        "href": {
          "type": "string"
        },
        "limit": {
          "type": "number"
        },
        "next": {
          "type": "string"
        },
        "total": {
          "type": "number"
        }
      }
    },
    "CursorPagingPlayHistoryObject": {
      "type": "ref",
      "ref": "CursorPagingObject"
    },
    "CursorPagingSimplifiedArtistObject": {
      "type": "ref",
      "ref": "CursorPagingObject"
    },
    "DeviceObject": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "is_active": {
          "type": "boolean"
        },
        "is_private_session": {
          "type": "boolean"
        },
        "is_restricted": {
          "type": "boolean"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "volume_percent": {
          "type": "number"
        }
      }
    },
    "DevicesObject": {
      "type": "object",
      "properties": {
        "devices": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DeviceObject"
          }
        }
      }
    },
    "DisallowsObject": {
      "type": "object",
      "properties": {
        "interrupting_playback": {
          "type": "boolean"
        },
        "pausing": {
          "type": "boolean"
        },
        "resuming": {
          "type": "boolean"
        },
        "seeking": {
          "type": "boolean"
        },
        "skipping_next": {
          "type": "boolean"
        },
        "skipping_prev": {
          "type": "boolean"
        },
        "toggling_repeat_context": {
          "type": "boolean"
        },
        "toggling_repeat_track": {
          "type": "boolean"
        },
        "toggling_shuffle": {
          "type": "boolean"
        },
        "transferring_playback": {
          "type": "boolean"
        }
      }
    },
    "EpisodeBase": {
      "type": "object",
      "properties": {
        "audio_preview_url": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "duration_ms": {
          "type": "number"
        },
        "explicit": {
          "type": "boolean"
        },
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "href": {
          "type": "string"
        },
        "html_description": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "images": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ImageObject"
          }
        },
        "is_externally_hosted": {
          "type": "boolean"
        },
        "is_playable": {
          "type": "boolean"
        },
        "language": {
          "type": "string"
        },
        "languages": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "name": {
          "type": "string"
        },
        "release_date": {
          "type": "string"
        },
        "release_date_precision": {
          "type": "string"
        },
        "restrictions": {
          "type": "ref",
          "ref": "EpisodeRestrictionObject"
        },
        "resume_point": {
          "type": "ref",
          "ref": "ResumePointObject"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      },
      "required": [
        "audio_preview_url",
        "description",
        "html_description",
        "duration_ms",
        "explicit",
        "external_urls",
        "href",
        "id",
        "images",
        "is_externally_hosted",
        "is_playable",
        "languages",
        "name",
        "release_date",
        "release_date_precision",
        "resume_point",
        "type",
        "uri"
      ]
    },
    "EpisodeObject": {
      "type": "ref",
      "ref": "EpisodeBase"
    },
    "EpisodeRestrictionObject": {
      "type": "object",
      "properties": {
        "reason": {
          "type": "string"
        }
      }
    },
    "ErrorObject": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        },
        "status": {
          "type": "number"
        }
      },
      "required": [
        "status",
        "message"
      ]
    },
    "ExplicitContentSettingsObject": {
      "type": "object",
      "properties": {
        "filter_enabled": {
          "type": "boolean"
        },
        "filter_locked": {
          "type": "boolean"
        }
      }
    },
    "ExternalIdObject": {
      "type": "object",
      "properties": {
        "ean": {
          "type": "string"
        },
        "isrc": {
          "type": "string"
        },
        "upc": {
          "type": "string"
        }
      }
    },
    "ExternalUrlObject": {
      "type": "object",
      "properties": {
        "spotify": {
          "type": "string"
        }
      }
    },
    "FollowersObject": {
      "type": "object",
      "properties": {
        "href": {
          "type": "string"
        },
        "total": {
          "type": "number"
        }
      }
    },
    "ImageObject": {
      "type": "object",
      "properties": {
        "height": {
          "type": "number"
        },
        "url": {
          "type": "string"
        },
        "width": {
          "type": "number"
        }
      },
      "required": [
        "url",
        "height",
        "width"
      ]
    },
    "Key": {
      "type": "number"
    },
    "LinkedTrackObject": {
      "type": "object",
      "properties": {
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      }
    },
    "Loudness": {
      "type": "number"
    },
    "Mode": {
      "type": "number"
    },
    "NarratorObject": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      }
    },
    "PagingArtistObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingFeaturedPlaylistObject": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        },
        "playlists": {
          "type": "ref",
          "ref": "PagingPlaylistObject"
        }
      }
    },
    "PagingObject": {
      "type": "object",
      "properties": {
        "href": {
          "type": "string"
        },
        "limit": {
          "type": "number"
        },
        "next": {
          "type": "string"
        },
        "offset": {
          "type": "number"
        },
        "previous": {
          "type": "string"
        },
        "total": {
          "type": "number"
        }
      },
      "required": [
        "href",
        "items",
        "limit",
        "next",
        "offset",
        "previous",
        "total"
      ]
    },
    "PagingPlaylistObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingPlaylistTrackObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingSavedAlbumObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingSavedEpisodeObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingSavedShowObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingSavedTrackObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingSimplifiedAlbumObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingSimplifiedArtistObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingSimplifiedAudiobookObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingSimplifiedChapterObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingSimplifiedEpisodeObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingSimplifiedShowObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingSimplifiedTrackObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PagingTrackObject": {
      "type": "ref",
      "ref": "PagingObject"
    },
    "PlayHistoryObject": {
      "type": "object",
      "properties": {
        "context": {
          "type": "ref",
          "ref": "ContextObject"
        },
        "played_at": {
          "type": "string"
        },
        "track": {
          "type": "ref",
          "ref": "TrackObject"
        }
      }
    },
    "PlayerErrorObject": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        },
        "reason": {
          "type": "ref",
          "ref": "PlayerErrorReasons"
        },
        "status": {
          "type": "number"
        }
      }
    },
    "PlayerErrorReasons": {
      "type": "string"
    },
    "PlaylistObject": {
      "type": "object",
      "properties": {
        "collaborative": {
          "type": "boolean"
        },
        "description": {
          "type": "string"
        },
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "followers": {
          "type": "ref",
          "ref": "FollowersObject"
        },
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "images": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ImageObject"
          }
        },
        "name": {
          "type": "string"
        },
        "owner": {
          "type": "ref",
          "ref": "PlaylistOwnerObject"
        },
        "public": {
          "type": "boolean"
        },
        "snapshot_id": {
          "type": "string"
        },
        "tracks": {
          "type": "ref",
          "ref": "PagingPlaylistTrackObject"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      }
    },
    "PlaylistOwnerObject": {
      "type": "ref",
      "ref": "PlaylistUserObject"
    },
    "PlaylistTrackObject": {
      "type": "object",
      "properties": {
        "added_at": {
          "type": "string"
        },
        "added_by": {
          "type": "ref",
          "ref": "PlaylistUserObject"
        },
        "is_local": {
          "type": "boolean"
        },
        "track": {
          "type": "ref",
          "ref": "TrackObject"
        }
      }
    },
    "PlaylistTracksRefObject": {
      "type": "object",
      "properties": {
        "href": {
          "type": "string"
        },
        "total": {
          "type": "number"
        }
      }
    },
    "PlaylistUserObject": {
      "type": "object",
      "properties": {
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "followers": {
          "type": "ref",
          "ref": "FollowersObject"
        },
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      }
    },
    "PrivateUserObject": {
      "type": "object",
      "properties": {
        "country": {
          "type": "string"
        },
        "display_name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "explicit_content": {
          "type": "ref",
          "ref": "ExplicitContentSettingsObject"
        },
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "followers": {
          "type": "ref",
          "ref": "FollowersObject"
        },
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "images": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ImageObject"
          }
        },
        "product": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      }
    },
    "PublicUserObject": {
      "type": "object",
      "properties": {
        "display_name": {
          "type": "string"
        },
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "followers": {
          "type": "ref",
          "ref": "FollowersObject"
        },
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "images": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ImageObject"
          }
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      }
    },
    "QueueObject": {
      "type": "object",
      "properties": {
        "currently_playing": {
          "type": "ref",
          "ref": "TrackObject"
        },
        "queue": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TrackObject"
          }
        }
      }
    },
    "RecommendationSeedObject": {
      "type": "object",
      "properties": {
        "afterFilteringSize": {
          "type": "number"
        },
        "afterRelinkingSize": {
          "type": "number"
        },
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "initialPoolSize": {
          "type": "number"
        },
        "type": {
          "type": "string"
        }
      }
    },
    "RecommendationsObject": {
      "type": "object",
      "properties": {
        "seeds": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RecommendationSeedObject"
          }
        },
        "tracks": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "TrackObject"
          }
        }
      },
      "required": [
        "seeds",
        "tracks"
      ]
    },
    "ResumePointObject": {
      "type": "object",
      "properties": {
        "fully_played": {
          "type": "boolean"
        },
        "resume_position_ms": {
          "type": "number"
        }
      }
    },
    "SavedAlbumObject": {
      "type": "object",
      "properties": {
        "added_at": {
          "type": "string"
        },
        "album": {
          "type": "ref",
          "ref": "AlbumObject"
        }
      }
    },
    "SavedEpisodeObject": {
      "type": "object",
      "properties": {
        "added_at": {
          "type": "string"
        },
        "episode": {
          "type": "ref",
          "ref": "EpisodeObject"
        }
      }
    },
    "SavedShowObject": {
      "type": "object",
      "properties": {
        "added_at": {
          "type": "string"
        },
        "show": {
          "type": "ref",
          "ref": "SimplifiedShowObject"
        }
      }
    },
    "SavedTrackObject": {
      "type": "object",
      "properties": {
        "added_at": {
          "type": "string"
        },
        "track": {
          "type": "ref",
          "ref": "TrackObject"
        }
      }
    },
    "SectionObject": {
      "type": "object",
      "properties": {
        "confidence": {
          "type": "number"
        },
        "duration": {
          "type": "number"
        },
        "key": {
          "type": "number"
        },
        "key_confidence": {
          "type": "number"
        },
        "loudness": {
          "type": "number"
        },
        "mode": {
          "type": "number"
        },
        "mode_confidence": {
          "type": "number"
        },
        "start": {
          "type": "number"
        },
        "tempo": {
          "type": "number"
        },
        "tempo_confidence": {
          "type": "number"
        },
        "time_signature": {
          "type": "ref",
          "ref": "TimeSignature"
        },
        "time_signature_confidence": {
          "type": "number"
        }
      }
    },
    "SegmentObject": {
      "type": "object",
      "properties": {
        "confidence": {
          "type": "number"
        },
        "duration": {
          "type": "number"
        },
        "loudness_end": {
          "type": "number"
        },
        "loudness_max": {
          "type": "number"
        },
        "loudness_max_time": {
          "type": "number"
        },
        "loudness_start": {
          "type": "number"
        },
        "pitches": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "start": {
          "type": "number"
        },
        "timbre": {
          "type": "array",
          "items": {
            "type": "number"
          }
        }
      }
    },
    "ShowBase": {
      "type": "object",
      "properties": {
        "available_markets": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "copyrights": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CopyrightObject"
          }
        },
        "description": {
          "type": "string"
        },
        "explicit": {
          "type": "boolean"
        },
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "href": {
          "type": "string"
        },
        "html_description": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "images": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ImageObject"
          }
        },
        "is_externally_hosted": {
          "type": "boolean"
        },
        "languages": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "media_type": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "publisher": {
          "type": "string"
        },
        "total_episodes": {
          "type": "number"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      },
      "required": [
        "available_markets",
        "copyrights",
        "description",
        "explicit",
        "external_urls",
        "href",
        "html_description",
        "id",
        "images",
        "is_externally_hosted",
        "languages",
        "media_type",
        "name",
        "publisher",
        "total_episodes",
        "type",
        "uri"
      ]
    },
    "ShowObject": {
      "type": "ref",
      "ref": "ShowBase"
    },
    "SimplifiedAlbumObject": {
      "type": "ref",
      "ref": "AlbumBase"
    },
    "SimplifiedArtistObject": {
      "type": "object",
      "properties": {
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      }
    },
    "SimplifiedAudiobookObject": {
      "type": "ref",
      "ref": "AudiobookBase"
    },
    "SimplifiedChapterObject": {
      "type": "ref",
      "ref": "ChapterBase"
    },
    "SimplifiedEpisodeObject": {
      "type": "ref",
      "ref": "EpisodeBase"
    },
    "SimplifiedPlaylistObject": {
      "type": "object",
      "properties": {
        "collaborative": {
          "type": "boolean"
        },
        "description": {
          "type": "string"
        },
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "images": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ImageObject"
          }
        },
        "name": {
          "type": "string"
        },
        "owner": {
          "type": "ref",
          "ref": "PlaylistOwnerObject"
        },
        "public": {
          "type": "boolean"
        },
        "snapshot_id": {
          "type": "string"
        },
        "tracks": {
          "type": "ref",
          "ref": "PlaylistTracksRefObject"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      }
    },
    "SimplifiedShowObject": {
      "type": "ref",
      "ref": "ShowBase"
    },
    "SimplifiedTrackObject": {
      "type": "object",
      "properties": {
        "artists": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SimplifiedArtistObject"
          }
        },
        "available_markets": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "disc_number": {
          "type": "number"
        },
        "duration_ms": {
          "type": "number"
        },
        "explicit": {
          "type": "boolean"
        },
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "is_local": {
          "type": "boolean"
        },
        "is_playable": {
          "type": "boolean"
        },
        "linked_from": {
          "type": "ref",
          "ref": "LinkedTrackObject"
        },
        "name": {
          "type": "string"
        },
        "preview_url": {
          "type": "string"
        },
        "restrictions": {
          "type": "ref",
          "ref": "TrackRestrictionObject"
        },
        "track_number": {
          "type": "number"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      }
    },
    "Tempo": {
      "type": "number"
    },
    "TimeIntervalObject": {
      "type": "object",
      "properties": {
        "confidence": {
          "type": "number"
        },
        "duration": {
          "type": "number"
        },
        "start": {
          "type": "number"
        }
      }
    },
    "TimeSignature": {
      "type": "number"
    },
    "TrackObject": {
      "type": "object",
      "properties": {
        "album": {
          "type": "ref",
          "ref": "SimplifiedAlbumObject"
        },
        "artists": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ArtistObject"
          }
        },
        "available_markets": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "disc_number": {
          "type": "number"
        },
        "duration_ms": {
          "type": "number"
        },
        "explicit": {
          "type": "boolean"
        },
        "external_ids": {
          "type": "ref",
          "ref": "ExternalIdObject"
        },
        "external_urls": {
          "type": "ref",
          "ref": "ExternalUrlObject"
        },
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "is_local": {
          "type": "boolean"
        },
        "is_playable": {
          "type": "boolean"
        },
        "linked_from": {
          "type": "object",
          "properties": {}
        },
        "name": {
          "type": "string"
        },
        "popularity": {
          "type": "number"
        },
        "preview_url": {
          "type": "string"
        },
        "restrictions": {
          "type": "ref",
          "ref": "TrackRestrictionObject"
        },
        "track_number": {
          "type": "number"
        },
        "type": {
          "type": "string"
        },
        "uri": {
          "type": "string"
        }
      }
    },
    "TrackRestrictionObject": {
      "type": "object",
      "properties": {
        "reason": {
          "type": "string"
        }
      }
    },
    "TuneableTrackObject": {
      "type": "object",
      "properties": {
        "acousticness": {
          "type": "number"
        },
        "danceability": {
          "type": "number"
        },
        "duration_ms": {
          "type": "number"
        },
        "energy": {
          "type": "number"
        },
        "instrumentalness": {
          "type": "number"
        },
        "key": {
          "type": "ref",
          "ref": "Key"
        },
        "liveness": {
          "type": "number"
        },
        "loudness": {
          "type": "ref",
          "ref": "Loudness"
        },
        "mode": {
          "type": "ref",
          "ref": "Mode"
        },
        "popularity": {
          "type": "number"
        },
        "speechiness": {
          "type": "number"
        },
        "tempo": {
          "type": "ref",
          "ref": "Tempo"
        },
        "time_signature": {
          "type": "ref",
          "ref": "TimeSignature"
        },
        "valence": {
          "type": "number"
        }
      }
    }
  },
  "entities": {},
  "queries": {
    "get-multiple-albums": {
      "name": "Get Several Albums\n",
      "schema": {
        "type": "object"
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
          "path": "/albums"
        }
      }
    },
    "get-an-album": {
      "name": "Get Album\n",
      "schema": {
        "type": "object"
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
          "path": "/albums/{id}"
        }
      }
    },
    "get-an-albums-tracks": {
      "name": "Get Album Tracks\n",
      "schema": {
        "type": "object"
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
          "path": "/albums/{id}/tracks"
        }
      }
    },
    "get-multiple-artists": {
      "name": "Get Several Artists\n",
      "schema": {
        "type": "object"
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
          "method": "GET",
          "path": "/artists",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "get-an-artist": {
      "name": "Get Artist\n",
      "schema": {
        "type": "object"
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
          "path": "/artists/{id}"
        }
      }
    },
    "get-an-artists-albums": {
      "name": "Get Artist's Albums\n",
      "schema": {
        "type": "object"
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
          "path": "/artists/{id}/albums"
        }
      }
    },
    "get-an-artists-related-artists": {
      "name": "Get Artist's Related Artists\n",
      "schema": {
        "type": "object"
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
          "path": "/artists/{id}/related-artists"
        }
      }
    },
    "get-an-artists-top-tracks": {
      "name": "Get Artist's Top Tracks\n",
      "schema": {
        "type": "object"
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
          "path": "/artists/{id}/top-tracks"
        }
      }
    },
    "get-audio-analysis": {
      "name": "Get Track's Audio Analysis\n",
      "schema": {
        "type": "object"
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
          "path": "/audio-analysis/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "get-several-audio-features": {
      "name": "Get Tracks' Audio Features\n",
      "schema": {
        "type": "object"
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
          "method": "GET",
          "path": "/audio-features",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "get-audio-features": {
      "name": "Get Track's Audio Features\n",
      "schema": {
        "type": "object"
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
          "path": "/audio-features/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "get-multiple-audiobooks": {
      "name": "Get Several Audiobooks\n",
      "schema": {
        "type": "object"
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
          "path": "/audiobooks"
        }
      }
    },
    "get-an-audiobook": {
      "name": "Get an Audiobook\n",
      "schema": {
        "type": "object"
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
          "path": "/audiobooks/{id}"
        }
      }
    },
    "get-audiobook-chapters": {
      "name": "Get Audiobook Chapters\n",
      "schema": {
        "type": "object"
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
          "path": "/audiobooks/{id}/chapters"
        }
      }
    },
    "get-categories": {
      "name": "Get Several Browse Categories\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "country": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "locale": {
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
          "path": "/browse/categories",
          "query": {
            "country": {
              "$resolve": "args.country"
            },
            "locale": {
              "$resolve": "args.locale"
            }
          }
        }
      }
    },
    "get-a-category": {
      "name": "Get Single Browse Category\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "category_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "country": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "locale": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/browse/categories/{category_id}",
          "params": {
            "category_id": {
              "$resolve": "args.category_id"
            }
          },
          "query": {
            "country": {
              "$resolve": "args.country"
            },
            "locale": {
              "$resolve": "args.locale"
            }
          }
        }
      }
    },
    "get-a-categories-playlists": {
      "name": "Get Category's Playlists\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "category_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "country": {
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
          "path": "/browse/categories/{category_id}/playlists",
          "params": {
            "category_id": {
              "$resolve": "args.category_id"
            }
          },
          "query": {
            "country": {
              "$resolve": "args.country"
            }
          }
        }
      }
    },
    "get-featured-playlists": {
      "name": "Get Featured Playlists\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "country": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "locale": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "timestamp": {
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
          "path": "/browse/featured-playlists",
          "query": {
            "country": {
              "$resolve": "args.country"
            },
            "locale": {
              "$resolve": "args.locale"
            },
            "timestamp": {
              "$resolve": "args.timestamp"
            }
          }
        }
      }
    },
    "get-new-releases": {
      "name": "Get New Releases\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "country": {
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
          "path": "/browse/new-releases",
          "query": {
            "country": {
              "$resolve": "args.country"
            }
          }
        }
      }
    },
    "get-several-chapters": {
      "name": "Get Several Chapters\n",
      "schema": {
        "type": "object"
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
          "path": "/chapters"
        }
      }
    },
    "get-a-chapter": {
      "name": "Get a Chapter\n",
      "schema": {
        "type": "object"
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
          "path": "/chapters/{id}"
        }
      }
    },
    "get-multiple-episodes": {
      "name": "Get Several Episodes\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "ids": {
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
          "path": "/episodes",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "get-an-episode": {
      "name": "Get Episode\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "id": {
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
          "path": "/episodes/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "get-available-markets": {
      "name": "Get Available Markets\n",
      "schema": {
        "type": "object",
        "properties": {
          "markets": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/markets"
        }
      }
    },
    "get-current-users-profile": {
      "name": "Get Current User's Profile\n",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/me"
        }
      }
    },
    "get-users-saved-albums": {
      "name": "Get User's Saved Albums\n",
      "schema": {
        "type": "object"
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
          "path": "/me/albums"
        }
      }
    },
    "check-users-saved-albums": {
      "name": "Check User's Saved Albums\n",
      "schema": {
        "type": "object"
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
          "path": "/me/albums/contains"
        }
      }
    },
    "get-users-saved-audiobooks": {
      "name": "Get User's Saved Audiobooks\n",
      "schema": {
        "type": "object"
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
          "path": "/me/audiobooks"
        }
      }
    },
    "check-users-saved-audiobooks": {
      "name": "Check User's Saved Audiobooks\n",
      "schema": {
        "type": "object"
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
          "path": "/me/audiobooks/contains"
        }
      }
    },
    "get-users-saved-episodes": {
      "name": "Get User's Saved Episodes\n",
      "schema": {
        "type": "object"
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
          "path": "/me/episodes"
        }
      }
    },
    "check-users-saved-episodes": {
      "name": "Check User's Saved Episodes\n",
      "schema": {
        "type": "object"
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
          "method": "GET",
          "path": "/me/episodes/contains",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "get-followed": {
      "name": "Get Followed Artists\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "type": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "after": {
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
          "path": "/me/following",
          "query": {
            "type": {
              "$resolve": "args.type"
            },
            "after": {
              "$resolve": "args.after"
            },
            "limit": {
              "$resolve": "args.limit"
            }
          }
        }
      }
    },
    "check-current-user-follows": {
      "name": "Check If User Follows Artists or Users\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "type": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "ids": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/me/following/contains",
          "query": {
            "type": {
              "$resolve": "args.type"
            },
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "get-information-about-the-users-current-playback": {
      "name": "Get Playback State\n",
      "schema": {
        "type": "object"
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
          "path": "/me/player"
        }
      }
    },
    "get-the-users-currently-playing-track": {
      "name": "Get Currently Playing Track\n",
      "schema": {
        "type": "object"
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
          "path": "/me/player/currently-playing"
        }
      }
    },
    "get-a-users-available-devices": {
      "name": "Get Available Devices\n",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/me/player/devices"
        }
      }
    },
    "get-queue": {
      "name": "Get the User's Queue\n",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/me/player/queue"
        }
      }
    },
    "get-recently-played": {
      "name": "Get Recently Played Tracks\n",
      "schema": {
        "type": "object"
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
            "type": "number"
          },
          "required": false
        },
        "before": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/me/player/recently-played",
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
    "get-a-list-of-current-users-playlists": {
      "name": "Get Current User's Playlists\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "offset": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/me/playlists",
          "query": {
            "offset": {
              "$resolve": "args.offset"
            }
          }
        }
      }
    },
    "get-users-saved-shows": {
      "name": "Get User's Saved Shows\n",
      "schema": {
        "type": "object"
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
          "path": "/me/shows"
        }
      }
    },
    "check-users-saved-shows": {
      "name": "Check User's Saved Shows\n",
      "schema": {
        "type": "object"
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
          "path": "/me/shows/contains"
        }
      }
    },
    "get-users-top-artists-and-tracks": {
      "name": "Get User's Top Items\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "type": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "time_range": {
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
          "path": "/me/top/{type}",
          "params": {
            "type": {
              "$resolve": "args.type"
            }
          },
          "query": {
            "time_range": {
              "$resolve": "args.time_range"
            }
          }
        }
      }
    },
    "get-users-saved-tracks": {
      "name": "Get User's Saved Tracks\n",
      "schema": {
        "type": "object"
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
          "path": "/me/tracks"
        }
      }
    },
    "check-users-saved-tracks": {
      "name": "Check User's Saved Tracks\n",
      "schema": {
        "type": "object"
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
          "path": "/me/tracks/contains"
        }
      }
    },
    "get-playlist": {
      "name": "Get Playlist\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "fields": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/playlists/{playlist_id}",
          "query": {
            "fields": {
              "$resolve": "args.fields"
            }
          }
        }
      }
    },
    "check-if-user-follows-playlist": {
      "name": "Check if Users Follow Playlist\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "ids": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/playlists/{playlist_id}/followers/contains",
          "query": {
            "ids": {
              "$resolve": "args.ids"
            }
          }
        }
      }
    },
    "get-playlist-cover": {
      "name": "Get Playlist Cover Image\n",
      "schema": {
        "type": "object"
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
          "path": "/playlists/{playlist_id}/images"
        }
      }
    },
    "get-playlists-tracks": {
      "name": "Get Playlist Items\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "fields": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/playlists/{playlist_id}/tracks",
          "query": {
            "fields": {
              "$resolve": "args.fields"
            }
          }
        }
      }
    },
    "get-recommendations": {
      "name": "Get Recommendations\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "seed_artists": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "seed_genres": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "seed_tracks": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "min_acousticness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_acousticness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_acousticness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_danceability": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_danceability": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_danceability": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_duration_ms": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_duration_ms": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_duration_ms": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_energy": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_energy": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_energy": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_instrumentalness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_instrumentalness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_instrumentalness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_key": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_key": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_key": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_liveness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_liveness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_liveness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_loudness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_loudness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_loudness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_mode": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_mode": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_mode": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_popularity": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_popularity": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_popularity": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_speechiness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_speechiness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_speechiness": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_tempo": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_tempo": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_tempo": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_time_signature": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_time_signature": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_time_signature": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "min_valence": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "max_valence": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "target_valence": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/recommendations",
          "query": {
            "limit": {
              "$resolve": "args.limit"
            },
            "seed_artists": {
              "$resolve": "args.seed_artists"
            },
            "seed_genres": {
              "$resolve": "args.seed_genres"
            },
            "seed_tracks": {
              "$resolve": "args.seed_tracks"
            },
            "min_acousticness": {
              "$resolve": "args.min_acousticness"
            },
            "max_acousticness": {
              "$resolve": "args.max_acousticness"
            },
            "target_acousticness": {
              "$resolve": "args.target_acousticness"
            },
            "min_danceability": {
              "$resolve": "args.min_danceability"
            },
            "max_danceability": {
              "$resolve": "args.max_danceability"
            },
            "target_danceability": {
              "$resolve": "args.target_danceability"
            },
            "min_duration_ms": {
              "$resolve": "args.min_duration_ms"
            },
            "max_duration_ms": {
              "$resolve": "args.max_duration_ms"
            },
            "target_duration_ms": {
              "$resolve": "args.target_duration_ms"
            },
            "min_energy": {
              "$resolve": "args.min_energy"
            },
            "max_energy": {
              "$resolve": "args.max_energy"
            },
            "target_energy": {
              "$resolve": "args.target_energy"
            },
            "min_instrumentalness": {
              "$resolve": "args.min_instrumentalness"
            },
            "max_instrumentalness": {
              "$resolve": "args.max_instrumentalness"
            },
            "target_instrumentalness": {
              "$resolve": "args.target_instrumentalness"
            },
            "min_key": {
              "$resolve": "args.min_key"
            },
            "max_key": {
              "$resolve": "args.max_key"
            },
            "target_key": {
              "$resolve": "args.target_key"
            },
            "min_liveness": {
              "$resolve": "args.min_liveness"
            },
            "max_liveness": {
              "$resolve": "args.max_liveness"
            },
            "target_liveness": {
              "$resolve": "args.target_liveness"
            },
            "min_loudness": {
              "$resolve": "args.min_loudness"
            },
            "max_loudness": {
              "$resolve": "args.max_loudness"
            },
            "target_loudness": {
              "$resolve": "args.target_loudness"
            },
            "min_mode": {
              "$resolve": "args.min_mode"
            },
            "max_mode": {
              "$resolve": "args.max_mode"
            },
            "target_mode": {
              "$resolve": "args.target_mode"
            },
            "min_popularity": {
              "$resolve": "args.min_popularity"
            },
            "max_popularity": {
              "$resolve": "args.max_popularity"
            },
            "target_popularity": {
              "$resolve": "args.target_popularity"
            },
            "min_speechiness": {
              "$resolve": "args.min_speechiness"
            },
            "max_speechiness": {
              "$resolve": "args.max_speechiness"
            },
            "target_speechiness": {
              "$resolve": "args.target_speechiness"
            },
            "min_tempo": {
              "$resolve": "args.min_tempo"
            },
            "max_tempo": {
              "$resolve": "args.max_tempo"
            },
            "target_tempo": {
              "$resolve": "args.target_tempo"
            },
            "min_time_signature": {
              "$resolve": "args.min_time_signature"
            },
            "max_time_signature": {
              "$resolve": "args.max_time_signature"
            },
            "target_time_signature": {
              "$resolve": "args.target_time_signature"
            },
            "min_valence": {
              "$resolve": "args.min_valence"
            },
            "max_valence": {
              "$resolve": "args.max_valence"
            },
            "target_valence": {
              "$resolve": "args.target_valence"
            }
          }
        }
      }
    },
    "get-recommendation-genres": {
      "name": "Get Available Genre Seeds\n",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/recommendations/available-genre-seeds"
        }
      }
    },
    "search": {
      "name": "Search for Item\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "q": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "type": {
          "schema": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "required": true
        },
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "limit": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "offset": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "include_external": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/search",
          "query": {
            "q": {
              "$resolve": "args.q"
            },
            "type": {
              "$resolve": "args.type"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "offset": {
              "$resolve": "args.offset"
            },
            "include_external": {
              "$resolve": "args.include_external"
            }
          }
        }
      }
    },
    "get-multiple-shows": {
      "name": "Get Several Shows\n",
      "schema": {
        "type": "object"
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
          "path": "/shows"
        }
      }
    },
    "get-a-show": {
      "name": "Get Show\n",
      "schema": {
        "type": "object"
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
          "path": "/shows/{id}"
        }
      }
    },
    "get-a-shows-episodes": {
      "name": "Get Show Episodes\n",
      "schema": {
        "type": "object"
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
          "path": "/shows/{id}/episodes"
        }
      }
    },
    "get-several-tracks": {
      "name": "Get Several Tracks\n",
      "schema": {
        "type": "object"
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
          "path": "/tracks"
        }
      }
    },
    "get-track": {
      "name": "Get Track\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "id": {
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
          "path": "/tracks/{id}",
          "params": {
            "id": {
              "$resolve": "args.id"
            }
          }
        }
      }
    },
    "get-users-profile": {
      "name": "Get User's Profile\n",
      "schema": {
        "type": "object"
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
          "path": "/users/{user_id}"
        }
      }
    },
    "get-list-users-playlists": {
      "name": "Get User's Playlists\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "offset": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/users/{user_id}/playlists",
          "query": {
            "offset": {
              "$resolve": "args.offset"
            }
          }
        }
      }
    }
  },
  "actions": {
    "remove-albums-user": {
      "name": "Remove Users' Saved Albums\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "ids": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/me/albums",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "save-albums-user": {
      "name": "Save Albums for Current User\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "ids": {
                "type": "array",
                "items": {
                  "type": "string"
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
          "path": "/me/albums",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "remove-audiobooks-user": {
      "name": "Remove User's Saved Audiobooks\n",
      "schema": {
        "type": "object"
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
          "method": "DELETE",
          "path": "/me/audiobooks"
        }
      }
    },
    "save-audiobooks-user": {
      "name": "Save Audiobooks for Current User\n",
      "schema": {
        "type": "object"
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
          "method": "PUT",
          "path": "/me/audiobooks"
        }
      }
    },
    "remove-episodes-user": {
      "name": "Remove User's Saved Episodes\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "ids": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/me/episodes",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "save-episodes-user": {
      "name": "Save Episodes for Current User\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "ids": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "ids": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": [
              "uris"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/me/episodes",
          "query": {
            "ids": {
              "$resolve": "args.ids"
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
    "unfollow-artists-users": {
      "name": "Unfollow Artists or Users\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "type": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "ids": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "ids": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/me/following",
          "query": {
            "type": {
              "$resolve": "args.type"
            },
            "ids": {
              "$resolve": "args.ids"
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
    "follow-artists-users": {
      "name": "Follow Artists or Users\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "type": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "ids": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "ids": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": [
              "ids"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/me/following",
          "query": {
            "type": {
              "$resolve": "args.type"
            },
            "ids": {
              "$resolve": "args.ids"
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
    "transfer-a-users-playback": {
      "name": "Transfer Playback\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "device_ids": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "play": {
                "type": "boolean"
              }
            },
            "required": [
              "device_ids"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/me/player",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "skip-users-playback-to-next-track": {
      "name": "Skip To Next\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "device_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/me/player/next",
          "query": {
            "device_id": {
              "$resolve": "args.device_id"
            }
          }
        }
      }
    },
    "pause-a-users-playback": {
      "name": "Pause Playback\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "device_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/me/player/pause",
          "query": {
            "device_id": {
              "$resolve": "args.device_id"
            }
          }
        }
      }
    },
    "start-a-users-playback": {
      "name": "Start/Resume Playback\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "device_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "context_uri": {
                "type": "string"
              },
              "offset": {
                "type": "object",
                "properties": {}
              },
              "position_ms": {
                "type": "number"
              },
              "uris": {
                "type": "array",
                "items": {
                  "type": "string"
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
          "path": "/me/player/play",
          "query": {
            "device_id": {
              "$resolve": "args.device_id"
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
    "skip-users-playback-to-previous-track": {
      "name": "Skip To Previous\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "device_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/me/player/previous",
          "query": {
            "device_id": {
              "$resolve": "args.device_id"
            }
          }
        }
      }
    },
    "add-to-queue": {
      "name": "Add Item to Playback Queue\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "uri": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "device_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/me/player/queue",
          "query": {
            "uri": {
              "$resolve": "args.uri"
            },
            "device_id": {
              "$resolve": "args.device_id"
            }
          }
        }
      }
    },
    "set-repeat-mode-on-users-playback": {
      "name": "Set Repeat Mode\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "state": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "device_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/me/player/repeat",
          "query": {
            "state": {
              "$resolve": "args.state"
            },
            "device_id": {
              "$resolve": "args.device_id"
            }
          }
        }
      }
    },
    "seek-to-position-in-currently-playing-track": {
      "name": "Seek To Position\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "position_ms": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "device_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/me/player/seek",
          "query": {
            "position_ms": {
              "$resolve": "args.position_ms"
            },
            "device_id": {
              "$resolve": "args.device_id"
            }
          }
        }
      }
    },
    "toggle-shuffle-for-users-playback": {
      "name": "Toggle Playback Shuffle\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "state": {
          "schema": {
            "type": "boolean"
          },
          "required": true
        },
        "device_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/me/player/shuffle",
          "query": {
            "state": {
              "$resolve": "args.state"
            },
            "device_id": {
              "$resolve": "args.device_id"
            }
          }
        }
      }
    },
    "set-volume-for-users-playback": {
      "name": "Set Playback Volume\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "volume_percent": {
          "schema": {
            "type": "number"
          },
          "required": true
        },
        "device_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/me/player/volume",
          "query": {
            "volume_percent": {
              "$resolve": "args.volume_percent"
            },
            "device_id": {
              "$resolve": "args.device_id"
            }
          }
        }
      }
    },
    "remove-shows-user": {
      "name": "Remove User's Saved Shows\n",
      "schema": {
        "type": "object"
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
          "method": "DELETE",
          "path": "/me/shows"
        }
      }
    },
    "save-shows-user": {
      "name": "Save Shows for Current User\n",
      "schema": {
        "type": "object"
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
          "method": "PUT",
          "path": "/me/shows"
        }
      }
    },
    "remove-tracks-user": {
      "name": "Remove User's Saved Tracks\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "ids": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/me/tracks",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "save-tracks-user": {
      "name": "Save Tracks for Current User\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "ids": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": [
              "uris"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/me/tracks",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "change-playlist-details": {
      "name": "Change Playlist Details\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "collaborative": {
                "type": "boolean"
              },
              "description": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "public": {
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
          "path": "/playlists/{playlist_id}",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "unfollow-playlist": {
      "name": "Unfollow Playlist\n",
      "schema": {
        "type": "object"
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
          "method": "DELETE",
          "path": "/playlists/{playlist_id}/followers"
        }
      }
    },
    "follow-playlist": {
      "name": "Follow Playlist\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "public": {
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
          "path": "/playlists/{playlist_id}/followers",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "upload-custom-playlist-cover": {
      "name": "Add Custom Playlist Cover Image\n",
      "schema": {
        "type": "object"
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
          "method": "PUT",
          "path": "/playlists/{playlist_id}/images"
        }
      }
    },
    "remove-tracks-playlist": {
      "name": "Remove Playlist Items\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "snapshot_id": {
                "type": "string"
              },
              "tracks": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "uri": {
                      "type": "string"
                    }
                  }
                }
              }
            },
            "required": [
              "tracks"
            ]
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/playlists/{playlist_id}/tracks",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "add-tracks-to-playlist": {
      "name": "Add Items to Playlist\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "position": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "uris": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "position": {
                "type": "number"
              },
              "uris": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/playlists/{playlist_id}/tracks",
          "query": {
            "position": {
              "$resolve": "args.position"
            },
            "uris": {
              "$resolve": "args.uris"
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
    "reorder-or-replace-playlists-tracks": {
      "name": "Update Playlist Items\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "uris": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "insert_before": {
                "type": "number"
              },
              "range_length": {
                "type": "number"
              },
              "range_start": {
                "type": "number"
              },
              "snapshot_id": {
                "type": "string"
              },
              "uris": {
                "type": "array",
                "items": {
                  "type": "string"
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
          "path": "/playlists/{playlist_id}/tracks",
          "query": {
            "uris": {
              "$resolve": "args.uris"
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
    "create-playlist": {
      "name": "Create Playlist\n",
      "schema": {
        "type": "object"
      },
      "args": {
        "undefined": {
          "schema": {
            "type": "object"
          },
          "required": false
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "collaborative": {
                "type": "boolean"
              },
              "description": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "public": {
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
          "path": "/users/{user_id}/playlists",
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
