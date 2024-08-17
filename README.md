<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/wali39/edusea">
    <img src="https://res.cloudinary.com/dl1sztvng/image/upload/v1723884598/bmtg0ls20g5fscil3o2w.png" alt="Logo" width="260" height="60">
  </a>

  <h3 align="center"> Learning Management Platform</h3>

  <p align="center">
    <a href="https://edusea.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/wali39/edusea/labels/bug">Report Bug</a>
    ·
    <a href="https://github.com/wali39/edusea/labels/enhancement">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#technologies-used">Technologies Used</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<img width="941" alt="ss3" src="https://res.cloudinary.com/dl1sztvng/image/upload/v1723890976/jd8c9zfmowscbeyttpfx.png" style="border-radius:5px">

Edusea- a state-of-the-art Learning Management System designed to provide an interactive and comprehensive online learning experience. Built with Next.js and Express.js, this platform is equipped with advanced features for course management, student engagement, and secure, seamless user experiences.

## Key Features

<span style="font-size:14px">`01. Dynamic Course Creation & Management:` Easily create and manage course content, including images and attachments</span>

<details>
<summary>(view screenshot)</summary>
<img width="941" alt="ss3" src="https://res.cloudinary.com/dl1sztvng/image/upload/v1723887988/duwv7eacrlhwvwttsodn.png" style="border-radius:5px">
</details>
<br>

<span style="font-size:14px">`02. Robust Authentication:` Secure user authentication using Clerk</span>

<details>
<summary>(view screenshot)</summary>
<img width="941" alt="ss3" src="https://res.cloudinary.com/dl1sztvng/image/upload/v1723889441/zwjzgpexxq4stcorlnpl.png" style="border-radius:5px">
</details>
<br>

<span style="font-size:14px">`03. Interactive Video Playback & Upload:` Integrated with Mux for a smooth video experience</span>

<details>
<summary>(view screenshot)</summary>
<img width="941" alt="ss3" src="https://res.cloudinary.com/dl1sztvng/image/upload/v1723889441/vamuimmrw8pbtyhobvhs.png" style="border-radius:5px">
</details>
<br>

<span style="font-size:14px">`04. Secure Payments:` Stripe integration for handling course payments and subscriptions</span>

<details>
<summary>(view screenshot)</summary>
<img width="941" alt="ss3" src="https://res.cloudinary.com/dl1sztvng/image/upload/v1723889441/ifqyy5l4koouzasyk6xm.png" style="border-radius:5px">
</details>
<br>

<span style="font-size:14px">`05. User-Friendly Interface:` Modern, responsive design with Tailwind CSS</span>

<details>
<summary>(view screenshot)</summary>
<img width="941" alt="ss3" src="https://res.cloudinary.com/dl1sztvng/image/upload/v1723889441/yetlfw7cgxyrwfivuvsd.png" style="border-radius:5px">
</details>
<br>

<span style="font-size:14px">`06. Document and Image Uploads:` Utilizing UploadThing for hassle-free file management.</span>
<br>

<details>
<summary>(view screenshot)</summary>
<img width="941" alt="ss3" src="https://res.cloudinary.com/dl1sztvng/image/upload/v1723888505/xmb9djnfwn7bu08jpoyt.png" style="border-radius:5px">
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Technologies Used

## Frontend

**Technologies Used**

[![React][React.js]][React-url]
[![Next][Next.js]][Next-url]
[![Taiwind][Tailwind]][Tailwind-url]
[![Shadcn/ui][Shadcn/ui]][Shadcn/ui-url]
[![Reacticons][Reacticons]][Reacticons-url]
[![Lucidereact][Lucidereact]][Lucidereact-url]
[![Reactconfetti][Reactconfetti]][Reactconfetti-url]
[![ReackHookForm][ReactHookForm]][ReactHookForm-url]
[![Uploadthing][Uploadthing]][Uploadthing-url]
[![Zod][Zod]][Zod-url]
[![ReactQuill][ReactQuill]][ReactQuill-url]
[![Recharts][Recharts]][Recharts-url]
[![Hellopangea/dnd][Hellopangea/dnd]][Hellopangea/dnd-url]
[![Zustand][Zustand]][Zustand-url]
[![Clerk][Clerk]][Clerk-url]

