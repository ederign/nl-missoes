# Social Hub — New Life Church

Export of the Lovable site at https://socialhubnl.lovable.app/, adapted for static hosting on GitHub Pages. The site uses the church’s light palette and original artwork, grouped services, and verified external request forms.

## Development

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

## Publish

Push to `main` to build and deploy through GitHub Actions. In the repository Pages settings, select **GitHub Actions** as the source.

Planned Pages URL (not yet published): https://ederign.github.io/socialhubnl/

```sh
npm run build
npm run preview
```

Vite uses `/socialhubnl/` as the base path. Update `vite.config.ts` if the repository name or hosting path changes.

## Requests and registration

“Preciso de apoio social” opens the Airtable program intake form. “Preciso de itens para minha casa” opens the Google Form for donated household goods. Service cards, including legal assistance, use the church’s Airtable intake form. Household Goods uses the church’s Google Form for donated items. Service request buttons always open a church intake form, not an external provider website. Food Pantry stays with Airtable, where it is explicitly listed. Both open in a new tab. The original local-only form and its misleading success confirmation have been removed. This static site does not collect or store visitor submissions.

The 13 services are grouped into six support areas. A language selector switches the full page between Portuguese, English and Spanish and remembers the selection. External forms retain their own language settings.
