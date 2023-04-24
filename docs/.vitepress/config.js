export default {
    title: 'Harness-Vue',
    description: '',
    themeConfig: {
        sidebar: [
            {
                text: 'Introduction',
                collapsible: true,
                items: [
                    {text: 'About', link: '/introduction/'},
                    {text: 'Getting Started', link: '/introduction/getting-started'},
                    {text: 'Page Definitions', link: '/introduction/page-definitions'}
                ]
            },
            {
                text: 'Usage',
                collapsible: true,
                items: [
                    {text: 'The loadData Lifecycle', link: '/usage/lifecycle'},
                    {text: 'Working with Charts', link: '/usage/charts'},
                    {text: 'Working with Filters', link: '/usage/filters'},
                ]
            },
            {
                text: 'API',
                collapsible: true,
                items: [
                    {text: 'Usage', link: '/api/usage'},
                    {text: 'Getters', link: '/api/getters'},
                    { text: 'Lifecycle', link: '/api/lifecycle' },
                    {text: 'Charts', link: '/api/charts'},
                    {text: 'Filters', link: '/api/filters'},
                    {text: 'Data and Statistics Helpers', link: '/api/data'},
                    {text: 'Pages Metadata', link: '/api/metadata'},
                ]
            },
            {
                text: 'Migrating From Harness',
                collapsible: true,
                items: [
                    {text: 'Migration Guide', link: '/migration/'}
                ]
            },
            {
                text: 'Harness-Vue Ecosystem',
                collapsible: true,
                items: [
                    {text: 'Github', link: 'https://github.com/RTIInternational/harness-vue'},
                    {text: 'Harness-Vue Bootstrap', link: 'https://bootstrap.harnessjs.org'},
                    {text: 'Harness-Vue Starter Template', link: 'https://github.com/RTIInternational/harness-vue-starter-template'}
                ]
            }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Built by <span class="vp-doc"><a href="https://www.rti.org">RTI International</a></span> Center for Data Science'
        },
        nav: [
            { text: 'Guide', link: '/introduction/' },
            { text: 'API', items: [
                {text: 'Usage', link: '/api/usage'},
                {text: 'Getters', link: '/api/getters'},
                { text: 'Lifecycle', link: '/api/lifecycle' },
                {text: 'Charts', link: '/api/charts'},
                {text: 'Filters', link: '/api/filters'},
                {text: 'Data and Statistics Helpers', link: '/api/data'},
                {text: 'Pages Metadata', link: '/api/metadata'},

            ]}
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/RTIInternational/harness-vue' }
        ]
    }
  }