**Key Libraries:**

- `@clerk/nextjs 4.29.6:` For secure user authentication.
- `@mux/mux-node 8.0.0` and `@mux/mux-player-react 2.3.3` : For video playback and uploads.
- `@uploadthing/react 6.2.2:` For handling document and image uploads.
- `react-hot-toast 2.4.1:` For elegant notifications.
- `prisma 5.9.1`: For effiecient and type-safe database access.
- `zod 4.5.1:` Schema declaration and validation.
- `zustand 4.5.1:` State management.

**UI/UX Enhancements:**

- `Tailwind Merge 2.2.1`: For optimizing Tailwind CSS classes.
- `cmdk 0.2.1:` Command menu interface.
- `@hello-pangea/dnd 16.5.0:` Drag and drop file uploads.
- `@tanstack/react-table 8.12.0:` For building and managing tables.
- `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, etc., for advanced UI components.

**Features:**

- Interactive and user-friendly interface.
- Seamless integration with video streaming and file upload services.
- Comprehensive course creation and management tools.
- Responsive design ensuring compatibility across various devices.

**Development Tools:**

- `eslint 8`: For code linting.
- `postcss 8` and `autoprefixer 10.0.1`: For CSS processing.
- `typescript 5`: For type-checking.

## Backend

**Technology Used:**

[![Next][Next.js]][Next-url]
[![TypeScript][Typescript.ts]][Typescript-url]
[![MongoDB][MongoDB]][MongoDB-url]
[![Prisma][Prisma]][Prisma-url]
[![Axios][Axios]][Axios-url]
[![Stripe][Stripe]][Stripe-url]
[![Mux][Mux]][Mux-url]

**Main technologies:**

- `Next.js 10.3.0:` The backbone of the server, handling routing and middleware.
- `Node.js:` The runtime environment for executing JavaScript on the server side.

**Key Libraries:**

- `Stripe`: Payment processing platform For online transactions.
- `Uploadthing:` Image and video upload library for seamless multimedia integration.
- `Mux:` Video streaming and processing platform for high-quality multimedia content.

**Database:**

- `MongoDB:` NoSQL database used for storing application data.

**Features:**

- Robust REST API endpoints for data retrieval and manipulation.
- Secure connection to the database with efficient query handling.
- Scalable architecture suitable for expanding features and user base.

**Development Tools:**

- Various NPM packages for enhancing functionality and efficiency.
- Postman for testing and validating API endpoints.

**Integration:**

- <b>Stripe</b> for payment processing: Integrated with Stripe's webhooks for handling transactions.
- Other third-party services as required by the application.

  <p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get started with the <b>`Edusea`</b> project, follow these steps:

### Prerequisites

Node version 18.x.x

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/wali39/edusea.git
   ```
2. Install dependencies
   ```sh
   npm install
   or
   yarn install
   ```
3. Setup Environment variable `.env`

   ```js
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   MDB_DATABASE_URL = "Your mongodb database URL";

   UPLOADTHING_SECRET = "Your Uploadthing secret";
   UPLOADTHING_APP_ID = "Your uploadthing app id";

   MUX_TOKEN_ID = "";
   MUX_TOKEN_SECRET = "";
   STRIPE_API_KEY = "";

   NEXT_PUBLIC_APP_URL = "";

   STRIPE_WEBHOOK_SECRET = "";
   ```

4. Set up prisma to sync with your db (MongodDB)
   ```js
   npx prisma generate
   npx prisma db push
   ```
