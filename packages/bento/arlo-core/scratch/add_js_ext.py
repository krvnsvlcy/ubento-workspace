import os
import re

root_dir = "/home/kervensvolcy/repos/abstrea/ubento/packages/bento/arlo/src"

# Regex to match relative imports/exports including multi-line
rel_path_re = re.compile(r'((?:import|export)\s+.*?\s+from\s+["\'])(\.\.?\/[^"\']+)(["\'])', re.DOTALL)

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith((".ts", ".tsx")):
            path = os.path.join(root, file)
            with open(path, "r") as f:
                content = f.read()
            
            def replace_fn(match):
                prefix = match.group(1)
                rel_path = match.group(2)
                suffix = match.group(3)
                
                if any(rel_path.endswith(ext) for ext in [".js", ".css", ".json", ".svg", ".png", ".jpg", ".webp"]):
                    return match.group(0)
                
                return f"{prefix}{rel_path}.js{suffix}"

            new_content = rel_path_re.sub(replace_fn, content)
            
            if new_content != content:
                with open(path, "w") as f:
                    f.write(new_content)
                print(f"Updated {path}")
