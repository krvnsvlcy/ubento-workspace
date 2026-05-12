import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "figma",
  "type": "http",
  "connection": {
    "provider": "figma",
    "baseUrl": "https://api.figma.com"
  },
  "schemas": {
    "IsLayerTrait": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "visible": {
          "type": "boolean"
        },
        "locked": {
          "type": "boolean"
        },
        "isFixed": {
          "type": "boolean"
        },
        "scrollBehavior": {
          "type": "string"
        },
        "rotation": {
          "type": "number"
        },
        "componentPropertyReferences": {
          "type": "object",
          "properties": {}
        },
        "pluginData": {
          "type": "object",
          "properties": {}
        },
        "sharedPluginData": {
          "type": "object",
          "properties": {}
        },
        "boundVariables": {
          "type": "object",
          "properties": {
            "size": {
              "type": "object",
              "properties": {
                "x": {
                  "type": "ref",
                  "ref": "VariableAlias"
                },
                "y": {
                  "type": "ref",
                  "ref": "VariableAlias"
                }
              }
            },
            "individualStrokeWeights": {
              "type": "object",
              "properties": {
                "top": {
                  "type": "ref",
                  "ref": "VariableAlias"
                },
                "bottom": {
                  "type": "ref",
                  "ref": "VariableAlias"
                },
                "left": {
                  "type": "ref",
                  "ref": "VariableAlias"
                },
                "right": {
                  "type": "ref",
                  "ref": "VariableAlias"
                }
              }
            },
            "characters": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "itemSpacing": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "paddingLeft": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "paddingRight": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "paddingTop": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "paddingBottom": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "visible": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "topLeftRadius": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "topRightRadius": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "bottomLeftRadius": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "bottomRightRadius": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "minWidth": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "maxWidth": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "minHeight": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "maxHeight": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "counterAxisSpacing": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "opacity": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "fontFamily": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "VariableAlias"
              }
            },
            "fontSize": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "VariableAlias"
              }
            },
            "fontStyle": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "VariableAlias"
              }
            },
            "fontWeight": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "VariableAlias"
              }
            },
            "letterSpacing": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "VariableAlias"
              }
            },
            "lineHeight": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "VariableAlias"
              }
            },
            "paragraphSpacing": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "VariableAlias"
              }
            },
            "paragraphIndent": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "VariableAlias"
              }
            },
            "fills": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "VariableAlias"
              }
            },
            "strokes": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "VariableAlias"
              }
            },
            "componentProperties": {
              "type": "object",
              "properties": {}
            },
            "textRangeFills": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "VariableAlias"
              }
            },
            "effects": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "VariableAlias"
              }
            },
            "layoutGrids": {
              "type": "array",
              "items": {
                "type": "ref",
                "ref": "VariableAlias"
              }
            },
            "rectangleCornerRadii": {
              "type": "object",
              "properties": {
                "RECTANGLE_TOP_LEFT_CORNER_RADIUS": {
                  "type": "ref",
                  "ref": "VariableAlias"
                },
                "RECTANGLE_TOP_RIGHT_CORNER_RADIUS": {
                  "type": "ref",
                  "ref": "VariableAlias"
                },
                "RECTANGLE_BOTTOM_LEFT_CORNER_RADIUS": {
                  "type": "ref",
                  "ref": "VariableAlias"
                },
                "RECTANGLE_BOTTOM_RIGHT_CORNER_RADIUS": {
                  "type": "ref",
                  "ref": "VariableAlias"
                }
              }
            }
          }
        },
        "explicitVariableModes": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "id",
        "name",
        "type",
        "scrollBehavior"
      ]
    },
    "HasChildrenTrait": {
      "type": "object",
      "properties": {
        "children": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SubcanvasNode"
          }
        }
      },
      "required": [
        "children"
      ]
    },
    "HasLayoutTrait": {
      "type": "object",
      "properties": {
        "absoluteBoundingBox": {
          "type": "ref",
          "ref": "Rectangle"
        },
        "absoluteRenderBounds": {
          "type": "ref",
          "ref": "Rectangle"
        },
        "preserveRatio": {
          "type": "boolean"
        },
        "constraints": {
          "type": "ref",
          "ref": "LayoutConstraint"
        },
        "relativeTransform": {
          "type": "ref",
          "ref": "Transform"
        },
        "size": {
          "type": "ref",
          "ref": "Vector"
        },
        "layoutAlign": {
          "type": "string"
        },
        "layoutGrow": {
          "type": "number"
        },
        "layoutPositioning": {
          "type": "string"
        },
        "minWidth": {
          "type": "number"
        },
        "maxWidth": {
          "type": "number"
        },
        "minHeight": {
          "type": "number"
        },
        "maxHeight": {
          "type": "number"
        },
        "layoutSizingHorizontal": {
          "type": "string"
        },
        "layoutSizingVertical": {
          "type": "string"
        },
        "gridRowCount": {
          "type": "number"
        },
        "gridColumnCount": {
          "type": "number"
        },
        "gridRowGap": {
          "type": "number"
        },
        "gridColumnGap": {
          "type": "number"
        },
        "gridColumnsSizing": {
          "type": "string"
        },
        "gridRowsSizing": {
          "type": "string"
        },
        "gridChildHorizontalAlign": {
          "type": "string"
        },
        "gridChildVerticalAlign": {
          "type": "string"
        },
        "gridRowSpan": {
          "type": "number"
        },
        "gridColumnSpan": {
          "type": "number"
        },
        "gridRowAnchorIndex": {
          "type": "number"
        },
        "gridColumnAnchorIndex": {
          "type": "number"
        }
      },
      "required": [
        "absoluteBoundingBox",
        "absoluteRenderBounds"
      ]
    },
    "HasFramePropertiesTrait": {
      "type": "object",
      "properties": {
        "clipsContent": {
          "type": "boolean"
        },
        "background": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Paint"
          }
        },
        "backgroundColor": {
          "type": "ref",
          "ref": "RGBA"
        },
        "layoutGrids": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "LayoutGrid"
          }
        },
        "overflowDirection": {
          "type": "string"
        },
        "layoutMode": {
          "type": "string"
        },
        "primaryAxisSizingMode": {
          "type": "string"
        },
        "counterAxisSizingMode": {
          "type": "string"
        },
        "primaryAxisAlignItems": {
          "type": "string"
        },
        "counterAxisAlignItems": {
          "type": "string"
        },
        "paddingLeft": {
          "type": "number"
        },
        "paddingRight": {
          "type": "number"
        },
        "paddingTop": {
          "type": "number"
        },
        "paddingBottom": {
          "type": "number"
        },
        "itemSpacing": {
          "type": "number"
        },
        "itemReverseZIndex": {
          "type": "boolean"
        },
        "strokesIncludedInLayout": {
          "type": "boolean"
        },
        "layoutWrap": {
          "type": "string"
        },
        "counterAxisSpacing": {
          "type": "number"
        },
        "counterAxisAlignContent": {
          "type": "string"
        }
      },
      "required": [
        "clipsContent"
      ]
    },
    "HasBlendModeAndOpacityTrait": {
      "type": "object",
      "properties": {
        "blendMode": {
          "type": "ref",
          "ref": "BlendMode"
        },
        "opacity": {
          "type": "number"
        }
      },
      "required": [
        "blendMode"
      ]
    },
    "HasExportSettingsTrait": {
      "type": "object",
      "properties": {
        "exportSettings": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ExportSetting"
          }
        }
      }
    },
    "HasGeometryTrait": {
      "type": "ref",
      "ref": "MinimalFillsTrait"
    },
    "MinimalFillsTrait": {
      "type": "object",
      "properties": {
        "fills": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Paint"
          }
        },
        "styles": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "fills"
      ]
    },
    "MinimalStrokesTrait": {
      "type": "object",
      "properties": {
        "strokes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Paint"
          }
        },
        "strokeWeight": {
          "type": "number"
        },
        "strokeAlign": {
          "type": "string"
        },
        "strokeJoin": {
          "type": "string"
        },
        "strokeDashes": {
          "type": "array",
          "items": {
            "type": "number"
          }
        }
      }
    },
    "IndividualStrokesTrait": {
      "type": "object",
      "properties": {
        "individualStrokeWeights": {
          "type": "ref",
          "ref": "StrokeWeights"
        }
      }
    },
    "VariableWidthStrokesTrait": {
      "type": "object",
      "properties": {}
    },
    "ComplexStrokesTrait": {
      "type": "object",
      "properties": {}
    },
    "CornerTrait": {
      "type": "object",
      "properties": {
        "cornerRadius": {
          "type": "number"
        },
        "cornerSmoothing": {
          "type": "number"
        },
        "rectangleCornerRadii": {
          "type": "array",
          "items": {
            "type": "number"
          }
        }
      }
    },
    "HasEffectsTrait": {
      "type": "object",
      "properties": {
        "effects": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Effect"
          }
        }
      },
      "required": [
        "effects"
      ]
    },
    "HasMaskTrait": {
      "type": "object",
      "properties": {
        "isMask": {
          "type": "boolean"
        },
        "maskType": {
          "type": "string"
        },
        "isMaskOutline": {
          "type": "boolean"
        }
      }
    },
    "ComponentPropertiesTrait": {
      "type": "object",
      "properties": {
        "componentPropertyDefinitions": {
          "type": "object",
          "properties": {}
        }
      }
    },
    "TypePropertiesTrait": {
      "type": "object",
      "properties": {
        "characters": {
          "type": "string"
        },
        "style": {
          "type": "ref",
          "ref": "TypeStyle"
        },
        "characterStyleOverrides": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "layoutVersion": {
          "type": "number"
        },
        "styleOverrideTable": {
          "type": "object",
          "properties": {}
        },
        "lineTypes": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "lineIndentations": {
          "type": "array",
          "items": {
            "type": "number"
          }
        }
      },
      "required": [
        "characters",
        "style",
        "characterStyleOverrides",
        "styleOverrideTable",
        "lineTypes",
        "lineIndentations"
      ]
    },
    "TextPathPropertiesTrait": {
      "type": "object",
      "properties": {
        "characters": {
          "type": "string"
        },
        "style": {
          "type": "ref",
          "ref": "TextPathTypeStyle"
        },
        "characterStyleOverrides": {
          "type": "array",
          "items": {
            "type": "number"
          }
        },
        "layoutVersion": {
          "type": "number"
        },
        "styleOverrideTable": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "characters",
        "style",
        "characterStyleOverrides",
        "styleOverrideTable",
        "textPathStartData"
      ]
    },
    "HasTextSublayerTrait": {
      "type": "object",
      "properties": {
        "characters": {
          "type": "string"
        }
      },
      "required": [
        "characters"
      ]
    },
    "TransitionSourceTrait": {
      "type": "object",
      "properties": {
        "transitionNodeID": {
          "type": "string"
        },
        "transitionDuration": {
          "type": "number"
        },
        "transitionEasing": {
          "type": "ref",
          "ref": "EasingType"
        },
        "interactions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Interaction"
          }
        }
      }
    },
    "DevStatusTrait": {
      "type": "object",
      "properties": {
        "devStatus": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string"
            },
            "description": {
              "type": "string"
            }
          },
          "required": [
            "type"
          ]
        }
      }
    },
    "AnnotationsTrait": {
      "type": "object",
      "properties": {}
    },
    "TransformModifiersTrait": {
      "type": "object",
      "properties": {}
    },
    "FrameTraits": {
      "type": "ref",
      "ref": "IsLayerTrait"
    },
    "DefaultShapeTraits": {
      "type": "ref",
      "ref": "IsLayerTrait"
    },
    "CornerRadiusShapeTraits": {
      "type": "ref",
      "ref": "DefaultShapeTraits"
    },
    "RectangularShapeTraits": {
      "type": "ref",
      "ref": "DefaultShapeTraits"
    },
    "Node": {
      "type": "ref",
      "ref": "BooleanOperationNode"
    },
    "DocumentNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "children": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "CanvasNode"
          }
        }
      },
      "required": [
        "type",
        "children"
      ]
    },
    "CanvasNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "children": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "SubcanvasNode"
          }
        },
        "backgroundColor": {
          "type": "ref",
          "ref": "RGBA"
        },
        "prototypeStartNodeID": {
          "type": "object"
        },
        "flowStartingPoints": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "FlowStartingPoint"
          }
        },
        "prototypeDevice": {
          "type": "ref",
          "ref": "PrototypeDevice"
        },
        "prototypeBackgrounds": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "RGBA"
          }
        },
        "measurements": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Measurement"
          }
        }
      },
      "required": [
        "type",
        "children",
        "backgroundColor",
        "flowStartingPoints",
        "prototypeDevice",
        "prototypeStartNodeID"
      ]
    },
    "SubcanvasNode": {
      "type": "ref",
      "ref": "BooleanOperationNode"
    },
    "BooleanOperationNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "booleanOperation": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "booleanOperation"
      ]
    },
    "SectionNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "sectionContentsHidden": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "sectionContentsHidden"
      ]
    },
    "FrameNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "GroupNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "ComponentNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "ComponentSetNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "VectorNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "StarNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "LineNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "EllipseNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "arcData": {
          "type": "ref",
          "ref": "ArcData"
        }
      },
      "required": [
        "type",
        "arcData"
      ]
    },
    "RegularPolygonNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "RectangleNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "TextNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "TextPathNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "TableNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "TableCellNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "TransformGroupNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "SliceNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "InstanceNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "componentId": {
          "type": "string"
        },
        "isExposedInstance": {
          "type": "boolean"
        },
        "exposedInstances": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "componentProperties": {
          "type": "object",
          "properties": {}
        },
        "overrides": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Overrides"
          }
        }
      },
      "required": [
        "type",
        "componentId",
        "overrides"
      ]
    },
    "EmbedNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "LinkUnfurlNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "StickyNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "authorVisible": {
          "type": "boolean"
        }
      },
      "required": [
        "type"
      ]
    },
    "ShapeWithTextNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "shapeType": {
          "type": "ref",
          "ref": "ShapeType"
        }
      },
      "required": [
        "type",
        "shapeType"
      ]
    },
    "ConnectorNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "connectorStart": {
          "type": "ref",
          "ref": "ConnectorEndpoint"
        },
        "connectorEnd": {
          "type": "ref",
          "ref": "ConnectorEndpoint"
        },
        "connectorStartStrokeCap": {
          "type": "string"
        },
        "connectorEndStrokeCap": {
          "type": "string"
        },
        "connectorLineType": {
          "type": "ref",
          "ref": "ConnectorLineType"
        },
        "textBackground": {
          "type": "ref",
          "ref": "ConnectorTextBackground"
        }
      },
      "required": [
        "type",
        "connectorStart",
        "connectorEnd",
        "connectorStartStrokeCap",
        "connectorEndStrokeCap",
        "connectorLineType"
      ]
    },
    "WashiTapeNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "WidgetNode": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "RGB": {
      "type": "object",
      "properties": {
        "r": {
          "type": "number"
        },
        "g": {
          "type": "number"
        },
        "b": {
          "type": "number"
        }
      },
      "required": [
        "r",
        "g",
        "b"
      ]
    },
    "RGBA": {
      "type": "object",
      "properties": {
        "r": {
          "type": "number"
        },
        "g": {
          "type": "number"
        },
        "b": {
          "type": "number"
        },
        "a": {
          "type": "number"
        }
      },
      "required": [
        "r",
        "g",
        "b",
        "a"
      ]
    },
    "FlowStartingPoint": {
      "type": "object",
      "properties": {
        "nodeId": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "nodeId",
        "name"
      ]
    },
    "Size": {
      "type": "object",
      "properties": {
        "width": {
          "type": "number"
        },
        "height": {
          "type": "number"
        }
      },
      "required": [
        "width",
        "height"
      ]
    },
    "PrototypeDevice": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "size": {
          "type": "ref",
          "ref": "Size"
        },
        "presetIdentifier": {
          "type": "string"
        },
        "rotation": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "rotation"
      ]
    },
    "Constraint": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "value": {
          "type": "number"
        }
      },
      "required": [
        "type",
        "value"
      ]
    },
    "ExportSetting": {
      "type": "object",
      "properties": {
        "suffix": {
          "type": "string"
        },
        "format": {
          "type": "string"
        },
        "constraint": {
          "type": "ref",
          "ref": "Constraint"
        }
      },
      "required": [
        "suffix",
        "format",
        "constraint"
      ]
    },
    "BlendMode": {
      "type": "string"
    },
    "Vector": {
      "type": "object",
      "properties": {
        "x": {
          "type": "number"
        },
        "y": {
          "type": "number"
        }
      },
      "required": [
        "x",
        "y"
      ]
    },
    "ColorStop": {
      "type": "object",
      "properties": {
        "position": {
          "type": "number"
        },
        "color": {
          "type": "ref",
          "ref": "RGBA"
        },
        "boundVariables": {
          "type": "object",
          "properties": {
            "color": {
              "type": "ref",
              "ref": "VariableAlias"
            }
          }
        }
      },
      "required": [
        "position",
        "color"
      ]
    },
    "Transform": {
      "type": "array",
      "items": {
        "type": "array",
        "items": {
          "type": "number"
        }
      }
    },
    "ImageFilters": {
      "type": "object",
      "properties": {
        "exposure": {
          "type": "number"
        },
        "contrast": {
          "type": "number"
        },
        "saturation": {
          "type": "number"
        },
        "temperature": {
          "type": "number"
        },
        "tint": {
          "type": "number"
        },
        "highlights": {
          "type": "number"
        },
        "shadows": {
          "type": "number"
        }
      }
    },
    "BasePaint": {
      "type": "object",
      "properties": {
        "visible": {
          "type": "boolean"
        },
        "opacity": {
          "type": "number"
        },
        "blendMode": {
          "type": "ref",
          "ref": "BlendMode"
        }
      },
      "required": [
        "blendMode"
      ]
    },
    "SolidPaint": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "color": {
          "type": "ref",
          "ref": "RGBA"
        },
        "boundVariables": {
          "type": "object",
          "properties": {
            "color": {
              "type": "ref",
              "ref": "VariableAlias"
            }
          }
        }
      },
      "required": [
        "type",
        "color"
      ]
    },
    "GradientPaint": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "gradientHandlePositions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Vector"
          }
        },
        "gradientStops": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ColorStop"
          }
        }
      },
      "required": [
        "type",
        "gradientHandlePositions",
        "gradientStops"
      ]
    },
    "ImagePaint": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "scaleMode": {
          "type": "string"
        },
        "imageRef": {
          "type": "string"
        },
        "imageTransform": {
          "type": "ref",
          "ref": "Transform"
        },
        "scalingFactor": {
          "type": "number"
        },
        "filters": {
          "type": "ref",
          "ref": "ImageFilters"
        },
        "rotation": {
          "type": "number"
        },
        "gifRef": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "scaleMode",
        "imageRef"
      ]
    },
    "PatternPaint": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "sourceNodeId": {
          "type": "string"
        },
        "tileType": {
          "type": "string"
        },
        "scalingFactor": {
          "type": "number"
        },
        "spacing": {
          "type": "ref",
          "ref": "Vector"
        },
        "horizontalAlignment": {
          "type": "string"
        },
        "verticalAlignment": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "sourceNodeId",
        "tileType",
        "scalingFactor",
        "spacing",
        "horizontalAlignment",
        "verticalAlignment"
      ]
    },
    "Paint": {
      "type": "ref",
      "ref": "SolidPaint"
    },
    "LayoutConstraint": {
      "type": "object",
      "properties": {
        "vertical": {
          "type": "string"
        },
        "horizontal": {
          "type": "string"
        }
      },
      "required": [
        "vertical",
        "horizontal"
      ]
    },
    "Rectangle": {
      "type": "object",
      "properties": {
        "x": {
          "type": "number"
        },
        "y": {
          "type": "number"
        },
        "width": {
          "type": "number"
        },
        "height": {
          "type": "number"
        }
      },
      "required": [
        "x",
        "y",
        "width",
        "height"
      ]
    },
    "LayoutGrid": {
      "type": "object",
      "properties": {
        "pattern": {
          "type": "string"
        },
        "sectionSize": {
          "type": "number"
        },
        "visible": {
          "type": "boolean"
        },
        "color": {
          "type": "ref",
          "ref": "RGBA"
        },
        "alignment": {
          "type": "string"
        },
        "gutterSize": {
          "type": "number"
        },
        "offset": {
          "type": "number"
        },
        "count": {
          "type": "number"
        },
        "boundVariables": {
          "type": "object",
          "properties": {
            "gutterSize": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "numSections": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "sectionSize": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "offset": {
              "type": "ref",
              "ref": "VariableAlias"
            }
          }
        }
      },
      "required": [
        "pattern",
        "sectionSize",
        "visible",
        "color",
        "alignment",
        "gutterSize",
        "offset",
        "count"
      ]
    },
    "BaseShadowEffect": {
      "type": "object",
      "properties": {
        "color": {
          "type": "ref",
          "ref": "RGBA"
        },
        "blendMode": {
          "type": "ref",
          "ref": "BlendMode"
        },
        "offset": {
          "type": "ref",
          "ref": "Vector"
        },
        "radius": {
          "type": "number"
        },
        "spread": {
          "type": "number"
        },
        "visible": {
          "type": "boolean"
        },
        "boundVariables": {
          "type": "object",
          "properties": {
            "radius": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "spread": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "color": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "offsetX": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "offsetY": {
              "type": "ref",
              "ref": "VariableAlias"
            }
          }
        }
      },
      "required": [
        "color",
        "blendMode",
        "offset",
        "radius",
        "visible"
      ]
    },
    "DropShadowEffect": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "showShadowBehindNode": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "showShadowBehindNode"
      ]
    },
    "InnerShadowEffect": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      }
    },
    "BlurEffect": {
      "type": "ref",
      "ref": "NormalBlurEffect"
    },
    "BaseBlurEffect": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "visible": {
          "type": "boolean"
        },
        "radius": {
          "type": "number"
        },
        "boundVariables": {
          "type": "object",
          "properties": {
            "radius": {
              "type": "ref",
              "ref": "VariableAlias"
            }
          }
        }
      },
      "required": [
        "type",
        "visible",
        "radius"
      ]
    },
    "NormalBlurEffect": {
      "type": "object",
      "properties": {
        "blurType": {
          "type": "string"
        }
      }
    },
    "ProgressiveBlurEffect": {
      "type": "object",
      "properties": {
        "blurType": {
          "type": "string"
        },
        "startRadius": {
          "type": "number"
        },
        "startOffset": {
          "type": "ref",
          "ref": "Vector"
        },
        "endOffset": {
          "type": "ref",
          "ref": "Vector"
        }
      },
      "required": [
        "blurType",
        "startRadius",
        "startOffset",
        "endOffset"
      ]
    },
    "TextureEffect": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "visible": {
          "type": "boolean"
        },
        "noiseSize": {
          "type": "number"
        },
        "radius": {
          "type": "number"
        },
        "clipToShape": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "visible",
        "noiseSize",
        "radius",
        "clipToShape"
      ]
    },
    "MonotoneNoiseEffect": {
      "type": "object",
      "properties": {
        "noiseType": {
          "type": "string"
        }
      },
      "required": [
        "noiseType"
      ]
    },
    "MultitoneNoiseEffect": {
      "type": "object",
      "properties": {
        "noiseType": {
          "type": "string"
        },
        "opacity": {
          "type": "number"
        }
      },
      "required": [
        "noiseType",
        "opacity"
      ]
    },
    "DuotoneNoiseEffect": {
      "type": "object",
      "properties": {
        "noiseType": {
          "type": "string"
        },
        "secondaryColor": {
          "type": "ref",
          "ref": "RGBA"
        }
      },
      "required": [
        "noiseType",
        "secondaryColor"
      ]
    },
    "BaseNoiseEffect": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "color": {
          "type": "ref",
          "ref": "RGBA"
        },
        "visible": {
          "type": "boolean"
        },
        "blendMode": {
          "type": "ref",
          "ref": "BlendMode"
        },
        "noiseSize": {
          "type": "number"
        },
        "density": {
          "type": "number"
        }
      },
      "required": [
        "type",
        "color",
        "visible",
        "noiseSize",
        "density",
        "blendMode"
      ]
    },
    "NoiseEffect": {
      "type": "ref",
      "ref": "MonotoneNoiseEffect"
    },
    "Effect": {
      "type": "ref",
      "ref": "DropShadowEffect"
    },
    "Style": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "remote": {
          "type": "boolean"
        },
        "styleType": {
          "type": "ref",
          "ref": "StyleType"
        }
      },
      "required": [
        "key",
        "name",
        "description",
        "remote",
        "styleType"
      ]
    },
    "EasingType": {
      "type": "string"
    },
    "StrokeWeights": {
      "type": "object",
      "properties": {
        "top": {
          "type": "number"
        },
        "right": {
          "type": "number"
        },
        "bottom": {
          "type": "number"
        },
        "left": {
          "type": "number"
        }
      },
      "required": [
        "top",
        "right",
        "bottom",
        "left"
      ]
    },
    "PaintOverride": {
      "type": "object",
      "properties": {
        "fills": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Paint"
          }
        },
        "inheritFillStyleId": {
          "type": "string"
        }
      }
    },
    "Path": {
      "type": "object",
      "properties": {
        "path": {
          "type": "string"
        },
        "windingRule": {
          "type": "string"
        },
        "overrideID": {
          "type": "number"
        }
      },
      "required": [
        "path",
        "windingRule"
      ]
    },
    "ArcData": {
      "type": "object",
      "properties": {
        "startingAngle": {
          "type": "number"
        },
        "endingAngle": {
          "type": "number"
        },
        "innerRadius": {
          "type": "number"
        }
      },
      "required": [
        "startingAngle",
        "endingAngle",
        "innerRadius"
      ]
    },
    "Hyperlink": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "url": {
          "type": "string"
        },
        "nodeID": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "BaseTypeStyle": {
      "type": "object",
      "properties": {
        "fontFamily": {
          "type": "string"
        },
        "fontPostScriptName": {
          "type": "object"
        },
        "fontStyle": {
          "type": "string"
        },
        "italic": {
          "type": "boolean"
        },
        "fontWeight": {
          "type": "number"
        },
        "fontSize": {
          "type": "number"
        },
        "textCase": {
          "type": "string"
        },
        "textAlignHorizontal": {
          "type": "string"
        },
        "textAlignVertical": {
          "type": "string"
        },
        "letterSpacing": {
          "type": "number"
        },
        "fills": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Paint"
          }
        },
        "hyperlink": {
          "type": "ref",
          "ref": "Hyperlink"
        },
        "opentypeFlags": {
          "type": "object",
          "properties": {}
        },
        "semanticWeight": {
          "type": "string"
        },
        "semanticItalic": {
          "type": "string"
        }
      }
    },
    "TypeStyle": {
      "type": "object",
      "properties": {
        "paragraphSpacing": {
          "type": "number"
        },
        "paragraphIndent": {
          "type": "number"
        },
        "listSpacing": {
          "type": "number"
        },
        "textDecoration": {
          "type": "string"
        },
        "textAutoResize": {
          "type": "string"
        },
        "textTruncation": {
          "type": "string"
        },
        "maxLines": {
          "type": "number"
        },
        "lineHeightPx": {
          "type": "number"
        },
        "lineHeightPercent": {
          "type": "number"
        },
        "lineHeightPercentFontSize": {
          "type": "number"
        },
        "lineHeightUnit": {
          "type": "string"
        },
        "isOverrideOverTextStyle": {
          "type": "boolean"
        },
        "boundVariables": {
          "type": "object",
          "properties": {
            "fontFamily": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "fontSize": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "fontStyle": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "fontWeight": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "letterSpacing": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "lineHeight": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "paragraphSpacing": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "paragraphIndent": {
              "type": "ref",
              "ref": "VariableAlias"
            }
          }
        }
      }
    },
    "TextPathTypeStyle": {
      "type": "object",
      "properties": {
        "isOverrideOverTextStyle": {
          "type": "boolean"
        },
        "boundVariables": {
          "type": "object",
          "properties": {
            "fontFamily": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "fontSize": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "fontStyle": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "fontWeight": {
              "type": "ref",
              "ref": "VariableAlias"
            },
            "letterSpacing": {
              "type": "ref",
              "ref": "VariableAlias"
            }
          }
        }
      }
    },
    "ComponentPropertyType": {
      "type": "string"
    },
    "InstanceSwapPreferredValue": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "key": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "key"
      ]
    },
    "ComponentPropertyDefinition": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ComponentPropertyType"
        },
        "defaultValue": {
          "type": "boolean"
        },
        "variantOptions": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "preferredValues": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "InstanceSwapPreferredValue"
          }
        }
      },
      "required": [
        "type",
        "defaultValue"
      ]
    },
    "ComponentProperty": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "ComponentPropertyType"
        },
        "value": {
          "type": "boolean"
        },
        "preferredValues": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "InstanceSwapPreferredValue"
          }
        },
        "boundVariables": {
          "type": "object",
          "properties": {
            "value": {
              "type": "ref",
              "ref": "VariableAlias"
            }
          }
        }
      },
      "required": [
        "type",
        "value"
      ]
    },
    "Overrides": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "overriddenFields": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "id",
        "overriddenFields"
      ]
    },
    "ShapeType": {
      "type": "string"
    },
    "ConnectorEndpoint": {
      "type": "object",
      "properties": {
        "endpointNodeId": {
          "type": "string"
        },
        "position": {
          "type": "ref",
          "ref": "Vector"
        }
      }
    },
    "ConnectorLineType": {
      "type": "string"
    },
    "ConnectorTextBackground": {
      "type": "ref",
      "ref": "CornerTrait"
    },
    "Component": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "componentSetId": {
          "type": "string"
        },
        "documentationLinks": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DocumentationLink"
          }
        },
        "remote": {
          "type": "boolean"
        }
      },
      "required": [
        "key",
        "name",
        "description",
        "documentationLinks",
        "remote"
      ]
    },
    "ComponentSet": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "documentationLinks": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "DocumentationLink"
          }
        },
        "remote": {
          "type": "boolean"
        }
      },
      "required": [
        "key",
        "name",
        "description"
      ]
    },
    "DocumentationLink": {
      "type": "object",
      "properties": {
        "uri": {
          "type": "string"
        }
      },
      "required": [
        "uri"
      ]
    },
    "VariableAlias": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "id"
      ]
    },
    "Interaction": {
      "type": "object",
      "properties": {
        "trigger": {
          "type": "ref",
          "ref": "Trigger"
        },
        "actions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Action"
          }
        }
      },
      "required": [
        "trigger"
      ]
    },
    "Trigger": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "AfterTimeoutTrigger": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "timeout": {
          "type": "number"
        }
      },
      "required": [
        "type",
        "timeout"
      ]
    },
    "OnKeyDownTrigger": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "device": {
          "type": "string"
        },
        "keyCodes": {
          "type": "array",
          "items": {
            "type": "number"
          }
        }
      },
      "required": [
        "type",
        "device",
        "keyCodes"
      ]
    },
    "OnMediaHitTrigger": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "mediaHitTime": {
          "type": "number"
        }
      },
      "required": [
        "type",
        "mediaHitTime"
      ]
    },
    "Action": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ]
    },
    "OpenURLAction": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "url"
      ]
    },
    "UpdateMediaRuntimeAction": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "destinationId": {
          "type": "object"
        },
        "mediaAction": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "destinationId",
        "mediaAction"
      ]
    },
    "NodeAction": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "destinationId": {
          "type": "object"
        },
        "navigation": {
          "type": "ref",
          "ref": "Navigation"
        },
        "transition": {
          "type": "ref",
          "ref": "Transition"
        },
        "preserveScrollPosition": {
          "type": "boolean"
        },
        "overlayRelativePosition": {
          "type": "ref",
          "ref": "Vector"
        },
        "resetVideoPosition": {
          "type": "boolean"
        },
        "resetScrollPosition": {
          "type": "boolean"
        },
        "resetInteractiveComponents": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "destinationId",
        "navigation",
        "transition"
      ]
    },
    "Navigation": {
      "type": "string"
    },
    "Transition": {
      "type": "ref",
      "ref": "SimpleTransition"
    },
    "SimpleTransition": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "duration": {
          "type": "number"
        },
        "easing": {
          "type": "ref",
          "ref": "Easing"
        }
      },
      "required": [
        "type",
        "duration",
        "easing"
      ]
    },
    "DirectionalTransition": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "direction": {
          "type": "string"
        },
        "duration": {
          "type": "number"
        },
        "easing": {
          "type": "ref",
          "ref": "Easing"
        },
        "matchLayers": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "direction",
        "duration",
        "easing"
      ]
    },
    "Easing": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "EasingType"
        },
        "easingFunctionCubicBezier": {
          "type": "object",
          "properties": {
            "x1": {
              "type": "number"
            },
            "y1": {
              "type": "number"
            },
            "x2": {
              "type": "number"
            },
            "y2": {
              "type": "number"
            }
          },
          "required": [
            "x1",
            "y1",
            "x2",
            "y2"
          ]
        },
        "easingFunctionSpring": {
          "type": "object",
          "properties": {
            "mass": {
              "type": "number"
            },
            "stiffness": {
              "type": "number"
            },
            "damping": {
              "type": "number"
            }
          },
          "required": [
            "mass",
            "stiffness",
            "damping"
          ]
        }
      },
      "required": [
        "type"
      ]
    },
    "SetVariableAction": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "variableId": {
          "type": "object"
        },
        "variableValue": {
          "type": "ref",
          "ref": "VariableData"
        }
      },
      "required": [
        "type",
        "variableId"
      ]
    },
    "SetVariableModeAction": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "variableCollectionId": {
          "type": "object"
        },
        "variableModeId": {
          "type": "object"
        }
      },
      "required": [
        "type",
        "variableId",
        "variableMode"
      ]
    },
    "ConditionalAction": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "conditionalBlocks": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "ConditionalBlock"
          }
        }
      },
      "required": [
        "type",
        "conditionalBlocks"
      ]
    },
    "VariableData": {
      "type": "object",
      "properties": {
        "type": {
          "type": "ref",
          "ref": "VariableDataType"
        },
        "resolvedType": {
          "type": "ref",
          "ref": "VariableResolvedDataType"
        },
        "value": {
          "type": "boolean"
        }
      }
    },
    "VariableDataType": {
      "type": "string"
    },
    "VariableResolvedDataType": {
      "type": "string"
    },
    "Expression": {
      "type": "object",
      "properties": {
        "expressionFunction": {
          "type": "ref",
          "ref": "ExpressionFunction"
        },
        "expressionArguments": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "VariableData"
          }
        }
      },
      "required": [
        "expressionFunction",
        "expressionArguments"
      ]
    },
    "ExpressionFunction": {
      "type": "string"
    },
    "ConditionalBlock": {
      "type": "object",
      "properties": {
        "condition": {
          "type": "ref",
          "ref": "VariableData"
        },
        "actions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Action"
          }
        }
      },
      "required": [
        "actions"
      ]
    },
    "Measurement": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "start": {
          "type": "ref",
          "ref": "MeasurementStartEnd"
        },
        "end": {
          "type": "ref",
          "ref": "MeasurementStartEnd"
        },
        "offset": {
          "type": "ref",
          "ref": "MeasurementOffsetInner"
        },
        "freeText": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "start",
        "end",
        "offset"
      ]
    },
    "MeasurementStartEnd": {
      "type": "object",
      "properties": {
        "nodeId": {
          "type": "string"
        },
        "side": {
          "type": "string"
        }
      },
      "required": [
        "nodeId",
        "side"
      ]
    },
    "MeasurementOffsetInner": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "relative": {
          "type": "number"
        }
      },
      "required": [
        "type",
        "relative"
      ]
    },
    "MeasurementOffsetOuter": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "fixed": {
          "type": "number"
        }
      },
      "required": [
        "type",
        "fixed"
      ]
    },
    "FrameOffset": {
      "type": "object",
      "properties": {
        "node_id": {
          "type": "string"
        },
        "node_offset": {
          "type": "ref",
          "ref": "Vector"
        }
      },
      "required": [
        "node_id",
        "node_offset"
      ]
    },
    "Region": {
      "type": "object",
      "properties": {
        "x": {
          "type": "number"
        },
        "y": {
          "type": "number"
        },
        "region_height": {
          "type": "number"
        },
        "region_width": {
          "type": "number"
        },
        "comment_pin_corner": {
          "type": "string"
        }
      },
      "required": [
        "x",
        "y",
        "region_height",
        "region_width"
      ]
    },
    "FrameOffsetRegion": {
      "type": "object",
      "properties": {
        "node_id": {
          "type": "string"
        },
        "node_offset": {
          "type": "ref",
          "ref": "Vector"
        },
        "region_height": {
          "type": "number"
        },
        "region_width": {
          "type": "number"
        },
        "comment_pin_corner": {
          "type": "string"
        }
      },
      "required": [
        "node_id",
        "node_offset",
        "region_height",
        "region_width"
      ]
    },
    "Comment": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "client_meta": {
          "type": "ref",
          "ref": "Vector"
        },
        "file_key": {
          "type": "string"
        },
        "parent_id": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "User"
        },
        "created_at": {
          "type": "string"
        },
        "resolved_at": {
          "type": "object"
        },
        "message": {
          "type": "string"
        },
        "order_id": {
          "type": "object"
        },
        "reactions": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "Reaction"
          }
        }
      },
      "required": [
        "id",
        "client_meta",
        "file_key",
        "user",
        "created_at",
        "message",
        "reactions",
        "order_id"
      ]
    },
    "Reaction": {
      "type": "object",
      "properties": {
        "user": {
          "type": "ref",
          "ref": "User"
        },
        "emoji": {
          "type": "ref",
          "ref": "Emoji"
        },
        "created_at": {
          "type": "string"
        }
      },
      "required": [
        "user",
        "emoji",
        "created_at"
      ]
    },
    "Emoji": {
      "type": "string"
    },
    "User": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "handle": {
          "type": "string"
        },
        "img_url": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "handle",
        "img_url"
      ]
    },
    "FrameInfo": {
      "type": "object",
      "properties": {
        "nodeId": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "backgroundColor": {
          "type": "string"
        },
        "pageId": {
          "type": "string"
        },
        "pageName": {
          "type": "string"
        },
        "containingStateGroup": {
          "type": "object",
          "properties": {
            "nodeId": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        },
        "containingComponentSet": {
          "type": "object",
          "properties": {
            "nodeId": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        }
      },
      "required": [
        "pageId",
        "pageName"
      ]
    },
    "PublishedComponent": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "file_key": {
          "type": "string"
        },
        "node_id": {
          "type": "string"
        },
        "thumbnail_url": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "User"
        },
        "containing_frame": {
          "type": "ref",
          "ref": "FrameInfo"
        }
      },
      "required": [
        "key",
        "file_key",
        "node_id",
        "name",
        "description",
        "created_at",
        "updated_at",
        "user"
      ]
    },
    "PublishedComponentSet": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "file_key": {
          "type": "string"
        },
        "node_id": {
          "type": "string"
        },
        "thumbnail_url": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "User"
        },
        "containing_frame": {
          "type": "ref",
          "ref": "FrameInfo"
        }
      },
      "required": [
        "key",
        "file_key",
        "node_id",
        "name",
        "description",
        "created_at",
        "updated_at",
        "user"
      ]
    },
    "StyleType": {
      "type": "string"
    },
    "PublishedStyle": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "file_key": {
          "type": "string"
        },
        "node_id": {
          "type": "string"
        },
        "style_type": {
          "type": "ref",
          "ref": "StyleType"
        },
        "thumbnail_url": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "updated_at": {
          "type": "string"
        },
        "user": {
          "type": "ref",
          "ref": "User"
        },
        "sort_position": {
          "type": "string"
        }
      },
      "required": [
        "key",
        "file_key",
        "node_id",
        "style_type",
        "name",
        "description",
        "created_at",
        "updated_at",
        "user",
        "sort_position"
      ]
    },
    "Project": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "name"
      ]
    },
    "Version": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "created_at": {
          "type": "string"
        },
        "label": {
          "type": "object"
        },
        "description": {
          "type": "object"
        },
        "user": {
          "type": "ref",
          "ref": "User"
        },
        "thumbnail_url": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "created_at",
        "label",
        "description",
        "user"
      ]
    },
    "WebhookV2": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "event_type": {
          "type": "ref",
          "ref": "WebhookV2Event"
        },
        "team_id": {
          "type": "string"
        },
        "context": {
          "type": "string"
        },
        "context_id": {
          "type": "string"
        },
        "plan_api_id": {
          "type": "string"
        },
        "status": {
          "type": "ref",
          "ref": "WebhookV2Status"
        },
        "client_id": {
          "type": "object"
        },
        "passcode": {
          "type": "string"
        },
        "endpoint": {
          "type": "string"
        },
        "description": {
          "type": "object"
        }
      },
      "required": [
        "id",
        "event_type",
        "team_id",
        "context",
        "context_id",
        "plan_api_id",
        "status",
        "client_id",
        "passcode",
        "endpoint",
        "description"
      ]
    },
    "WebhookV2Event": {
      "type": "string"
    },
    "WebhookV2Status": {
      "type": "string"
    },
    "WebhookV2Request": {
      "type": "object",
      "properties": {
        "webhook_id": {
          "type": "string"
        },
        "request_info": {
          "type": "ref",
          "ref": "WebhookV2RequestInfo"
        },
        "response_info": {
          "type": "ref",
          "ref": "WebhookV2ResponseInfo"
        },
        "error_msg": {
          "type": "object"
        }
      },
      "required": [
        "webhook_id",
        "request_info",
        "response_info",
        "error_msg"
      ]
    },
    "WebhookV2RequestInfo": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "endpoint": {
          "type": "string"
        },
        "payload": {
          "type": "object",
          "properties": {}
        },
        "sent_at": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "endpoint",
        "payload",
        "sent_at"
      ]
    },
    "WebhookV2ResponseInfo": {
      "type": "object"
    },
    "LibraryItemData": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "key",
        "name"
      ]
    },
    "CommentFragment": {
      "type": "object",
      "properties": {
        "text": {
          "type": "string"
        },
        "mention": {
          "type": "string"
        }
      }
    },
    "WebhookBasePayload": {
      "type": "object",
      "properties": {
        "passcode": {
          "type": "string"
        },
        "timestamp": {
          "type": "string"
        },
        "webhook_id": {
          "type": "string"
        }
      },
      "required": [
        "passcode",
        "timestamp",
        "webhook_id"
      ]
    },
    "WebhookPingPayload": {
      "type": "ref",
      "ref": "WebhookBasePayload"
    },
    "WebhookFileUpdatePayload": {
      "type": "ref",
      "ref": "WebhookBasePayload"
    },
    "WebhookFileDeletePayload": {
      "type": "ref",
      "ref": "WebhookBasePayload"
    },
    "WebhookFileVersionUpdatePayload": {
      "type": "ref",
      "ref": "WebhookBasePayload"
    },
    "WebhookLibraryPublishPayload": {
      "type": "ref",
      "ref": "WebhookBasePayload"
    },
    "WebhookFileCommentPayload": {
      "type": "ref",
      "ref": "WebhookBasePayload"
    },
    "WebhookDevModeStatusUpdatePayload": {
      "type": "ref",
      "ref": "WebhookBasePayload"
    },
    "ActivityLogUserEntity": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "id",
        "name",
        "email"
      ]
    },
    "ActivityLogFileEntity": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "editor_type": {
          "type": "string"
        },
        "link_access": {
          "type": "ref",
          "ref": "LinkAccess"
        },
        "proto_link_access": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "key",
        "name",
        "editor_type",
        "link_access",
        "proto_link_access"
      ]
    },
    "ActivityLogFileRepoEntity": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "main_file_key": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "id",
        "name",
        "main_file_key"
      ]
    },
    "ActivityLogProjectEntity": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "id",
        "name"
      ]
    },
    "ActivityLogTeamEntity": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "id",
        "name"
      ]
    },
    "ActivityLogWorkspaceEntity": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "id",
        "name"
      ]
    },
    "ActivityLogOrgEntity": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "id",
        "name"
      ]
    },
    "ActivityLogPluginEntity": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "editor_type": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "id",
        "name",
        "editor_type"
      ]
    },
    "ActivityLogWidgetEntity": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "editor_type": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "id",
        "name",
        "editor_type"
      ]
    },
    "ActivityLog": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "timestamp": {
          "type": "number"
        },
        "actor": {
          "type": "object"
        },
        "action": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string"
            },
            "details": {
              "type": "object"
            }
          },
          "required": [
            "type",
            "details"
          ]
        },
        "entity": {
          "type": "ref",
          "ref": "ActivityLogUserEntity"
        },
        "context": {
          "type": "object",
          "properties": {
            "client_name": {
              "type": "object"
            },
            "ip_address": {
              "type": "string"
            },
            "is_figma_support_team_action": {
              "type": "boolean"
            },
            "org_id": {
              "type": "string"
            },
            "team_id": {
              "type": "object"
            }
          },
          "required": [
            "client_name",
            "ip_address",
            "is_figma_support_team_action",
            "org_id",
            "team_id"
          ]
        }
      },
      "required": [
        "id",
        "timestamp",
        "actor",
        "action",
        "entity",
        "context"
      ]
    },
    "DeveloperLogAction": {
      "type": "object",
      "properties": {
        "event_name": {
          "type": "string"
        },
        "event_source": {
          "type": "string"
        }
      },
      "required": [
        "event_name",
        "event_source"
      ]
    },
    "DeveloperLogActor": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "object"
        },
        "user_name": {
          "type": "object"
        },
        "user_email": {
          "type": "object"
        },
        "token_name": {
          "type": "string"
        },
        "token_type": {
          "type": "string"
        }
      },
      "required": [
        "token_name",
        "token_type"
      ]
    },
    "DeveloperLogResource": {
      "type": "object",
      "properties": {
        "id_or_key": {
          "type": "object"
        },
        "name": {
          "type": "object"
        },
        "type": {
          "type": "object"
        },
        "org_id": {
          "type": "string"
        }
      },
      "required": [
        "org_id"
      ]
    },
    "DeveloperLogContext": {
      "type": "object",
      "properties": {
        "ip_address": {
          "type": "string"
        },
        "city": {
          "type": "object"
        },
        "country_region": {
          "type": "object"
        },
        "country": {
          "type": "object"
        }
      },
      "required": [
        "ip_address"
      ]
    },
    "DeveloperLog": {
      "type": "object",
      "properties": {
        "uuid": {
          "type": "string"
        },
        "timestamp": {
          "type": "string"
        },
        "action": {
          "type": "ref",
          "ref": "DeveloperLogAction"
        },
        "actor": {
          "type": "ref",
          "ref": "DeveloperLogActor"
        },
        "resource": {
          "type": "ref",
          "ref": "DeveloperLogResource"
        },
        "context": {
          "type": "ref",
          "ref": "DeveloperLogContext"
        }
      },
      "required": [
        "uuid",
        "timestamp",
        "action",
        "actor",
        "resource",
        "context"
      ]
    },
    "PaymentStatus": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      }
    },
    "PaymentInformation": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "string"
        },
        "resource_id": {
          "type": "string"
        },
        "resource_type": {
          "type": "string"
        },
        "payment_status": {
          "type": "ref",
          "ref": "PaymentStatus"
        },
        "date_of_purchase": {
          "type": "string"
        }
      },
      "required": [
        "user_id",
        "resource_id",
        "resource_type",
        "payment_status"
      ]
    },
    "VariableScope": {
      "type": "string"
    },
    "VariableCodeSyntax": {
      "type": "object",
      "properties": {
        "WEB": {
          "type": "string"
        },
        "ANDROID": {
          "type": "string"
        },
        "iOS": {
          "type": "string"
        }
      }
    },
    "LocalVariableCollection": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "modes": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "modeId": {
                "type": "string"
              },
              "parentModeId": {
                "type": "string"
              },
              "name": {
                "type": "string"
              }
            },
            "required": [
              "modeId",
              "name"
            ]
          }
        },
        "defaultModeId": {
          "type": "string"
        },
        "remote": {
          "type": "boolean"
        },
        "isExtension": {
          "type": "boolean"
        },
        "parentVariableCollectionId": {
          "type": "string"
        },
        "rootVariableCollectionId": {
          "type": "string"
        },
        "variableOverrides": {
          "type": "object",
          "properties": {}
        },
        "hiddenFromPublishing": {
          "type": "boolean"
        },
        "variableIds": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "id",
        "name",
        "key",
        "modes",
        "defaultModeId",
        "remote",
        "hiddenFromPublishing",
        "variableIds"
      ]
    },
    "LocalVariable": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "variableCollectionId": {
          "type": "string"
        },
        "resolvedType": {
          "type": "ref",
          "ref": "VariableResolvedDataType"
        },
        "valuesByMode": {
          "type": "object",
          "properties": {}
        },
        "remote": {
          "type": "boolean"
        },
        "description": {
          "type": "string"
        },
        "hiddenFromPublishing": {
          "type": "boolean"
        },
        "scopes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "VariableScope"
          }
        },
        "codeSyntax": {
          "type": "ref",
          "ref": "VariableCodeSyntax"
        },
        "deletedButReferenced": {
          "type": "boolean"
        }
      },
      "required": [
        "id",
        "name",
        "key",
        "variableCollectionId",
        "resolvedType",
        "valuesByMode",
        "remote",
        "description",
        "hiddenFromPublishing",
        "scopes",
        "codeSyntax"
      ]
    },
    "PublishedVariableCollection": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "subscribed_id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "updatedAt": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "subscribed_id",
        "name",
        "key",
        "updatedAt"
      ]
    },
    "PublishedVariable": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "subscribed_id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "variableCollectionId": {
          "type": "string"
        },
        "resolvedDataType": {
          "type": "ref",
          "ref": "VariableResolvedDataType"
        },
        "updatedAt": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "subscribed_id",
        "name",
        "key",
        "variableCollectionId",
        "resolvedDataType",
        "updatedAt"
      ]
    },
    "VariableCollectionCreate": {
      "type": "object",
      "properties": {
        "action": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "initialModeId": {
          "type": "string"
        },
        "hiddenFromPublishing": {
          "type": "boolean"
        },
        "parentVariableCollectionId": {
          "type": "string"
        },
        "initialModeIdToParentModeIdMapping": {
          "type": "object",
          "properties": {}
        }
      },
      "required": [
        "action",
        "name"
      ]
    },
    "VariableCollectionUpdate": {
      "type": "object",
      "properties": {
        "action": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "hiddenFromPublishing": {
          "type": "boolean"
        }
      },
      "required": [
        "action",
        "id"
      ]
    },
    "VariableCollectionDelete": {
      "type": "object",
      "properties": {
        "action": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      },
      "required": [
        "action",
        "id"
      ]
    },
    "VariableCollectionChange": {
      "type": "ref",
      "ref": "VariableCollectionCreate"
    },
    "VariableModeCreate": {
      "type": "object",
      "properties": {
        "action": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "variableCollectionId": {
          "type": "string"
        }
      },
      "required": [
        "action",
        "name",
        "variableCollectionId"
      ]
    },
    "VariableModeUpdate": {
      "type": "object",
      "properties": {
        "action": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "variableCollectionId": {
          "type": "string"
        }
      },
      "required": [
        "action",
        "id",
        "variableCollectionId"
      ]
    },
    "VariableModeDelete": {
      "type": "object",
      "properties": {
        "action": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      },
      "required": [
        "action",
        "id"
      ]
    },
    "VariableModeChange": {
      "type": "ref",
      "ref": "VariableModeCreate"
    },
    "VariableCreate": {
      "type": "object",
      "properties": {
        "action": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "variableCollectionId": {
          "type": "string"
        },
        "resolvedType": {
          "type": "ref",
          "ref": "VariableResolvedDataType"
        },
        "description": {
          "type": "string"
        },
        "hiddenFromPublishing": {
          "type": "boolean"
        },
        "scopes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "VariableScope"
          }
        },
        "codeSyntax": {
          "type": "ref",
          "ref": "VariableCodeSyntax"
        }
      },
      "required": [
        "action",
        "name",
        "variableCollectionId",
        "resolvedType"
      ]
    },
    "VariableUpdate": {
      "type": "object",
      "properties": {
        "action": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "hiddenFromPublishing": {
          "type": "boolean"
        },
        "scopes": {
          "type": "array",
          "items": {
            "type": "ref",
            "ref": "VariableScope"
          }
        },
        "codeSyntax": {
          "type": "ref",
          "ref": "VariableCodeSyntax"
        }
      },
      "required": [
        "action",
        "id"
      ]
    },
    "VariableDelete": {
      "type": "object",
      "properties": {
        "action": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      },
      "required": [
        "action",
        "id"
      ]
    },
    "VariableChange": {
      "type": "ref",
      "ref": "VariableCreate"
    },
    "VariableModeValue": {
      "type": "object",
      "properties": {
        "variableId": {
          "type": "string"
        },
        "modeId": {
          "type": "string"
        },
        "value": {
          "type": "ref",
          "ref": "VariableValue"
        }
      },
      "required": [
        "variableId",
        "modeId",
        "value"
      ]
    },
    "VariableValue": {
      "type": "boolean"
    },
    "DevResource": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "url": {
          "type": "string"
        },
        "file_key": {
          "type": "string"
        },
        "node_id": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "name",
        "url",
        "file_key",
        "node_id"
      ]
    },
    "LibraryAnalyticsComponentActionsByAsset": {
      "type": "object",
      "properties": {
        "week": {
          "type": "string"
        },
        "component_key": {
          "type": "string"
        },
        "component_name": {
          "type": "string"
        },
        "component_set_key": {
          "type": "string"
        },
        "component_set_name": {
          "type": "string"
        },
        "detachments": {
          "type": "number"
        },
        "insertions": {
          "type": "number"
        }
      },
      "required": [
        "week",
        "component_key",
        "component_name",
        "detachments",
        "insertions"
      ]
    },
    "LibraryAnalyticsComponentActionsByTeam": {
      "type": "object",
      "properties": {
        "week": {
          "type": "string"
        },
        "team_name": {
          "type": "string"
        },
        "workspace_name": {
          "type": "string"
        },
        "detachments": {
          "type": "number"
        },
        "insertions": {
          "type": "number"
        }
      },
      "required": [
        "week",
        "team_name",
        "detachments",
        "insertions"
      ]
    },
    "LibraryAnalyticsComponentUsagesByAsset": {
      "type": "object",
      "properties": {
        "component_key": {
          "type": "string"
        },
        "component_name": {
          "type": "string"
        },
        "component_set_key": {
          "type": "string"
        },
        "component_set_name": {
          "type": "string"
        },
        "usages": {
          "type": "number"
        },
        "teams_using": {
          "type": "number"
        },
        "files_using": {
          "type": "number"
        }
      },
      "required": [
        "component_key",
        "component_name",
        "usages",
        "teams_using",
        "files_using"
      ]
    },
    "LibraryAnalyticsComponentUsagesByFile": {
      "type": "object",
      "properties": {
        "file_name": {
          "type": "string"
        },
        "team_name": {
          "type": "string"
        },
        "workspace_name": {
          "type": "string"
        },
        "usages": {
          "type": "number"
        }
      },
      "required": [
        "file_name",
        "team_name",
        "usages"
      ]
    },
    "LibraryAnalyticsStyleActionsByAsset": {
      "type": "object",
      "properties": {
        "week": {
          "type": "string"
        },
        "style_key": {
          "type": "string"
        },
        "style_name": {
          "type": "string"
        },
        "style_type": {
          "type": "string"
        },
        "detachments": {
          "type": "number"
        },
        "insertions": {
          "type": "number"
        }
      },
      "required": [
        "week",
        "style_key",
        "style_name",
        "style_type",
        "detachments",
        "insertions"
      ]
    },
    "LibraryAnalyticsStyleActionsByTeam": {
      "type": "object",
      "properties": {
        "week": {
          "type": "string"
        },
        "team_name": {
          "type": "string"
        },
        "workspace_name": {
          "type": "string"
        },
        "detachments": {
          "type": "number"
        },
        "insertions": {
          "type": "number"
        }
      },
      "required": [
        "week",
        "team_name",
        "detachments",
        "insertions"
      ]
    },
    "LibraryAnalyticsStyleUsagesByAsset": {
      "type": "object",
      "properties": {
        "style_key": {
          "type": "string"
        },
        "style_name": {
          "type": "string"
        },
        "style_type": {
          "type": "string"
        },
        "usages": {
          "type": "number"
        },
        "teams_using": {
          "type": "number"
        },
        "files_using": {
          "type": "number"
        }
      },
      "required": [
        "style_key",
        "style_name",
        "style_type",
        "usages",
        "teams_using",
        "files_using"
      ]
    },
    "LibraryAnalyticsStyleUsagesByFile": {
      "type": "object",
      "properties": {
        "file_name": {
          "type": "string"
        },
        "team_name": {
          "type": "string"
        },
        "workspace_name": {
          "type": "string"
        },
        "usages": {
          "type": "number"
        }
      },
      "required": [
        "file_name",
        "team_name",
        "usages"
      ]
    },
    "LibraryAnalyticsVariableActionsByAsset": {
      "type": "object",
      "properties": {
        "week": {
          "type": "string"
        },
        "variable_key": {
          "type": "string"
        },
        "variable_name": {
          "type": "string"
        },
        "variable_type": {
          "type": "string"
        },
        "collection_key": {
          "type": "string"
        },
        "collection_name": {
          "type": "string"
        },
        "detachments": {
          "type": "number"
        },
        "insertions": {
          "type": "number"
        }
      },
      "required": [
        "week",
        "variable_key",
        "variable_name",
        "variable_type",
        "collection_key",
        "collection_name",
        "detachments",
        "insertions"
      ]
    },
    "LibraryAnalyticsVariableActionsByTeam": {
      "type": "object",
      "properties": {
        "week": {
          "type": "string"
        },
        "team_name": {
          "type": "string"
        },
        "workspace_name": {
          "type": "string"
        },
        "detachments": {
          "type": "number"
        },
        "insertions": {
          "type": "number"
        }
      },
      "required": [
        "week",
        "team_name",
        "detachments",
        "insertions"
      ]
    },
    "LibraryAnalyticsVariableUsagesByAsset": {
      "type": "object",
      "properties": {
        "variable_key": {
          "type": "string"
        },
        "variable_name": {
          "type": "string"
        },
        "variable_type": {
          "type": "string"
        },
        "collection_key": {
          "type": "string"
        },
        "collection_name": {
          "type": "string"
        },
        "usages": {
          "type": "number"
        },
        "teams_using": {
          "type": "number"
        },
        "files_using": {
          "type": "number"
        }
      },
      "required": [
        "variable_key",
        "variable_name",
        "variable_type",
        "collection_key",
        "collection_name",
        "usages",
        "teams_using",
        "files_using"
      ]
    },
    "LibraryAnalyticsVariableUsagesByFile": {
      "type": "object",
      "properties": {
        "file_name": {
          "type": "string"
        },
        "team_name": {
          "type": "string"
        },
        "workspace_name": {
          "type": "string"
        },
        "usages": {
          "type": "number"
        }
      },
      "required": [
        "file_name",
        "team_name",
        "usages"
      ]
    },
    "ResponsePagination": {
      "type": "object",
      "properties": {
        "prev_page": {
          "type": "string"
        },
        "next_page": {
          "type": "string"
        }
      }
    },
    "ResponseCursor": {
      "type": "object",
      "properties": {
        "before": {
          "type": "number"
        },
        "after": {
          "type": "number"
        }
      }
    },
    "ErrorResponsePayloadWithErrMessage": {
      "type": "object",
      "properties": {
        "status": {
          "type": "number"
        },
        "err": {
          "type": "string"
        }
      },
      "required": [
        "status",
        "err"
      ]
    },
    "ErrorResponsePayloadWithErrorBoolean": {
      "type": "object",
      "properties": {
        "error": {
          "type": "boolean"
        },
        "status": {
          "type": "number"
        },
        "message": {
          "type": "string"
        }
      },
      "required": [
        "error",
        "status",
        "message"
      ]
    },
    "LinkAccess": {
      "type": "string"
    },
    "Role": {
      "type": "string"
    }
  },
  "entities": {},
  "queries": {
    "getFile": {
      "name": "Get file JSON",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "version": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "ids": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "depth": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "geometry": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "plugin_data": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "branch_data": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/files/{file_key}",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          },
          "query": {
            "version": {
              "$resolve": "args.version"
            },
            "ids": {
              "$resolve": "args.ids"
            },
            "depth": {
              "$resolve": "args.depth"
            },
            "geometry": {
              "$resolve": "args.geometry"
            },
            "plugin_data": {
              "$resolve": "args.plugin_data"
            },
            "branch_data": {
              "$resolve": "args.branch_data"
            }
          }
        }
      }
    },
    "getFileNodes": {
      "name": "Get file JSON for specific nodes",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
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
        "version": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "depth": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "geometry": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "plugin_data": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/files/{file_key}/nodes",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          },
          "query": {
            "ids": {
              "$resolve": "args.ids"
            },
            "version": {
              "$resolve": "args.version"
            },
            "depth": {
              "$resolve": "args.depth"
            },
            "geometry": {
              "$resolve": "args.geometry"
            },
            "plugin_data": {
              "$resolve": "args.plugin_data"
            }
          }
        }
      }
    },
    "getImages": {
      "name": "Render images of file nodes",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
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
        "version": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "scale": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "format": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "svg_outline_text": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "svg_include_id": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "svg_include_node_id": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "svg_simplify_stroke": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "contents_only": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        },
        "use_absolute_bounds": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/images/{file_key}",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          },
          "query": {
            "ids": {
              "$resolve": "args.ids"
            },
            "version": {
              "$resolve": "args.version"
            },
            "scale": {
              "$resolve": "args.scale"
            },
            "format": {
              "$resolve": "args.format"
            },
            "svg_outline_text": {
              "$resolve": "args.svg_outline_text"
            },
            "svg_include_id": {
              "$resolve": "args.svg_include_id"
            },
            "svg_include_node_id": {
              "$resolve": "args.svg_include_node_id"
            },
            "svg_simplify_stroke": {
              "$resolve": "args.svg_simplify_stroke"
            },
            "contents_only": {
              "$resolve": "args.contents_only"
            },
            "use_absolute_bounds": {
              "$resolve": "args.use_absolute_bounds"
            }
          }
        }
      }
    },
    "getImageFills": {
      "name": "Get image fills",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/files/{file_key}/images",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          }
        }
      }
    },
    "getFileMeta": {
      "name": "Get file metadata",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/files/{file_key}/meta",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          }
        }
      }
    },
    "getTeamProjects": {
      "name": "Get projects in a team",
      "schema": {
        "type": "object"
      },
      "args": {
        "team_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/teams/{team_id}/projects",
          "params": {
            "team_id": {
              "$resolve": "args.team_id"
            }
          }
        }
      }
    },
    "getProjectFiles": {
      "name": "Get files in a project",
      "schema": {
        "type": "object"
      },
      "args": {
        "project_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "branch_data": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/projects/{project_id}/files",
          "params": {
            "project_id": {
              "$resolve": "args.project_id"
            }
          },
          "query": {
            "branch_data": {
              "$resolve": "args.branch_data"
            }
          }
        }
      }
    },
    "getFileVersions": {
      "name": "Get versions of a file",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "page_size": {
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
        },
        "after": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/files/{file_key}/versions",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          },
          "query": {
            "page_size": {
              "$resolve": "args.page_size"
            },
            "before": {
              "$resolve": "args.before"
            },
            "after": {
              "$resolve": "args.after"
            }
          }
        }
      }
    },
    "getComments": {
      "name": "Get comments in a file",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "as_md": {
          "schema": {
            "type": "boolean"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/files/{file_key}/comments",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          },
          "query": {
            "as_md": {
              "$resolve": "args.as_md"
            }
          }
        }
      }
    },
    "getCommentReactions": {
      "name": "Get reactions for a comment",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "comment_id": {
          "schema": {
            "type": "string"
          },
          "required": true
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
          "path": "/v1/files/{file_key}/comments/{comment_id}/reactions",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            },
            "comment_id": {
              "$resolve": "args.comment_id"
            }
          },
          "query": {
            "cursor": {
              "$resolve": "args.cursor"
            }
          }
        }
      }
    },
    "getMe": {
      "name": "Get current user",
      "schema": {
        "type": "object"
      },
      "args": {},
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/me"
        }
      }
    },
    "getTeamComponents": {
      "name": "Get team components",
      "schema": {
        "type": "object"
      },
      "args": {
        "team_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "page_size": {
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
          "path": "/v1/teams/{team_id}/components",
          "params": {
            "team_id": {
              "$resolve": "args.team_id"
            }
          },
          "query": {
            "page_size": {
              "$resolve": "args.page_size"
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
    "getFileComponents": {
      "name": "Get file components",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/files/{file_key}/components",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          }
        }
      }
    },
    "getComponent": {
      "name": "Get component",
      "schema": {
        "type": "object"
      },
      "args": {
        "key": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/components/{key}",
          "params": {
            "key": {
              "$resolve": "args.key"
            }
          }
        }
      }
    },
    "getTeamComponentSets": {
      "name": "Get team component sets",
      "schema": {
        "type": "object"
      },
      "args": {
        "team_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "page_size": {
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
          "path": "/v1/teams/{team_id}/component_sets",
          "params": {
            "team_id": {
              "$resolve": "args.team_id"
            }
          },
          "query": {
            "page_size": {
              "$resolve": "args.page_size"
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
    "getFileComponentSets": {
      "name": "Get file component sets",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/files/{file_key}/component_sets",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          }
        }
      }
    },
    "getComponentSet": {
      "name": "Get component set",
      "schema": {
        "type": "object"
      },
      "args": {
        "key": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/component_sets/{key}",
          "params": {
            "key": {
              "$resolve": "args.key"
            }
          }
        }
      }
    },
    "getTeamStyles": {
      "name": "Get team styles",
      "schema": {
        "type": "object"
      },
      "args": {
        "team_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "page_size": {
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
          "path": "/v1/teams/{team_id}/styles",
          "params": {
            "team_id": {
              "$resolve": "args.team_id"
            }
          },
          "query": {
            "page_size": {
              "$resolve": "args.page_size"
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
    "getFileStyles": {
      "name": "Get file styles",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/files/{file_key}/styles",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          }
        }
      }
    },
    "getStyle": {
      "name": "Get style",
      "schema": {
        "type": "object"
      },
      "args": {
        "key": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/styles/{key}",
          "params": {
            "key": {
              "$resolve": "args.key"
            }
          }
        }
      }
    },
    "getWebhooks": {
      "name": "Get webhooks by context or plan",
      "schema": {
        "type": "object"
      },
      "args": {
        "context": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "context_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "plan_api_id": {
          "schema": {
            "type": "string"
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
          "path": "/v2/webhooks",
          "query": {
            "context": {
              "$resolve": "args.context"
            },
            "context_id": {
              "$resolve": "args.context_id"
            },
            "plan_api_id": {
              "$resolve": "args.plan_api_id"
            },
            "cursor": {
              "$resolve": "args.cursor"
            }
          }
        }
      }
    },
    "getWebhook": {
      "name": "Get a webhook",
      "schema": {
        "type": "object"
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
          "path": "/v2/webhooks/{webhook_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          }
        }
      }
    },
    "getTeamWebhooks": {
      "name": "[Deprecated] Get team webhooks",
      "schema": {
        "type": "object"
      },
      "args": {
        "team_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v2/teams/{team_id}/webhooks",
          "params": {
            "team_id": {
              "$resolve": "args.team_id"
            }
          }
        }
      }
    },
    "getWebhookRequests": {
      "name": "Get webhook requests",
      "schema": {
        "type": "object"
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
          "path": "/v2/webhooks/{webhook_id}/requests",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          }
        }
      }
    },
    "getActivityLogs": {
      "name": "Get activity logs",
      "schema": {
        "type": "object"
      },
      "args": {
        "events": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "start_time": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "end_time": {
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
        "order": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/activity_logs",
          "query": {
            "events": {
              "$resolve": "args.events"
            },
            "start_time": {
              "$resolve": "args.start_time"
            },
            "end_time": {
              "$resolve": "args.end_time"
            },
            "limit": {
              "$resolve": "args.limit"
            },
            "order": {
              "$resolve": "args.order"
            }
          }
        }
      }
    },
    "getPayments": {
      "name": "Get payments",
      "schema": {
        "type": "object"
      },
      "args": {
        "plugin_payment_token": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "user_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "community_file_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "plugin_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "widget_id": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/payments",
          "query": {
            "plugin_payment_token": {
              "$resolve": "args.plugin_payment_token"
            },
            "user_id": {
              "$resolve": "args.user_id"
            },
            "community_file_id": {
              "$resolve": "args.community_file_id"
            },
            "plugin_id": {
              "$resolve": "args.plugin_id"
            },
            "widget_id": {
              "$resolve": "args.widget_id"
            }
          }
        }
      }
    },
    "getLocalVariables": {
      "name": "Get local variables",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/files/{file_key}/variables/local",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          }
        }
      }
    },
    "getPublishedVariables": {
      "name": "Get published variables",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/files/{file_key}/variables/published",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          }
        }
      }
    },
    "getDevResources": {
      "name": "Get dev resources",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "node_ids": {
          "schema": {
            "type": "string"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/files/{file_key}/dev_resources",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          },
          "query": {
            "node_ids": {
              "$resolve": "args.node_ids"
            }
          }
        }
      }
    },
    "getLibraryAnalyticsComponentActions": {
      "name": "Get library analytics component action data.",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "group_by": {
          "schema": {
            "type": "string"
          },
          "required": true
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
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/analytics/libraries/{file_key}/component/actions",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          },
          "query": {
            "cursor": {
              "$resolve": "args.cursor"
            },
            "group_by": {
              "$resolve": "args.group_by"
            },
            "start_date": {
              "$resolve": "args.start_date"
            },
            "end_date": {
              "$resolve": "args.end_date"
            }
          }
        }
      }
    },
    "getLibraryAnalyticsComponentUsages": {
      "name": "Get library analytics component usage data.",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "group_by": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/analytics/libraries/{file_key}/component/usages",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          },
          "query": {
            "cursor": {
              "$resolve": "args.cursor"
            },
            "group_by": {
              "$resolve": "args.group_by"
            }
          }
        }
      }
    },
    "getLibraryAnalyticsStyleActions": {
      "name": "Get library analytics style action data.",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "group_by": {
          "schema": {
            "type": "string"
          },
          "required": true
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
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/analytics/libraries/{file_key}/style/actions",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          },
          "query": {
            "cursor": {
              "$resolve": "args.cursor"
            },
            "group_by": {
              "$resolve": "args.group_by"
            },
            "start_date": {
              "$resolve": "args.start_date"
            },
            "end_date": {
              "$resolve": "args.end_date"
            }
          }
        }
      }
    },
    "getLibraryAnalyticsStyleUsages": {
      "name": "Get library analytics style usage data.",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "group_by": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/analytics/libraries/{file_key}/style/usages",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          },
          "query": {
            "cursor": {
              "$resolve": "args.cursor"
            },
            "group_by": {
              "$resolve": "args.group_by"
            }
          }
        }
      }
    },
    "getLibraryAnalyticsVariableActions": {
      "name": "Get library analytics variable action data.",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "group_by": {
          "schema": {
            "type": "string"
          },
          "required": true
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
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/analytics/libraries/{file_key}/variable/actions",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          },
          "query": {
            "cursor": {
              "$resolve": "args.cursor"
            },
            "group_by": {
              "$resolve": "args.group_by"
            },
            "start_date": {
              "$resolve": "args.start_date"
            },
            "end_date": {
              "$resolve": "args.end_date"
            }
          }
        }
      }
    },
    "getLibraryAnalyticsVariableUsages": {
      "name": "Get library analytics variable usage data.",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "cursor": {
          "schema": {
            "type": "string"
          },
          "required": false
        },
        "group_by": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/analytics/libraries/{file_key}/variable/usages",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            }
          },
          "query": {
            "cursor": {
              "$resolve": "args.cursor"
            },
            "group_by": {
              "$resolve": "args.group_by"
            }
          }
        }
      }
    },
    "getOEmbed": {
      "name": "Get oEmbed data",
      "schema": {
        "type": "object"
      },
      "args": {
        "url": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "maxwidth": {
          "schema": {
            "type": "number"
          },
          "required": false
        },
        "maxheight": {
          "schema": {
            "type": "number"
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "GET",
          "path": "/v1/oembed",
          "query": {
            "url": {
              "$resolve": "args.url"
            },
            "maxwidth": {
              "$resolve": "args.maxwidth"
            },
            "maxheight": {
              "$resolve": "args.maxheight"
            }
          }
        }
      }
    }
  },
  "actions": {
    "postComment": {
      "name": "Add a comment to a file",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "message": {
                "type": "string"
              },
              "comment_id": {
                "type": "string"
              },
              "client_meta": {
                "type": "ref",
                "ref": "Vector"
              }
            },
            "required": [
              "message"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/files/{file_key}/comments",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
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
      "name": "Delete a comment",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "comment_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v1/files/{file_key}/comments/{comment_id}",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            },
            "comment_id": {
              "$resolve": "args.comment_id"
            }
          }
        }
      }
    },
    "postCommentReaction": {
      "name": "Add a reaction to a comment",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "comment_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "emoji": {
                "type": "ref",
                "ref": "Emoji"
              }
            },
            "required": [
              "emoji"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/files/{file_key}/comments/{comment_id}/reactions",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            },
            "comment_id": {
              "$resolve": "args.comment_id"
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
    "deleteCommentReaction": {
      "name": "Delete a reaction",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "comment_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "emoji": {
          "schema": {
            "type": "ref",
            "ref": "Emoji"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v1/files/{file_key}/comments/{comment_id}/reactions",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            },
            "comment_id": {
              "$resolve": "args.comment_id"
            }
          },
          "query": {
            "emoji": {
              "$resolve": "args.emoji"
            }
          }
        }
      }
    },
    "postWebhook": {
      "name": "Create a webhook",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "event_type": {
                "type": "ref",
                "ref": "WebhookV2Event"
              },
              "team_id": {
                "type": "string"
              },
              "context": {
                "type": "string"
              },
              "context_id": {
                "type": "string"
              },
              "endpoint": {
                "type": "string"
              },
              "passcode": {
                "type": "string"
              },
              "status": {
                "type": "ref",
                "ref": "WebhookV2Status"
              },
              "description": {
                "type": "string"
              }
            },
            "required": [
              "event_type",
              "endpoint",
              "passcode",
              "context",
              "context_id"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v2/webhooks",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "putWebhook": {
      "name": "Update a webhook",
      "schema": {
        "type": "object"
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
            "type": "object",
            "properties": {
              "event_type": {
                "type": "ref",
                "ref": "WebhookV2Event"
              },
              "endpoint": {
                "type": "string"
              },
              "passcode": {
                "type": "string"
              },
              "status": {
                "type": "ref",
                "ref": "WebhookV2Status"
              },
              "description": {
                "type": "string"
              }
            },
            "required": [
              "event_type",
              "team_id",
              "endpoint",
              "passcode"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v2/webhooks/{webhook_id}",
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
    "deleteWebhook": {
      "name": "Delete a webhook",
      "schema": {
        "type": "object"
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
          "path": "/v2/webhooks/{webhook_id}",
          "params": {
            "webhook_id": {
              "$resolve": "args.webhook_id"
            }
          }
        }
      }
    },
    "getDeveloperLogs": {
      "name": "Get developer logs",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "token_type": {
                "type": "string"
              },
              "token": {
                "type": "string"
              },
              "token_name": {
                "type": "string"
              },
              "user_email": {
                "type": "string"
              },
              "ip_address": {
                "type": "string"
              },
              "event_source": {
                "type": "string"
              },
              "date_range": {
                "type": "string"
              },
              "limit": {
                "type": "number"
              },
              "cursor": {
                "type": "string"
              }
            }
          },
          "required": false
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/developer_logs",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "postVariables": {
      "name": "Create/modify/delete variables",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "variableCollections": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "VariableCollectionChange"
                }
              },
              "variableModes": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "VariableModeChange"
                }
              },
              "variables": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "VariableChange"
                }
              },
              "variableModeValues": {
                "type": "array",
                "items": {
                  "type": "ref",
                  "ref": "VariableModeValue"
                }
              }
            }
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/files/{file_key}/variables",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
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
    "postDevResources": {
      "name": "Create dev resources",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "dev_resources": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "url": {
                      "type": "string"
                    },
                    "file_key": {
                      "type": "string"
                    },
                    "node_id": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "name",
                    "url",
                    "file_key",
                    "node_id"
                  ]
                }
              }
            },
            "required": [
              "dev_resources"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "POST",
          "path": "/v1/dev_resources",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "putDevResources": {
      "name": "Update dev resources",
      "schema": {
        "type": "object"
      },
      "args": {
        "data": {
          "schema": {
            "type": "object",
            "properties": {
              "dev_resources": {
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
                    "url": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "id"
                  ]
                }
              }
            },
            "required": [
              "dev_resources"
            ]
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "PUT",
          "path": "/v1/dev_resources",
          "body": {
            "type": "json",
            "data": {
              "$resolve": "args.data"
            }
          }
        }
      }
    },
    "deleteDevResource": {
      "name": "Delete dev resource",
      "schema": {
        "type": "object"
      },
      "args": {
        "file_key": {
          "schema": {
            "type": "string"
          },
          "required": true
        },
        "dev_resource_id": {
          "schema": {
            "type": "string"
          },
          "required": true
        }
      },
      "handler": {
        "request": {
          "method": "DELETE",
          "path": "/v1/files/{file_key}/dev_resources/{dev_resource_id}",
          "params": {
            "file_key": {
              "$resolve": "args.file_key"
            },
            "dev_resource_id": {
              "$resolve": "args.dev_resource_id"
            }
          }
        }
      }
    }
  }
};

export default spec;
