#!/usr/bin/env python3
import json
import re
import os
import sys

def extract_zip_from_address(address):
    """Extract ZIP code from address string."""
    # Look for 5-digit ZIP code
    zip_match = re.search(r'NY\s+(\d{5})', address)
    if zip_match:
        return zip_match.group(1)
    return "10001"  # Default to Manhattan ZIP if not found

def process_json_file(file_path, category_name):
    """Process a JSON file and organize resources by ZIP code."""
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Remove any BOM characters
        content = content.replace('\ufeff', '')
        
        # Find all individual JSON objects
        pattern = r'(\{[^{}]*(\{[^{}]*\})*[^{}]*\})'
        matches = re.findall(pattern, content, re.DOTALL)
        
        resources_by_zip = {}
        
        for match_tuple in matches:
            json_str = match_tuple[0]
            try:
                resource = json.loads(json_str)
                
                # Extract address and determine ZIP code
                address = resource.get('address', resource.get('Address', ''))
                zip_code = extract_zip_from_address(address)
                
                # Initialize this ZIP code if not already present
                if zip_code not in resources_by_zip:
                    resources_by_zip[zip_code] = []
                
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
                elif "contact" in resource:
                    standardized_resource["phone"] = resource["contact"]
                elif "Contact" in resource:
                    standardized_resource["phone"] = resource["Contact"]
                
                # Add website if available
                if "website" in resource:
                    standardized_resource["website"] = resource["website"]
                elif "Website" in resource:
                    standardized_resource["website"] = resource["Website"]
                
                # Add to resources for this ZIP code
                resources_by_zip[zip_code].append(standardized_resource)
                
                print(f"Processed resource: {standardized_resource.get('name')} for ZIP: {zip_code}")
                
            except json.JSONDecodeError as e:
                print(f"Failed to parse JSON object: {e}")
        
        # Create the fixed JSON file by category
        output = {}
        for zip_code, resources in resources_by_zip.items():
            if zip_code not in output:
                output[zip_code] = {}
            output[zip_code] = {category_name: resources}
        
        output_path = f"{file_path}.fixed.json"
        with open(output_path, 'w') as f:
            json.dump(output, f, indent=2)
        
        print(f"Created fixed JSON file: {output_path}")
        return output
        
    except Exception as e:
        print(f"Error processing file {file_path}: {e}")
        return {}

def fix_all_files():
    """Process all resource JSON files."""
    file_category_map = {
        "public/Cooling Centers.json": "Cooling Centers",
        "public/Legal Clinics.json": "Legal Aid Clinics",
        "public/Advocacy Orgs.json": "Advocacy Organizations",
        "public/Retailers Data.json": "Retailers"
    }
    
    all_resources = {}
    
    for file_path, category in file_category_map.items():
        if not os.path.exists(file_path):
            print(f"File {file_path} not found. Skipping.")
            continue
        
        print(f"Processing {file_path} as {category}...")
        resources = process_json_file(file_path, category)
        
        # Merge resources into all_resources
        for zip_code, zip_data in resources.items():
            if zip_code not in all_resources:
                all_resources[zip_code] = {
                    "Cooling Centers": [],
                    "Legal Aid Clinics": [],
                    "Advocacy Organizations": [],
                    "Retailers": []
                }
            for category_name, category_resources in zip_data.items():
                all_resources[zip_code][category_name] = category_resources
    
    # Save the complete merged resources
    output_path = "public/community_resources_by_zip_new.json"
    with open(output_path, 'w') as f:
        json.dump(all_resources, f, indent=2)
    
    print(f"Created merged resources file: {output_path}")

if __name__ == "__main__":
    fix_all_files() 