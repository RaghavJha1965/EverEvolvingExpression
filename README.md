# Ever Evolving Expression - Joel Woolhouse

A modern, responsive website for personal development coach Joel Woolhouse, featuring sessions, retreats, testimonials, and more.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, minimalist design with natural color palette
- **Multiple Pages**: Home, Sessions, Testimonials, Retreats, About, and Booking
- **Interactive Components**: Navigation, forms, and hover effects
- **TypeScript**: Full type safety throughout the application
- **Next.js 14**: Latest features with App Router

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd EverEvolvinExpression
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── sessions/          # Sessions page
│   ├── testimonials/      # Testimonials page
│   ├── retreats/          # Retreats page
│   ├── about/             # About page
│   └── book/              # Booking page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── RetreatsSection.tsx # Retreats showcase
│   ├── BlogSection.tsx    # Blog/content section
│   ├── SessionsSection.tsx # Services section
│   ├── AboutSection.tsx   # About section
│   └── TestimonialsSection.tsx # Testimonials
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies and scripts
```

## Customization

### Colors

The color palette is defined in `tailwind.config.js`:

- **Forest Green**: Primary brand color (#2d5a3d)
- **Sage**: Secondary color for accents
- **Lavender**: Background variations
- **Cream/Beige**: Warm background tones

### Content

Update the content in the respective component files:
- `components/Hero.tsx` - Main headline and description
- `components/RetreatsSection.tsx` - Retreat details
- `components/SessionsSection.tsx` - Service offerings
- `components/AboutSection.tsx` - Bio information
- `components/TestimonialsSection.tsx` - Client testimonials

### Images

Replace placeholder elements with actual images:
- Profile photos in About and Testimonials sections
- Hero section circular graphic
- Any additional imagery

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project:
```bash
npm run build
```

The static files will be in the `.next` directory, ready for deployment to any static hosting service.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for personal use. Please respect the original design and content.

## Contact

For questions or support, please contact the development team. 