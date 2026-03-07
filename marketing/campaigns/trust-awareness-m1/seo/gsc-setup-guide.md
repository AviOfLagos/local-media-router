# Google Search Console Setup Guide for Mottars.com

**Task**: TASK-C-005 | **Priority**: Critical | **Prepared by**: Chidi (SEO Specialist)
**Date**: 2026-03-07 | **For**: CEO / Site Owner
**Estimated Time**: 30-45 minutes

---

## Table of Contents

1. [Overview & Why This Matters](#1-overview--why-this-matters)
2. [Prerequisites](#2-prerequisites)
3. [Step 1: Add mottars.com as a Property](#step-1)
4. [Step 2: Verify Domain Ownership](#step-2)
5. [Step 3: Add www.mottars.com as a Property](#step-3)
6. [Step 4: Set Preferred Domain](#step-4)
7. [Step 5: Submit the Corrected Sitemap](#step-5)
8. [Step 6: Check for Manual Actions & Security Issues](#step-6)
9. [Step 7: Set Up Email Notifications](#step-7)
10. [Step 8: Verify robots.txt Accessibility](#step-8)
11. [Step 9: Check Current Indexing Status](#step-9)
12. [Troubleshooting](#troubleshooting)
13. [Success Checklist](#success-checklist)

---

## 1. Overview & Why This Matters

Google Search Console (GSC) is the primary tool for monitoring how Google sees mottars.com. Right now, our sitemap references the wrong domain (mottars.ng), which means Google cannot index any of our pages properly. Our current SEO score is 38/100.

**What we need to accomplish today:**
- Verify that Google recognizes us as the owner of mottars.com
- Submit our corrected sitemap so Google can discover and index all pages
- Check for any penalties or security warnings
- Set up monitoring so we catch future problems early

---

## 2. Prerequisites

Before you begin, make sure you have:

- [ ] Access to the Google account associated with mottars.com (the one used for Google Analytics, Google Ads, etc.)
- [ ] Access to your domain registrar (where mottars.com DNS is managed -- e.g., Namecheap, GoDaddy, Cloudflare)
- [ ] Access to your hosting panel or deployment dashboard (e.g., Vercel, Netlify, or your server)
- [ ] The corrected sitemap has been deployed to `https://mottars.com/sitemap.xml` (coordinate with Femi/developer -- see TASK-C-001 brief)
- [ ] A desktop browser (Chrome recommended)

**Important**: If the corrected sitemap has NOT yet been deployed to the live site, you can still complete Steps 1-4 and Steps 6-9. Come back to Step 5 once the developer has deployed the sitemap fix.

---

## Step 1: Add mottars.com as a Property {#step-1}

### 1.1 Open Google Search Console

1. Go to: **https://search.google.com/search-console**
2. Sign in with the Google account associated with mottars.com
3. If this is your first time, you will see a welcome screen. If you already have properties, click the property dropdown in the top-left corner.

### 1.2 Add a New Property

1. Click the **property dropdown** (top-left corner, shows current property name or "Select property")
2. Click **"+ Add property"**
3. You will see two options:

   | Option | Description | Recommended? |
   |--------|-------------|--------------|
   | **Domain** | Covers ALL subdomains and protocols (http, https, www, non-www) | **YES -- Use this one** |
   | **URL prefix** | Covers only the exact URL pattern you enter | Backup option |

4. **Select "Domain"** on the left panel
5. Enter: `mottars.com` (no https://, no www)
6. Click **"CONTINUE"**

> **What you should see**: A popup asking you to verify ownership via DNS TXT record.

### 1.3 Why Domain-Level Property?

A Domain property automatically covers:
- `https://mottars.com`
- `https://www.mottars.com`
- `http://mottars.com`
- `http://www.mottars.com`

This means you do NOT need to add each variation separately when using this method.

---

## Step 2: Verify Domain Ownership {#step-2}

Google needs proof that you own mottars.com. Below are ALL available verification methods, ordered from most recommended to least. **You only need ONE method to succeed.**

---

### Method A: DNS TXT Record (RECOMMENDED)

This is the most reliable method and works for Domain-type properties.

**Where to do this**: Your domain registrar's DNS management panel (e.g., Namecheap, GoDaddy, Cloudflare, Route53).

1. After clicking "Continue" in Step 1, Google will display a TXT record value. It looks like:
   ```
   google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
2. **Copy this entire string** (click the copy icon next to it)
3. Open a new browser tab and log into your **domain registrar** (wherever mottars.com DNS is managed)
4. Navigate to **DNS Management** or **DNS Records** for mottars.com
5. Add a new DNS record with these settings:

   | Field | Value |
   |-------|-------|
   | **Type** | TXT |
   | **Host / Name** | `@` (or leave blank, depending on your registrar) |
   | **Value / Content** | Paste the google-site-verification string |
   | **TTL** | 3600 (or "Auto") |

6. **Save** the DNS record
7. Go back to Google Search Console
8. Click **"VERIFY"**

> **Note**: DNS changes can take 5 minutes to 48 hours to propagate. If verification fails, wait 15-30 minutes and try again. Do NOT delete the TXT record -- leave it permanently.

**What success looks like**: A green checkmark with "Ownership verified" message. You will be taken to the GSC dashboard for mottars.com.

---

### Method B: HTML File Upload (Backup Option)

This method works for URL-prefix properties only. Use this if you cannot access DNS settings.

1. If you chose "URL prefix" property type, enter: `https://mottars.com`
2. Click **"CONTINUE"**
3. Expand the **"HTML file"** verification section
4. Download the HTML verification file (named something like `google1234567890abcdef.html`)
5. Upload this file to the **root directory** of your website (the `/public` folder in Next.js)
6. The file must be accessible at: `https://mottars.com/google1234567890abcdef.html`
7. Verify you can access it by visiting that URL in your browser -- you should see a page with a verification code
8. Go back to GSC and click **"VERIFY"**

**Developer action needed**: Ask your developer to place the file in `/public/` directory and deploy.

---

### Method C: HTML Meta Tag (Backup Option)

This method works for URL-prefix properties only.

1. In the verification options, expand **"HTML tag"**
2. Google will give you a meta tag like:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXX" />
   ```
3. Copy this tag
4. Ask your developer to add it to the `<head>` section of your website's main layout

   **In Next.js (App Router)**, this goes in `app/layout.tsx`:
   ```tsx
   export const metadata = {
     verification: {
       google: 'XXXXXXXXXXXX',
     },
   };
   ```

   **In Next.js (Pages Router)**, this goes in `pages/_document.tsx` inside `<Head>`:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXX" />
   ```

5. Deploy the change
6. Go back to GSC and click **"VERIFY"**

---

### Method D: Google Analytics (Backup Option)

This works if Google Analytics 4 is already installed on mottars.com using the same Google account.

1. In the verification options, expand **"Google Analytics"**
2. If GA4 is set up with the same Google account, click **"VERIFY"**
3. Google will check for the GA tracking snippet in your page source

**Requirement**: The GA4 tracking code must be in the `<head>` section (not loaded asynchronously via tag manager in the body).

---

### Method E: Google Tag Manager (Backup Option)

This works if Google Tag Manager is installed on mottars.com using the same Google account.

1. In the verification options, expand **"Google Tag Manager"**
2. If GTM is set up with the same Google account, click **"VERIFY"**
3. Google will check for the GTM container snippet

**Requirement**: The GTM snippet must be placed immediately after the opening `<body>` tag.

---

### Verification Troubleshooting

| Problem | Solution |
|---------|----------|
| DNS verification fails | Wait 30 min, try again. Check the TXT record is on `@` host, not a subdomain |
| HTML file returns 404 | Ensure the file is in `/public/` and has been deployed |
| Meta tag not found | View page source (Ctrl+U) and search for "google-site-verification" |
| GA verification fails | Confirm GA uses the same Google account, and tracking code is in `<head>` |
| "Could not verify" error | Clear browser cache, try a different verification method |

---

## Step 3: Add www.mottars.com as a Property {#step-3}

**Skip this step if you used the Domain-level property type in Step 1** -- it already covers both www and non-www.

If you used URL-prefix properties, you need to add both variants:

1. Go to the property dropdown (top-left)
2. Click **"+ Add property"**
3. Select **"URL prefix"**
4. Enter: `https://www.mottars.com`
5. Click **"CONTINUE"**
6. Verify using any of the methods from Step 2

**What success looks like**: Both `https://mottars.com` and `https://www.mottars.com` appear in your property dropdown.

---

## Step 4: Set Preferred Domain {#step-4}

Google needs to know which version of your URL is the "official" one. Based on how mottars.com currently works (non-www redirects to www with a 307), the preferred domain should be `https://www.mottars.com`.

### 4.1 How to Set This

Google no longer has an explicit "preferred domain" setting in GSC. Instead, it relies on:

1. **Canonical tags** on your pages (highest priority)
2. **Redirects** (301 from non-www to www)
3. **Sitemap URLs** (which domain the sitemap uses)

**Action items for the developer** (covered in separate briefs):

- [ ] Ensure ALL pages have `<link rel="canonical" href="https://www.mottars.com/..." />` tags
- [ ] Change the non-www to www redirect from 307 (temporary) to **301 (permanent)**
- [ ] Ensure the sitemap uses `https://mottars.com` consistently (our corrected sitemap does this)

### 4.2 Verify in GSC

After the developer makes these changes:

1. In GSC, go to **Settings** (gear icon, bottom-left)
2. Look for "Crawling" section
3. Check the "Main crawling address" -- it should show your preferred domain

> **Note about our sitemap**: Our corrected sitemap uses `https://mottars.com` (non-www). Once canonical tags and 301 redirects are in place pointing to `https://www.mottars.com`, Google will follow the canonical. For now, the sitemap using non-www is acceptable as long as that URL resolves (which it does).

---

## Step 5: Submit the Corrected Sitemap {#step-5}

**IMPORTANT**: Only do this step AFTER the developer has deployed the corrected sitemap to the live site. The sitemap at `https://mottars.com/sitemap.xml` must contain `mottars.com` URLs, NOT `mottars.ng` URLs.

### 5.1 Verify the Sitemap Is Live

Before submitting, check that the corrected sitemap is accessible:

1. Open a new browser tab
2. Go to: **https://mottars.com/sitemap.xml**
3. Verify that:
   - [ ] The page loads (no 404 error)
   - [ ] All URLs start with `https://mottars.com/` (NOT `https://mottars.ng/`)
   - [ ] There are no XML errors (the browser should render it as structured XML)
   - [ ] `/login` and `/register` are NOT in the sitemap
   - [ ] Blog URLs are present (look for `/blog/best-cars-for-nigerian-roads...`)
   - [ ] Image URLs use `&amp;` not bare `&` in query parameters

### 5.2 Remove Old Sitemap (If Any)

1. In GSC, select your **mottars.com** property
2. In the left sidebar, click **"Sitemaps"**
3. If there is an existing sitemap submitted (possibly with mottars.ng URLs or showing errors):
   - Click on the existing sitemap URL
   - Click the **three-dot menu** (top-right)
   - Click **"Remove sitemap"**
   - Confirm removal

### 5.3 Submit the New Sitemap

1. In the **Sitemaps** section, find the text field labeled "Add a new sitemap"
2. Enter: `sitemap.xml`
   - The full URL will show as: `https://mottars.com/sitemap.xml`
3. Click **"SUBMIT"**

### 5.4 Verify Submission

After submitting, you should see:

| Field | Expected Value |
|-------|---------------|
| **Status** | "Success" (may take a few minutes; initially shows "Pending") |
| **Type** | Sitemap |
| **Discovered URLs** | ~85-90 (approximately matching the number of `<url>` entries in the XML) |
| **Last read** | Today's date |

> **Note**: If status shows "Couldn't fetch" or "Has errors", check that the sitemap URL is accessible and valid XML. See Troubleshooting section.

**What success looks like**: Status shows "Success" and the number of discovered URLs is approximately 85-90 (matching the corrected sitemap). No errors.

---

## Step 6: Check for Manual Actions & Security Issues {#step-6}

Manual actions are penalties Google applies when a human reviewer finds that your site violates Google's guidelines. Security issues are problems like malware or hacking.

### 6.1 Check Manual Actions

1. In GSC left sidebar, click **"Security & Manual Actions"**
2. Click **"Manual actions"**

**What you want to see**: A green checkmark with the message "No issues detected."

If there ARE manual actions listed:
- Document the exact issue name and affected pages
- Report immediately to the marketing team
- DO NOT attempt to fix without understanding the root cause
- Submit a reconsideration request only after fixing the issue

### 6.2 Check Security Issues

1. Still under **"Security & Manual Actions"**
2. Click **"Security issues"**

**What you want to see**: A green checkmark with "No issues detected."

If there ARE security issues:
- This is an EMERGENCY -- notify the developer immediately
- Common issues: malware, phishing pages, hacked content
- The site may need to be taken offline temporarily for cleanup

---

## Step 7: Set Up Email Notifications {#step-7}

GSC can email you when it detects new problems with your site.

### 7.1 Enable Notifications

1. In GSC, click the **bell icon** (top-right corner) or go to **Settings**
2. Click **"Search Console preferences"** (or look for "Email preferences")
3. Ensure these are checked/enabled:
   - [ ] **Coverage issues**: Alerts when pages can't be indexed
   - [ ] **Search performance**: Monthly performance summaries
   - [ ] **Enhancement issues**: Problems with structured data, mobile usability
   - [ ] **Security issues**: Critical -- always keep this on

### 7.2 Add Additional Users (Optional)

If the marketing team or developer needs access:

1. Go to **Settings** (gear icon, bottom-left sidebar)
2. Click **"Users and permissions"**
3. Click **"ADD USER"**
4. Enter their Google email address
5. Set permission level:
   - **Owner**: Full access + can add/remove users (for CEO only)
   - **Full**: Can see all data and take most actions (for developer/Femi)
   - **Restricted**: Can view most data but can't take actions (for marketing team)
6. Click **"ADD"**

**Recommended users to add:**
- Developer (Femi) -- Full access
- Marketing lead -- Restricted access

---

## Step 8: Verify robots.txt Accessibility {#step-8}

The robots.txt file tells Google which pages it can and cannot crawl.

### 8.1 Check robots.txt in Browser

1. Open a new tab
2. Go to: **https://mottars.com/robots.txt**
3. You should see a text file. Verify it contains something like:

   ```
   User-agent: *
   Allow: /
   Sitemap: https://mottars.com/sitemap.xml
   ```

4. Confirm:
   - [ ] The file loads (no 404)
   - [ ] It does NOT contain `Disallow: /` (which would block everything)
   - [ ] The Sitemap line points to the correct URL (`mottars.com`, NOT `mottars.ng`)
   - [ ] Important pages like `/cars`, `/blog`, `/partners` are NOT disallowed

### 8.2 Test in GSC (robots.txt Tester)

1. In GSC, you can use the URL Inspection tool to test how Google sees your robots.txt
2. Go to **Settings** > **Crawling** > look for robots.txt information
3. Verify the last fetch date and that Google can access it

> **If robots.txt is missing**: This is okay -- Google will crawl everything by default. But it is better to have one. Ask the developer to create `/public/robots.txt` in the Next.js project.

> **If robots.txt blocks the sitemap or important pages**: This needs an immediate fix. Report to the developer.

---

## Step 9: Check Current Indexing Status {#step-9}

### 9.1 Pages Report

1. In GSC left sidebar, click **"Pages"** (under "Indexing")
2. Review the summary:

   | Metric | What to Look For |
   |--------|-----------------|
   | **Indexed pages** | How many pages Google has indexed. Should grow after sitemap submission. |
   | **Not indexed** | Pages Google found but chose not to index. Check reasons. |

3. Click on "Not indexed" to see the reasons. Common issues:
   - "Discovered - currently not indexed" = Google found it but hasn't crawled it yet
   - "Crawled - currently not indexed" = Google crawled it but didn't find it worth indexing
   - "Page with redirect" = Expected for non-www to www redirects
   - "Not found (404)" = Broken page, needs fixing
   - "Blocked by robots.txt" = robots.txt is preventing crawling

### 9.2 Inspect Key URLs

Test these critical URLs using the URL Inspection tool:

1. In the top search bar of GSC, paste each URL and press Enter:

   ```
   https://mottars.com
   https://mottars.com/cars
   https://mottars.com/blog
   https://mottars.com/blog/best-cars-for-nigerian-roads-top-reliable-vehicles-in-2025
   https://mottars.com/rentals
   ```

2. For each URL, check:
   - [ ] **"URL is on Google"** = indexed and appearing in search (ideal)
   - [ ] **"URL is not on Google"** = not indexed (click "Request Indexing" to ask Google to crawl it)
   - [ ] **Canonical URL**: Should match the URL you entered (or the www version)
   - [ ] **Last crawl**: Shows when Google last visited the page
   - [ ] **Crawl allowed?**: Should be "Yes"
   - [ ] **Indexing allowed?**: Should be "Yes"
   - [ ] **Mobile usability**: Should show no issues

3. If a URL is "not on Google", click **"REQUEST INDEXING"**
   - You can request indexing for ~10-15 URLs per day
   - Priority order for indexing requests:
     1. Homepage (`https://mottars.com`)
     2. Cars listing (`https://mottars.com/cars`)
     3. Blog index (`https://mottars.com/blog`)
     4. Top blog posts (start with the car buying guides)
     5. Rentals page

### 9.3 Document Current State

Record these numbers for baseline tracking:

| Metric | Value (fill in) | Date |
|--------|-----------------|------|
| Total indexed pages | ___ | 2026-03-07 |
| Total not-indexed pages | ___ | 2026-03-07 |
| Sitemap status | ___ | 2026-03-07 |
| Manual actions | ___ | 2026-03-07 |
| Security issues | ___ | 2026-03-07 |
| Homepage indexed? | ___ | 2026-03-07 |
| /cars indexed? | ___ | 2026-03-07 |
| /blog indexed? | ___ | 2026-03-07 |

Send these numbers to the marketing team (Chidi/Ife) so we can track improvement over time.

---

## Troubleshooting

### "Couldn't fetch" sitemap error
- Visit `https://mottars.com/sitemap.xml` in your browser. If it 404s, the developer needs to deploy.
- Check robots.txt is not blocking the sitemap.
- If the site uses Cloudflare or similar CDN, make sure the sitemap is not cached with old content. Purge the cache.

### DNS verification keeps failing
- Wait at least 30 minutes after adding the TXT record.
- Use a DNS checker tool to verify propagation: go to `https://toolbox.googleapps.com/apps/dig/#TXT/mottars.com` and look for your verification string.
- Make sure the TXT record is on the root domain (`@`), not a subdomain.
- Some registrars require you to omit the domain name from the Host field (use `@` or leave blank).

### "URL is not on Google" for all pages
- This is expected if this is the first time setting up GSC and submitting a sitemap.
- After submitting the sitemap, it can take 3-7 days for Google to start indexing pages.
- Use "Request Indexing" on the 5-10 most important pages to speed things up.

### Sitemap shows "Has errors"
- Click on the sitemap URL in GSC to see specific errors.
- Common causes: invalid XML encoding (bare `&` instead of `&amp;`), unreachable URLs, URLs returning 404/500.
- Cross-reference with our corrected sitemap to ensure all encoding fixes were applied.

### Redirect warning (307 vs 301)
- GSC may flag 307 redirects. This is a known issue -- the developer needs to change non-www to www redirect from 307 to 301 (covered in TASK-C-002).

---

## Success Checklist

After completing all steps, verify:

- [ ] mottars.com is verified in Google Search Console (green checkmark on property)
- [ ] Corrected sitemap submitted with "Success" status
- [ ] No manual actions detected
- [ ] No security issues detected
- [ ] Email notifications enabled for coverage and security issues
- [ ] robots.txt is accessible and not blocking important pages
- [ ] Homepage, /cars, and /blog have been inspected and "Request Indexing" submitted
- [ ] Baseline indexing numbers recorded and sent to marketing team
- [ ] Developer/Femi added as a Full-access user

---

## Next Steps After This Guide

1. **Check back in 3-5 days**: Revisit GSC to see if pages are starting to get indexed
2. **Monitor weekly**: Check the Pages report and Coverage report for new errors
3. **After sitemap deployment**: Immediately submit the new sitemap (Step 5)
4. **Performance tracking**: After 2-4 weeks, check the Performance report for first impressions and clicks data

---

*Generated by Chidi (SEO Specialist) | TASK-C-005 | 2026-03-07*
*Reference: marketing/research/ACTION-PLAN.md, marketing/research/mottars-corrected-sitemap.xml*
