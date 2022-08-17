import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import ViteComponents from 'vite-plugin-components'
import Markdown from 'vite-plugin-md'
import WindiCSS from 'vite-plugin-windicss'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Prism from 'markdown-it-prism'
import matter from 'gray-matter'
import anchor from 'markdown-it-anchor'
import markdownAttr from 'markdown-it-link-attributes'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8888/.netlify/functions',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
      extendRoute(route) {
        const p = path.resolve(__dirname, route.component.slice(1))

        if (!p.includes('projects.md')) {
          const md = fs.readFileSync(p, 'utf-8')
          const { data } = matter(md)
          const string = md.split('')
          const length = string.length
          const words = length / 6.7
          const min = words / 200
          const frontmatter = data
          frontmatter.duration = `${Math.ceil(min)} min read`
          route.meta = Object.assign(route.meta || {}, { frontmatter })
        }

        return route
      },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/vite-plugin-md
    Markdown({
      wrapperComponent: 'post',
      wrapperClasses: 'prose w-full',
      headEnabled: true,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup(md) {
        md.use(Prism)
        md.use(anchor, {
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: '#',
        })
        md.use(markdownAttr, {
          pattern: /^https?:/,
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),

    // https://github.com/antfu/vite-plugin-components
    ViteComponents({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      customLoaderMatcher: id => id.endsWith('.md'),

      // auto import icons
      customComponentResolvers: [
        // https://github.com/antfu/vite-plugin-icons
        ViteIconsResolver({
          componentPrefix: '',
          // enabledCollections: ['carbon']
        }),
      ],
    }),

    // https://github.com/antfu/vite-plugin-icons
    ViteIcons(),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      safelist: 'opacity-25 opacity-75 text-red-500 animate-spin h-5 w-5 text-gray-100 flex-shrink-0 text-red-400 prose prose-sm m-auto text-left bg-green-500 text-gray-100 font-medium font-semibold hover:bg-green-400 text-sm text-xs lg:text-base bg-pink-500 bg-blue-500 bg-red-500',
    }),

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      include: [path.resolve(__dirname, 'locales/**')],
    }),
  ],
  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
  },
})
