# WatchTower - A DynamoDB Visualization Tool

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Upcoming Features](#upcoming-features)
- [Contributing](#contributing)
- [Meet The Team](#meet-the-team)
- [Where To Find Us](#where-to-find-us)

## Description

WatchTower is a DynamoDB capacity visualization tool. Developers can often have difficulty analyzing and interpreting DynamoDB metrics due to the complexities of existing monitoring tools. WatchTower centralizes this data and allows users to generate metric data from DynamoDB usage and to visualize this data using our graphical UI. You can even ask for more input utilizing Amazon's Bedrock AI from within our application! Additionally, you can store and access this historical data and use this information to find usage patterns to form strategies on how to optimize and make your DynamoDB usage more efficient.

## Tech Stack

- **TypeScript**
- **React**
- **Express**
- https://user-images.githubusercontent.com/94085979/187011760-2ab7d8fe-2020-40d8-84a1-3e463ae6718e.svg
## Key Features

### AWS Integration
Seamlessly integrate WatchTower with your AWS account by providing an Access Token and Secret Access Token.

![AWS Acc Info](https://github.com/user-attachments/assets/90a3d36b-ca49-46bc-b429-e458fbebfe9d)

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
3. **Create a `.env` file <strong><u>in the server folder</u></strong> using below template**
    ```sh
    # AWS Credentials for Connecting AWS
    AWS_ACCESS_KEY_ID="your_aws_access_key_id"
    AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"
    REGION="your_aws_region"
    ```
4. **Navigate to your cloned repo and open a terminal. Run the following commands:**
   ```sh
   npm i
   npm start
   ```
 - If localhost:3000 does not automatically open in your browser, open this link: http://localhost:3000/
5. Sign Up: Create an account on our website, or login with GitHub.
6. Connect Your DynamoDB: Use our easy-to-follow guide to connect your DynamoDB tables to WatchTower.
7. Generate metric data: Input necessary information, such as the table you wish to analyze and the time period you wish to see database metrics.
8. As simple as that, your metric data and visual data is generated!
9. Generate AI insight: Users can also generate insights from Amazon's Bedrock AI simply by pressing a button.
10. Save table metrics/graphs: Users can save their generated analysis and metric data to their DynamoDB database by clicking on the “save analysis” button.
11. Analyze Historical Data: Dive into historical metrics to identify trends and optimize performance by navigating over to the reports page.
    - AWS Bedrock has a lot of AI Model: https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html Here is the list for the Model name and its ID. The model that we are using is ‘Mistral 7B Instruct’.
    - AWS Bedrock is not free, they have distinct price for model. Here is the link for pricing: https://aws.amazon.com/bedrock/pricing/?refid=ft_card
    - Not all model has responsesteram, if the model you want use dont have responsestream, you can use invokemodelcommand method! https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/bedrock-runtime/command/InvokeModelCommand/
    - In order to grant access for specific AI model, you have to https://aws.amazon.com/bedrock/ and login, on the left side bar, choose Foundation models -> Base models and click whatever model you want. Inside the model Overview, there is a button ‘Request model access’. Then you will be all set!




## Upcoming Features
- Customizable alerts and notifications ⏳
- Analyze on-demand capacity ⏳
- Customizable dashboard ⏳
- Analyze auto-scaling capacity 🙏🏻
- Expanding report data to aggregate multiple instances of saved reports 🙏🏻
- Shared state between any component shortcode 🙏🏻

## Contributing
If you would like to contribute to this project, please follow the below steps:

1. Fork the GitHub repo.
2. Create your feature branch:
      ```sh
      git checkout -b feature-YourFeature
4. Commit your changes:
      ```sh
      git commit -m "Add feature"
5. Push to your feature branch: (git push origin feature-YourFeature)
6. Open a pull request. Please follow the below template for your pull request.
- Pull Request Title
- Description of Feature Branch
- Why the change was needed
- How the change was implemented

## Meet The Team

<div style="display: flex; justify-content: center;">

<table>
  <tr>
    <td style="text-align: center; padding: 10px;">
      <img src="https://drive.google.com/uc?export=view&id=17KDjj9yn_AKJJ41DHijzIz7aX7Ya9tQv" alt="Erik" width="100" style="border-radius: 50%;">
      <br>Erik Gao
      <br><a href="https://github.com/KIREG19">GitHub</a>
      <br><a href="https://www.linkedin.com/in/erikgaogg/">LinkedIn</a>
    </td>
    <td style="text-align: center; padding: 10px;">
      <img src="https://drive.google.com/uc?export=view&id=1ZCAgpJy2Msswi_3On4JPhAJg2lqZFHZZ" alt="James" width="100" style="border-radius: 50%;">
      <br>James Coen
      <br><a href="https://github.com/jamescoen">GitHub</a>
      <br><a href="https://www.linkedin.com/in/james-coen-2a00a3148/">LinkedIn</a>
    </td>
    <td style="text-align: center; padding: 10px;">
      <img src="https://drive.google.com/uc?export=view&id=1LXKcsG7xmbbIVCnsdTwouOuMX1HL6HjO" alt="Lauren" width="100" style="border-radius: 50%;">
      <br>Lauren Felty
      <br><a href="https://github.com/LaurenFelty">GitHub</a>
      <br><a href="https://www.linkedin.com/in/lauren-felty/">LinkedIn</a>
    </td>
    <td style="text-align: center; padding: 10px;">
      <img src="https://drive.google.com/uc?export=view&id=1Wprg3i-j_KIZf816Wi1utsjnaH6w7Jgs" alt="Mike" width="100" style="border-radius: 50%;">
      <br>Mike Bui
      <br><a href="https://github.com/MikeBui91">GitHub</a>
      <br><a href="https://www.linkedin.com/in/mike-bui09/">LinkedIn</a>
    </td>
    <td style="text-align: center; padding: 10px;">
      <img src="https://drive.google.com/uc?export=view&id=180dmu9oKMT7fu_sQVLo6gqSSOADei1-Z" alt="Piero" width="100" style="border-radius: 50%;">
      <br>Piero Espejo
      <br><a href="https://github.com/Piero914">GitHub</a>
      <br><a href="https://www.linkedin.com/in/piero-espejo-6813a9b0/">LinkedIn</a>
    </td>
  </tr>
</table>

</div>

## Where To Find Us
- [Website](https://watch-tower.co/)
- [LinkdIn](https://www.linkedin.com/in/watchtower-db/)
- [X](https://x.com/WatchTower_DB)