5. Run development server
   ```js
   npm run dev
   or
   yarn run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/wali39/edusea.svg?style=for-the-badge
[contributors-url]: https://github.com/wali39/edusea/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/wali39/edusea.svg?style=for-the-badge
[forks-url]: https://github.com/wali39/edusea/network/members
[stars-shield]: https://img.shields.io/github/stars/wali39/edusea.svg?style=for-the-badge
[stars-url]: https://github.com/wali39/edusea/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/wali39/edusea/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/wali39/edusea?tab=MIT-1-ov-file
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/wali-ullah-7896631aa/
[product-screenshot]: https://res.cloudinary.com/dl1sztvng/image/upload/v1723526027/alpse5fpj6j1ndo95rvv.png
[course-creation-screenshot]: https://res.cloudinary.com/dl1sztvng/image/upload/v1723887988/duwv7eacrlhwvwttsodn.png
[document-upload-screenshot]: https://res.cloudinary.com/dl1sztvng/image/upload/v1723888505/xmb9djnfwn7bu08jpoyt.png
[authentication-screenshot]: https://res.cloudinary.com/dl1sztvng/image/upload/v1723889441/zwjzgpexxq4stcorlnpl.png
[videoplayer-screenshot]: https://res.cloudinary.com/dl1sztvng/image/upload/v1723889441/vamuimmrw8pbtyhobvhs.png
[payment-screenshot]: https://res.cloudinary.com/dl1sztvng/image/upload/v1723889441/ifqyy5l4koouzasyk6xm.png
[userfriendly-screenshot]: https://res.cloudinary.com/dl1sztvng/image/upload/v1723889441/yetlfw7cgxyrwfivuvsd.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Typescript.ts]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[Prisma]: https://img.shields.io/badge/Prisma-191D3C?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[MongoDB]: https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Typescript-url]: https://www.typescriptlang.org/
[Shadcn/ui]: https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=for-the-badge
[Shadcn/ui-url]: https://ui.shadcn.com/
[Tailwind]: https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss
[Tailwind-url]: https://tailwindcss.com/
[Clerk]: https://img.shields.io/badge/Clerk-134B70?style=for-the-badge&logo=clerk&logoColor=8A67FF
[Clerk-url]: https://clerk.com/
[Axios]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios
[Axios-url]: https://axios-http.com/docs/intro
[Stripe]: https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=Stripe&logoColor=FFFFFF
[Stripe-url]: https://stripe.com/
[Zod]: https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=Zod&logoColor=FFFFFF
[Zod-url]: https://clerk.com/
[ReactHookForm]: https://img.shields.io/badge/ReactHookForm-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=FFFFFF
[ReactHookForm-url]: https://react-hook-form.com/
[Uploadthing]: https://custom-icon-badges.demolab.com/badge/uploadthing-150002?style=for-the-badge&logo=uploadthing&logoColor=FFFFFF
[Uploadthing-url]: https://uploadthing.com/
[Mux]: https://custom-icon-badges.demolab.com/badge/Mux-gray?style=for-the-badge&logo=muxc&logoColor=FFFFFF
[Mux-url]: https://www.mux.com/
[Reacticons]: https://custom-icon-badges.demolab.com/badge/Reacticons-F4F5F7?style=for-the-badge&logo=reacticons&logoColor=FFFFFF
[Reacticons-url]: https://react-icons.github.io/react-icons/
[Lucidereact]: https://custom-icon-badges.demolab.com/badge/Lucidereact-150002?style=for-the-badge&logo=lucidereact&logoColor=FFFFFF
[Lucidereact-url]: https://lucide.dev/
[ReactQuill]: https://custom-icon-badges.demolab.com/badge/ReactQuill-2c3e50?style=for-the-badge&logoColor=FFFFFF
[ReactQuill-url]: https://www.npmjs.com/package/react-quill
[Recharts]: https://custom-icon-badges.demolab.com/badge/%3CRecharts/%3E-201E43?style=for-the-badge
[Recharts-url]: https://github.com/hello-pangea/dnd
[Hellopangea/dnd]: https://custom-icon-badges.demolab.com/badge/hellopangea/dnd-508C9B?style=for-the-badge
[Hellopangea/dnd-url]: https://github.com/hello-pangea/dnd
[Reactconfetti]: https://custom-icon-badges.demolab.com/badge/reactconfetti-1A4870?style=for-the-badge
[Reactconfetti-url]: https://www.npmjs.com/package/react-confetti
[Zustand]: https://custom-icon-badges.demolab.com/badge/zustand-black?style=for-the-badge
[Zustand-url]: https://zustand-demo.pmnd.rs/
