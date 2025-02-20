# Alma Takehome

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to submit the lead form.

Open [http://localhost:3000/admin](http://localhost:3000/admin) with username `admin` and password `ss` to review submissions.

## Design Decisions

### Leadform

- Used `jsonforms` for handling the personal details and visa interest
- Created custom renderer for resume upload
- Used textarea for long form, though a custom renderer might make sense if we plan to reuse this field in other forms
- Used `"use client"` leadform to prevent hydration errors, given more time I'd see if there's a way to improve performance
- Used default sans-serif font and tried to get sizing close, though the mockups show a different but similar font
- Leveraged material ui where it seemed practical to be consistent with `jsonforms` rendering
- Created mock `/leads` endpoint to POST and log form results

### Admin

- Limited table results to 8 as was seen in the mock
- Included search by name
- Added filtering by status
- Added pagination
- Added sorting by column
- Used no material ui, opting for css and some inline styles

## Areas for Improvement

- Not all TypeScript types were implemented, this would be my #1 focus with more time
- The styling patterns I used were inconsistent: Material-UI, CSS modules, and in-line. I'd prefer to only use 2 of these patterns consistently
- Component logic could be broken out into smaller components but it was faster to iterate with larger components

### Leadform

- Initially I tried to use a single instance of `jsonforms` for all fields, but was having trouble adding the images and text between fields. I opted for using more than one instance, but developer experience would be better if we only had 1 instance
- Using TextArea for the long form is a bit inconsistent with the other `jsonforms` and would be more consistent as a custom renderer
- The mui input labels overlap slightly during editing

### Admin

- Basic authentication was a quick way create a protected route, however I would use token based authentication in production
- I created a mock data file, would be better to expose this from an API
- Navigation sidebar was styled to match the mock but there are no links or Settings page
- Username 'Admin' was hardcoded
- Depending on number of leads, it likely would make more sense to handle pagination through API calls for lead submissions
- Hard coding table length to 8 leads matched the mocked, but giving the user an option to change that would benefit users on a larger screen
