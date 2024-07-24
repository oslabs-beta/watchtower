# WatchTower - A DynamoDB Visualization Tool

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Upcoming Features](#upcoming-features)
- [Contributing](#contributing)
- [Meet The Team](#meet-the-team)

## Description

WatchTower is a DynamoDB capacity visualization tool. Developers can often have difficulty analyzing and interpreting DynamoDB metrics due to the complexities of existing monitoring tools. WatchTower centralizes this data and allows users to generate metric data from DynamoDB usage and to visualize this data using our graphical UI. You can even ask for more input utilizing Amazon's Bedrock AI from within our application! Additionally, you can store and access this historical data and use this information to find usage patterns to form strategies on how to optimize and make your DynamoDB usage more efficient.

## Tech Stack

- **TypeScript**
- **React**
- **Express**

## Key Features

### AWS Integration
Seamlessly integrate WatchTower with your AWS account by providing an Access Token and Secret Access Token.

### Multi-User Functionality
While our app is hosted locally for your peace of mind, WatchTower has multi-user functionality and full authorization and authentication to protect each user’s data if they are on a shared computer.

### Centralized Dashboard
WatchTower provides a clean, easy-to-use dashboard to observe your AWS DynamoDB provisioning levels and usage. You can easily select different tables from your DynamoDB account to monitor, and then specify the date range you would like metrics for.

### AI Integration
WatchTower integrates with Amazon’s Bedrock to provide you meaningful insights and recommendations on the provisioning levels and usage for your DynamoDB account.

### Past Metrics Storage
We offer the ability to store past metrics that you’ve observed so that you can easily regenerate metric graphs to compare trends in your DynamoDB provisioning and usage data over time. (**Note: If you opt-in to this feature, we will dynamically create a new table in your DynamoDB account to hold past metrics).

### Credential Security
Your AWS credentials are stored securely in your local environment and never shared anywhere outside of your local machine - we prioritize your security!

## Getting Started

Getting started with WatchTower is simple!

1. **Fork GitHub repo.**
2. **Clone the repo into VS Code.**
3. **Navigate to your cloned repo and open a terminal. Run the following commands:**
   ```sh
   npm i
   npm start
 - If localhost:3000 does not automatically open in your browser, open this link: http://localhost:3000/
4. Sign Up: Create an account on our website, or login with GitHub.
5. Connect Your DynamoDB: Use our easy-to-follow guide to connect your DynamoDB tables to WatchTower.
6. Generate metric data: Input necessary information, such as the table you wish to analyze and the time period you wish to see database metrics.
7. As simple as that, your metric data and visual data is generated!
8. Generate AI insight: Users can also generate insights from Amazon's Bedrock AI simply by pressing a button.
9. Save table metrics/graphs: Users can save their generated analysis and metric data to their DynamoDB database by clicking on the “save analysis” button.
10. Analyze Historical Data: Dive into historical metrics to identify trends and optimize performance by navigating over to the reports page.

## Upcoming Features
Customizable alerts and notifications ⏳
Analyze on-demand capacity ⏳
Customizable dashboard ⏳
Analyze auto-scaling capacity 🙏🏻
Expanding report data to aggregate multiple instances of saved reports 🙏🏻
Shared state between any component shortcode 🙏🏻

## Contributing
If you would like to contribute to this project, please follow the below steps:

1. Fork the GitHub repo.
2. Create your feature branch: (git checkout -b feature-YourFeature)
3. Commit your changes: (git commit -m "Add feature")
4. Push to your feature branch: (git push origin feature-YourFeature)
5. Open a pull request. Please follow the below template for your pull request.
- Pull Request Title
- Description of Feature Branch
- Why the change was needed
- How the change was implemented

## Meet the WatchTower Team
Erik Gao
- GitHub[Link Text](URL)
- LinkedIn[Link Text](URL)

James Coen
- GitHub[Link Text](URL)
- LinkedIn[Link Text](URL)

Lauren Felty
- GitHub[Link Text](URL)
- LinkedIn[Link Text](URL)

Mike Bui
- GitHub[Link Text](URL)
- LinkedIn[Link Text](URL)

Piero Espejo
- GitHub[Link Text](URL)
- LinkedIn[Link Text](URL)

