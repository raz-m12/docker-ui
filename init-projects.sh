#!/bin/bash

# Check if the correct number of arguments is provided
if [ $# -lt 1 ]; then
   echo "Usage: $0 <source_path1> [<source_path2> ...] "
   exit 1
fi

# Define the predefined destination path
destination_path="./server-side/docker-projects/"

# Function to move folders from a source path to the destination path
move_folders() {
   local source_path="$1"

   if [ ! -d "$source_path" ]; then
       echo "Source path does not exist or is not a directory: $source_path"
   else

       if mv "$source_path" "$destination_path"; then
            echo "Folders from $source_path moved to $destination_path"
        else
            echo "Failed to move folders from $source_path to $destination_path"
        fi
   fi
}

# Iterate through each source path and move folders to the destination path
for source_path in "$@"; do
   move_folders "$source_path"
done