import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './test-page.module.css'
import HomepageFeatures from '../components/HomepageFeatures'

export default function Home() {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    )
}
