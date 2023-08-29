# User stories
<table>
    <thead>
        <tr>
            <th>User story ID</th>
            <th>Priority</th>
            <th>Type</th>
            <th>As a &lt;type of user&gt;</th>
            <th>I want to &lt;perform some task&gt;</th>
            <th>So that I can &lt;achieve some goal&gt;</th>
            <th>Final story</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Low</td>
            <td>Home Page</td>
            <td>First-time visitor</td>
            <td>Quickly understand what Docker-UI offers</td>
            <td>Decide if the application is relevant to me.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Low</td>
            <td>Documentation Page</td>
            <td>Inexperienced user</td>
            <td>User-friendly documentation page</td>
            <td>Easily learn what features the website offers.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Low</td>
            <td>Login/Signup Page</td>
            <td>Returning user or new member</td>
            <td>Seamlessly load previous sessions&#39; content</td>
            <td>Be satisfied and make decisions based on previous data.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>4.1</td>
            <td>High</td>
            <td>Dashboard Page</td>
            <td>Registered user</td>
            <td>Centralized dashboard to interact with a container’s actions</td>
            <td>Manage created containers during their execution.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>4.2</td>
            <td>High</td>
            <td>Dashboard Functionality</td>
            <td>Docker user</td>
            <td>Customize projects maintained by DockerUI</td>
            <td>Manipulate docker containers via docker-compose files.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>5</td>
            <td>High</td>
            <td>Logger&#39;s Page</td>
            <td>Experienced user</td>
            <td>See logging messages within the browser</td>
            <td>Easily debug running containers.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>6</td>
            <td>Medium</td>
            <td>Docker Hub</td>
            <td>Product owner</td>
            <td>Simply distribute Docker UI</td>
            <td>Dispense the application quickly to interested users.</td>
            <td>Yes</td>
        </tr>
    </tbody>
</table>

## Design tasks
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Design Steps</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Home Page</td>
            <td>Display a clear and catchy headline that describes our value proposition.<br /> Include a captivating hero image or illustration that resonates with our brand.<br />  Add a login button that guides users to explore further.<br /></td>
        </tr>
        <tr>
            <td>2</td>
            <td>Documentation Page</td>
            <td>Setup and host documentation pages via Github Pages.<br />  Organize the documentation in an easily understandable format.<br />  Provide comprehensive information on how the website is organized.<br /></td>
        </tr>
        <tr>
            <td>3</td>
            <td>Login/Signup Page</td>
            <td>
                3.1. Offer a clear login form with fields for id and password.<br />  
                3.2. Offer a clear registration page with fields for id, password and email.<br />
                3.3. Allow users to sign up using social media accounts for convenience.<br />  
                3.4. Provide password recovery options and ensure a secure login process.<br />
            </td>
        </tr>
        <tr>
            <td>4.1</td>
            <td>Dashboard design</td>
            <td>
                4.1.1. Design a clean and organized dashboard layout using Figma (see(<br /> 
                4.1.2. Display account information and settings through intuitive and easy to use icons and widgets.<br />
                4.1.3. Ensure easy navigation between different sections or features.<br />
            </td>
        </tr>
        <tr>
            <td>4.2</td>
            <td>Dashboard Functionaity</td>
            <td>
                4.2.1. buildAll(path) - Used to build all services given a Docker Compose file<br /> 
                4.2.2. logs(services, path) uses configServices(path) - Show logs of service(s)<br /> 
                4.2.3. kill(path) - Force stop service containers<br /> 
                4.2.4. stop(path) - Stop running containers without removing them<br /> 
                4.2.5. start or restartAll(path) - Restart all services<br /> 
                4.2.6. upAll(path) - Build, (re)creates, starts, and attaches to containers for all services <br />
                4.2.7. down(path) - Stops containers and removes containers, networks, volumes, and images created by up<br />
            </td>
        </tr>
        <tr>
            <td>5</td>
            <td>Logger&#39;s Page</td>
            <td>Redirect container logging messages to the browser to easily read them.<br /> Create an intuitive interface that allows users to easily navigate across the available features.<br />  Decide on the technologies necessary to setup the real time interaction between the client and server.<br /></td>
        </tr>
        <tr>
            <td>6</td>
            <td>Docker Hub</td>
            <td>Gain the technical expertise needed to setup a Docker Hub release through existing examples.<br /> Setup dependent containers that need to be installed along-side Docker-UI.<br />  Exhaustive tests on multiple machines to ensure that the release works consistently across different OSes.<br /></td>
        </tr>
    </tbody>
</table>
