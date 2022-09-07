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
                    {text: 'Harness Vue Metadata', link: '/api/metadata'},
                    {text: 'Charts', link: '/api/charts'},
                    {text: 'Filters', link: '/api/filters'},
                    {text: 'Data and Statistics Helpers', link: '/api/data'}
                ]
            },
            {
                text: 'Migration Guide',
                collapsible: true,
                items: [
                    {text: 'Migration from Harness', link: '/migration/'}
                ]
            },
            {
                text: 'Harness Vue Ecosystem',
                collapsible: true,
                items: [
                    {text: 'Github', link: 'https://github.com/RTIInternational/harness-vue'},
                    {text: 'Harness Vue Bootstrap', link: 'https://ui.harnessjs.org'},
                    {text: 'Harness Vue Starter Template', link: 'https://github.com/RTIInternational/harness-vue-starter-template'}
                ]
            }
        ]
    }
  }