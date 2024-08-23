# **AI Rate My Professor Assistant**

## **Table of Contents**
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## **Overview**

The **AI Rate My Professor Assistant** is an intelligent web application that helps students find highly-rated professors based on their communication skills and other criteria. This project combines the power of **Next.js** for the frontend, **OpenAI** for generating responses, and **Pinecone** for storing and retrieving data vectors.

The assistant allows users to query information about professors, helping them make informed decisions about their courses. This project was built as part of a learning series and integrates modern AI technologies.

## **Features**

- **Real-time AI Interaction**: Uses OpenAI's GPT model to generate dynamic, context-aware responses.
- **Professor Data Retrieval**: Integrates with Pinecone to efficiently search and retrieve professor ratings and details.
- **Modern UI**: Built with Next.js and MUI for a responsive and user-friendly interface.
- **Deployment-Ready**: Easily deployable on platforms like Vercel.

## **Tech Stack**

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
- **Backend**: [Node.js](https://nodejs.org/), [OpenAI API](https://beta.openai.com/)
- **Database/Vector Storage**: [Pinecone](https://www.pinecone.io/)
- **UI Framework**: [Material-UI (MUI)](https://mui.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## **Setup and Installation**

### **Prerequisites**
- Node.js (v14 or later)
- npm or Yarn
- OpenAI API Key
- Pinecone API Key

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ai-rate-my-professor.git
   cd ai-rate-my-professor
