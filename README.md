
# Sea Surface Temperature DataHub API

The Sea Surface Temperature Map API is a backend service that allows users to upload ZIP archives containing sea surface temperature data and generate heat maps based on the uploaded data. This API is designed to process large datasets and provide visualizations that help analyze ocean temperature trends.


## Features

- Upload Data: Easily upload ZIP archives with sea surface temperature data.
- Heat Map Generation: Automatically generate heat maps from the uploaded data, visualizing temperature variations across different regions.
- Interactive Visualization: Explore the generated maps interactively to uncover patterns and insights.


## Getting Started

To use the Sea Surface Temperature Map API, you need to clone the repository and run the API server locally, as the deployed version on Render.com lacks sufficient memory for processing large datasets.

### Prerequisites

- Node.js installed on your machine.
- Git for cloning the repositories.

### Clone and Setup the Repository

1. Clone the API Server Repository:

```bash
  git clone https://github.com/OlgaBieliaieva/sst-map-api
  cd sst-map-api
```

2. Install API Server Dependencies:

```bash
  npm install
  npm run build
```

3. Configure Environment Variables
`PORT=4000`

`CLOUDINARY_CLOUD_NAME=de3wlojzp`

`CLOUDINARY_API_KEY=761338692484449`

`CLOUDINARY_API_SECRET=dlslOWGcpTkkYaSFTeehiFCkx9A`

#### Note: 
The provided Cloudinary credentials have limited usage and may not be suitable for extended use. It is recommended to obtain your own credentials by signing up at Cloudinary.com and configuring them in your .env file.


4. Run the API Server Locally:

```bash
  npm start
```

The API server will start on http://localhost:4000, and the web service will connect to this local instance for processing.
## API Endpoints

1. Create Heat Map

Endpoint: /api/map/create

Method: POST

Description: Upload a ZIP archive containing sea surface temperature data. The API extracts the data, processes it, and generates a heat map.

Request:

- Content-Type: multipart/form-data
- Body: File upload with the key archive containing the ZIP file.

Response:

- Status Code: 200 OK
- Body: JSON object containing the URL of the generated heat map.

Example:

```bash
  curl -X POST http://localhost:4000/api/map/create \
  -F "archive=@/path/to/your/sst.grid.zip"
```



## Usage Notes

- Local Server Requirement: The API server must be run locally due to memory constraints on the deployed version on Render.com (API Link).
- Memory Limitations: The deployed API does not have sufficient memory to handle large datasets effectively, so running it locally ensures better performance and reliability.


## Troubleshooting

- API Not Responding: Ensure that the API server is running locally and accessible at http://localhost:4000.
- File Upload Issues: Verify that the ZIP file contains the correct format and data structure expected by the API. The archive should include a binary file with sea surface temperature data.
- Heat Map Generation Errors: Check the server logs for detailed error messages. This will help diagnose issues related to file processing or data extraction.
## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository. For major changes, please discuss them in an issue first to ensure they align with the project goals.

## Contact


For further information or queries, please contact Olha Shapoval.

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/olha-shapoval)