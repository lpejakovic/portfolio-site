const projectListJson = {
    "professional": [
        {
            "title": "4D Wand IMC - web shop",
            "subtitle": "C#, ASP.NET MVC 4, EF4, MSSQL, Bootstrap, jQuery",
            "description": "Universal web shop application that seamlessly synchronizes data with a proprietary ERP software system.",
            "links": [
                {
                    "url": "https://katalog06.4d.hr",
                    "icon": "fa fa-globe",
                    "text": "Preview"
                }
            ]
        },
        {
            "title": "4D Wand IMC - mobile application",
            "subtitle": "C#, Xamarin.Forms, SQLite, Android, iOS",
            "description": "Cross-platform mobile application that allows users to manage commercial and warehouse documents, analyze financial data and access detailed product information.",
            "links": [
                {
                    "url": "https://play.google.com/store/apps/details?id=com.x4d.scanner",
                    "icon": "fa fa-android",
                    "text": "Android"
                },
                {
                    "url": "https://apps.apple.com/hr/app/4d-wand-imc/id1407622866",
                    "icon": "fa fa-apple",
                    "text": "iOS"
                }
            ]
        },
        {
            "title": "WandStat",
            "subtitle": "C#, ASP.NET MVC 4, EF4, MSSQL, Bootstrap, jQuery",
            "description": "Web application dedicated for collecting telemetry data from users of proprietary ERP software system."
        },
        {
            "title": "4D WatchDog Service",
            "subtitle": "C#, .NET Framework 4.8",
            "description": "Windows service responsible for monitoring application lifecycles, ensuring the continuous and scheduled execution of watched applications."
        },
        {
            "title": "Fresh Service",
            "subtitle": "C#, ASP.NET Core 5, EF6, MSSQL, Bootstrap, jQuery",
            "description": "Centralized web application with a primary focus on license verification and seamless distribution of updated versions of proprietary ERP software. Additionally, an internal document and data sharing service."
        },
        {
            "title": "4D Loyalty",
            "subtitle": "C#, .NET MAUI, SQLite, Android, iOS",
            "description": "4D Loyalty is a cross-platform mobile application that allows user to store and access loyalty program cards or any other barcode inputs.",
            "links": [
                {
                    "url": "https://play.google.com/store/apps/details?id=com.x4d.loyalty",
                    "icon": "fa fa-android",
                    "text": "Android"
                },
                {
                    "url": "https://apps.apple.com/hr/app/4d-loyalty/id6472644910",
                    "icon": "fa fa-apple",
                    "text": "iOS"
                }
            ]
        },
        {
            "title": "WebSocket Service",
            "subtitle": "C#, .NET 8, Websocket.Client",
            "description": "Minimal API web service that translates a REST request to Websocket message and communicates to predefined endpoints."
        }
    ],
    "private": [
        {
            "title": "Personal portfolio page",
            "subtitle": "HTML, CSS, JS",
            "description": "Simple single-page website, that demonstrates basic skills of frontend website development.",
            "links": [
                {
                    "url": "https://luka-pejakovic.from.hr",
                    "icon": "fa fa-globe",
                    "text": "Preview"
                },
                {
                    "url": "https://github.com/lpejakovic/portfolio-site",
                    "icon": "fa fa-github",
                    "text": "GitHub"
                }
            ]
        },
        {
            "title": "Baby calculator",
            "subtitle": "Python, Flask, Gunicorn, HTML, CSS, JS",
            "description": "Simple website that takes a date of birth as input, calculates the difference and returns how many weeks the baby is old.",
            "links": [
                {
                    "url": "https://bc.luka-pejakovic.from.hr",
                    "icon": "fa fa-globe",
                    "text": "Preview"
                },
                {
                    "url": "https://github.com/lpejakovic/baby-calculator",
                    "icon": "fa fa-github",
                    "text": "GitHub"
                }
            ]
        },
        {
            "title": "BEBS.",
            "subtitle": "PHP, WordPress, Oxygen, SQLite",
            "description": "Created a blog website for my wife on a WordPress platform, with a few custom functionalities. It's pretty simple and elegant, but the real magic is behind the hood where all data is stored on SQLite, instead of dedicated RDBMS.",
            "links": [
                {
                    "url": "http://blog.luka-pejakovic.from.hr",
                    "icon": "fa fa-globe",
                    "text": "Preview"
                }
            ]
        }
    ]
};

function projectsToHTML() {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML += '<h3>Professional</h3>';
    projectsContainer.innerHTML += '<div class="row" id="professional-projects-row">';

    const professionalRow = document.getElementById('professional-projects-row');
    projectListJson.professional.forEach(function (project) {
        let projectHtml = `
                    <div class="col-xl-4 col-lg-6">
                        <div class="card">
                            <div class="card-header bg-transparent">
                                <h5 class="card-title">${project.title}</h5>
                                <small class="text-muted">${project.subtitle}</small>
                            </div>
                            <div class="card-body">
                                <p class="card-text">${project.description}</p>
                            </div>
                            <div class="card-footer bg-transparent border-top-0">`;

        if (project.links) {
            project.links.forEach(function (link) {
                projectHtml += `
                                <a href="${link.url}" target="_blank" class="card-link">
                                    <i class="${link.icon}"></i>
                                    <span>${link.text}</span>
                                </a>`;
            });
        }

        projectHtml += `
                            </div>
                        </div>
                    </div>`;

        professionalRow.innerHTML += projectHtml;
    });
    projectsContainer.innerHTML += '</div>';

    projectsContainer.innerHTML += '<h3>Private</h3>';
    projectsContainer.innerHTML += '<div class="row" id="private-projects-row">';

    const privateRow = document.getElementById('private-projects-row');
    projectListJson.private.forEach(function (project) {
        let projectHtml = `
                    <div class="col-xl-4 col-lg-6">
                        <div class="card">
                            <div class="card-header bg-transparent">
                                <h5 class="card-title">${project.title}</h5>
                                <small class="text-muted">${project.subtitle}</small>
                            </div>
                            <div class="card-body">
                                <p class="card-text">${project.description}</p>
                            </div>
                            <div class="card-footer bg-transparent border-top-0">`;
        if (project.links) {
            project.links.forEach(function (link) {
                projectHtml += `
                                <a href="${link.url}" target="_blank" class="card-link">
                                    <i class="${link.icon}"></i>
                                    <span>${link.text}</span>
                                </a>`;
            });
        }
        projectHtml += `
                            </div>
                        </div>
                    </div>`;

        privateRow.innerHTML += projectHtml;
    });
    projectsContainer.innerHTML += '</div>';
}