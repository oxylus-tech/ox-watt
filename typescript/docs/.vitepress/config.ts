import { defineConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar'


const vitePressOptions = {
    title: 'Ox-Watt',
    description: 'WebApp Technology Toolkit.',

    ignoredDeadLinks: true,
    themeConfig: {
        nav: [
            { text: 'Guide', link: '/guide/' },
            { text: 'API', link: '/api/' }
        ],
    }
}

const vitePressSidebarOptions = {
    documentRootPath: '/docs',
    useTitleFromFileHeading: true,
    collapsed: true,
    // includeRootIndexFile: true,
    // includeFolderIndexFile: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    sortMenusByFrontmatterOrder: true
}

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions))
