# やば道チェッカー (Yabamichi Checker)

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

[
![Built with Deno](https://img.shields.io/badge/built%20with-Deno-000000.svg?logo=deno)
](https://deno.land)

An application to visualize and check for dangerous roads and intersections within the Kunitaka district, based on resident-submitted data.


![Screenshot of the Yabamichi Checker application showing a map with a route and identified danger spots.](https://user-images.githubusercontent.com/69106571/218246457-7e5650ae-5879-4c89-bdc0-e68a7b5a0d6d.PNG)


### [Live Demo](https://yabamichi-checker.deno.dev/)

## Features

-   **Route Hazard Analysis**: Enter a start and end point to see a route map highlighting reported danger spots along your path.
-   **Danger Hotspot Ranking**: View a ranked list of the most hazardous locations based on accident data and reports.
-   **Detailed Information**: Click on a hazard icon to read descriptions and concerns submitted by local residents.
-   **VR Experience**: Explore a 3D model of a specific high-risk intersection to better understand its dangers from a pedestrian's perspective.

## Technology Stack

-   **Framework**: [Fresh](https://fresh.deno.dev/) (A Deno-based web framework)
-   **Mapping**: [Leaflet](https://leafletjs.com/) with map tiles from the [Geospatial Information Authority of Japan (GSI)](https://maps.gsi.go.jp/development/ichiran.html).
-   **Routing**: [openrouteservice API](https://api.openrouteservice.org/) for generating driving routes.
-   **Coordinate System**: [Geo3x3](https://geo3x3.com/) for encoding location data.

## Getting Started

### Prerequisites

-   [Deno](https://deno.land/) installed on your system.
-   An API key from [openrouteservice](https://api.openrouteservice.org/).

### Installation and Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/code4fukui/yabamichi-checker.git
    cd yabamichi-checker
    ```

2.  Create a `.env` file from the sample:
    ```bash
    cp .env.sample .env
    ```

3.  Add your openrouteservice API key to the `.env` file:
    ```env
    OPENROUTE_KEY="YOUR_API_KEY_HERE"
    ```

4.  Start the development server:
    ```bash
    deno task start
    ```

5.  Open your browser and navigate to `http://localhost:8000`.

## Data Source

The danger spot data is provided by the **キッズセーフ (KidsSafe)** project, which collects information on hazardous locations for children in the community.

-   [KidsSafe Kunitaka Data Repository](https://github.com/code4fukui/kunitaka)

## Acknowledgements

-   **Emoji**: [Twemoji](https://twemoji.twitter.com/)
-   **Template Engine**: [dejs](https://github.com/syumai/dejs)
-   **Community**: [Code for Fukui Slack](https://codeforfukui.slack.com/join/shared_invite/zt-1g30n0mnr-g8y7eTAegytui4riQJ8d4A#/shared-invite/email) (Join the conversation in the `#やば道チェッカー` channel)