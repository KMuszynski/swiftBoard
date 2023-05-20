#!/bin/bash

display_help() {
    echo "Usage: $0 [-f|e|o]"
    echo
    echo "This program reads the contents of .env file and creates a postgres configuration file"
    echo "that makes selected env variables available as postgres parameters, created parameters are prefixed with 'env.' ."
    echo "Variables present in the environment take precedence over the ones in the .env file"
    echo
    echo "Options:"
    echo "  -f string   Location of the .env file (default ./.env)"
    echo "  -e string   Location of the example .env file that will be used if .env file doesn't exist (default ./.env.example)"
    echo "  -o string   Location of the output file (default ./env-config.js)"
}

# defaults
env_file=".env"
example_env_file=".env.example"
output_file="env.conf"

# Process command-line arguments
while getopts "f:e:o: :h" opt; do
    case $opt in
        h)
            display_help
            exit
        ;;
        f) env_file=$OPTARG;;
        e) example_env_file=$OPTARG;;
        o) output_file=$OPTARG;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            display_help
            exit 1
        ;;
    esac
done

# If `.env` file doesn't exist use `.env.example` file instead,
# in order to know which env vars are of interest to us
if [ -f "$env_file" ]; then
    file_to_read="$env_file"
else
    file_to_read="$example_env_file"
fi

# Recreate output file
rm -rf $output_file
touch $output_file

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n $line ]];
do
    
    # continue if line is a comment or doesnt't contain `=` character
    if (echo $line | grep -q -e '^#') || !(echo $line | grep -q -e '=') ; then
        continue
    fi
    
    varname=$(echo $line | cut -d "=" -f 1)
    varvalue=$(echo $line | cut -d "=" -f 2)
    
    # Replace variable references with their corresponding values
    while [[ $varvalue =~ \$\{([a-zA-Z_][a-zA-Z_0-9]*)\} ]]; do
        match=${BASH_REMATCH[0]}
        env_var=${BASH_REMATCH[1]}
        env_value="${!env_var}"
        
        # If the referenced variable isn't presesent in the environment, but is in .env file, retrieve its value
        if [[ -z $env_value && $(grep -E "^$env_var=" "$file_to_read") ]]; then
            env_value=$(grep -E "^$env_var=" "$file_to_read" | cut -d "=" -f 2)
        fi
        
        varvalue=${varvalue//$match/$env_value}
    done
    
    # If exists use value the value of environment variable
    value="${!varname}"
    # Otherwise use value from .env file
    [[ -z $value ]] && value=${varvalue}
    
    # Add quotes if necessary
    if [[ !($varvalue =~ ^[+-]?[0-9]+([.][0-9]+)?$ || $varvalue =~ ^(true|false)$ || $varvalue =~ \'*\' )]]; then
        value="'${value//\"/}'"
    fi
    
    # Append configuration property to output file
    echo "env.${varname,,}=$value" >> $output_file
done < $file_to_read