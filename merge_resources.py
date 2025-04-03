#!/usr/bin/env python3
import json
import os

def load_json_file(file_path):
    """Load a JSON file and return its contents."""
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return None

def merge_resources():
    """Merge all resource JSON files into one community_resources_by_zip.json file."""
    # Load existing community resources file
    community_resources_path = "public/community_resources_by_zip.json"
    community_resources = load_json_file(community_resources_path) or {}
    
    # Map of resource files and their corresponding categories
    resource_files = {
        "public/Cooling Centers.fixed.json": "Cooling Centers",
        "public/Legal Clinics.fixed.json": "Legal Aid Clinics",
        "public/Advocacy Orgs.fixed.json": "Advocacy Organizations",
        "public/Retailers Data.fixed.json": "Retailers"
    }
    
    # Process each resource file
    for file_path, category in resource_files.items():
        if not os.path.exists(file_path):
            print(f"File {file_path} not found. Skipping.")
            continue
        
        print(f"Processing {file_path}...")
        data = load_json_file(file_path)
        if not data:
            continue
        
        # Process resources by zip code
        for zip_code, resources in data.items():
            # Ensure this zip code exists in our community resources structure
            if zip_code not in community_resources:
                community_resources[zip_code] = {
                    "Cooling Centers": [],
                    "Legal Aid Clinics": [],
                    "Advocacy Organizations": [],
                    "Retailers": []
                }
            
            # Ensure the category exists
            if category not in community_resources[zip_code]:
                community_resources[zip_code][category] = []
            
            # Add resources from the current file to the corresponding category
            if isinstance(resources, list):
                for resource in resources:
                    # Standardize field names
                    standardized_resource = {}
                    
                    if "name" in resource:
                        standardized_resource["name"] = resource["name"]
                    elif "Name" in resource:
                        standardized_resource["name"] = resource["Name"]
                    
                    if "address" in resource:
                        standardized_resource["address"] = resource["address"]
                    elif "Address" in resource:
                        standardized_resource["address"] = resource["Address"]
                    
                    if "phone" in resource:
                        standardized_resource["phone"] = resource["phone"]
                    elif "Phone" in resource:
                        standardized_resource["phone"] = resource["Phone"]
                    elif "Contact" in resource:
                        standardized_resource["phone"] = resource["Contact"]
                    
                    # Add website if available
                    if "website" in resource:
                        standardized_resource["website"] = resource["website"]
                    elif "Website" in resource:
                        standardized_resource["website"] = resource["Website"]
                    
                    # Check if this resource already exists to avoid duplicates
                    is_duplicate = False
                    for existing_resource in community_resources[zip_code][category]:
                        if (
                            existing_resource.get("name") == standardized_resource.get("name") and
                            existing_resource.get("address") == standardized_resource.get("address")
                        ):
                            is_duplicate = True
                            # Update website if new one is available
                            if "website" in standardized_resource and "website" not in existing_resource:
                                existing_resource["website"] = standardized_resource["website"]
                            break
                    
                    if not is_duplicate:
                        community_resources[zip_code][category].append(standardized_resource)
    
    # Save merged data to a new file
    output_path = "public/community_resources_by_zip_new.json"
    with open(output_path, 'w') as f:
        json.dump(community_resources, f, indent=2)
    
    print(f"Resources merged and saved to {output_path}")

if __name__ == "__main__":
    merge_resources()