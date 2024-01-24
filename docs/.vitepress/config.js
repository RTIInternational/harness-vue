export default {
    title: 'Harness-Vue',
    description: '',
    themeConfig: {
        search: {
            provider: 'local'
        },
        sidebar: [
            {
                text: 'Introduction',
                collapsible: true,
                items: [
                    {text: 'About', link: '/introduction/index'},
                    {text: 'Installation', link: '/introduction/installation'},

                ]
            },
            {
                text: 'Usage',
                collapsible: true,
                items: [
                    {text: 'The loadData Lifecycle', link: '/usage/lifecycle'},
                    {text: 'Page Definitions', link: '/usage/page-definitions'},
                    {text: 'Working with Charts', link: '/usage/charts'},
                    {text: 'Working with Filters', link: '/usage/filters'},
                    {text: "Extending the Store", link: '/usage/extending'},
                    {text: "Use in Components", link: '/usage/components'},
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
                text: 'Harness-Vue Ecosystem',
                collapsible: true,
                items: [
                    {text: 'Github', link: 'https://github.com/RTIInternational/harness-vue'},
                    {text: 'Harness-Vue-Bootstrap', link: 'https://bootstrap.harnessjs.org'},
                    {text: 'Harness-Vue-Starter-Template', link: 'https://github.com/RTIInternational/harness-vue-starter-template'}
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