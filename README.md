# 🐴🏮 Lunar New Year (Year of the Horse) RSVP App

A beautifully designed, mobile-optimized Lunar New Year celebration invitation and RSVP website with traditional Chinese temple gate opening animation and magnificent Year of the Horse theme.

## ✨ Features

- **Animated Chinese temple gate opening** - Guests are greeted with a traditional red and gold palace gate animation with red lanterns, galloping horses, and auspicious Chinese characters
- **Single RSVP link** - One link for all guests (no need for personalized invites)
- **Beautiful photo carousel** - Swipeable gallery with your celebration photos
- **Mobile-first responsive design** - Optimized for all devices
- **Seamless RSVP experience** - Name entry, adults/kids counters, and optional message
- **Public guest list** - Shows who's coming, who can't make it, and pending replies
- **Authentic Chinese New Year design** - Red and gold color scheme with traditional elements and bilingual (中文/English) text

## 🎨 Theme

This app celebrates the **Year of the Horse (马年)** with:
- Traditional red and gold color palette
- Chinese temple/palace gate animation
- Red lanterns with auspicious characters (福 - Fortune, 春 - Spring)
- Horse emojis and galloping animations
- Bilingual interface (Chinese and English)
- Traditional Chinese design elements

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd birthday
npm install
```

### 2. Set Up the Database

```bash
npx prisma db push
```

### 3. Customize Event Details

Edit `src/lib/config.ts`:

```typescript
export const eventConfig = {
  partyName: "马年新春庆典 Year of the Horse Celebration",
  childName: "恭喜发财",
  date: "Saturday, January 29, 2026",
  time: "6:00 PM – 10:00 PM",
  venueName: "Golden Dragon Pavilion",
  address: "888 Fortune Way, San Francisco, CA 94102",
  // ... more options
};
```

### 4. Add Your Photos

Drop your celebration photos in `public/photos/` and update `src/lib/config.ts`:

```typescript
photos: [
  "/photos/photo-1.png",
  "/photos/photo-2.png",
  "/photos/photo-3.png",
  "/photos/photo-4.png",
  "/photos/photo-5.png",
];
```

### 5. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 6. Share the RSVP Link

Send this single link to all your guests:

**🔗 http://localhost:3000/rsvp**

That's it! No need to generate individual links for each guest.

## 📱 Mobile Optimization

The app is **fully optimized for mobile devices** with:

- **Touch-optimized controls** (44px minimum touch targets)
- **Swipeable carousel** - Smooth touch gestures on mobile and desktop
- **Responsive text sizes** that scale beautifully on all screens
- **No accidental taps** (tap highlight removed)
- **Fast-loading images** with lazy loading
- **Adaptive layouts** that work on phones, tablets, and desktops

## 🏮 Chinese Temple Gate Opening Animation

When guests visit the RSVP link, they're greeted with a **traditional Chinese palace gate animation**:

- **3D temple gates** with red and gold colors that flip open smoothly (1.2 seconds)
- **Red lanterns** hanging from pillars with Chinese characters (福 and 春)
- **Golden door studs** in traditional pattern
- **Firecracker sparkles** burst as gates open
- **Welcome message** in Chinese and English
- **Galloping horse emojis** (🐴 🐎 🏇) for the Year of the Horse

**Smart behavior:**
- Plays once per session (3.5 seconds total)
- Uses `sessionStorage` to prevent repetition
- Skips animation on subsequent visits in the same browser session

## 🎯 How It Works

### For Guests:

1. Visit **http://localhost:3000/rsvp**
2. Watch the Chinese temple gate animation
3. Enter their name
4. Select "恭喜！We'll be there!" or "Can't make it"
5. If attending, set number of adults and kids
6. Optionally add a message (dietary restrictions or well wishes)
7. Click "发送回复 Send RSVP"

### For You (The Host):

1. Visit **http://localhost:3000** to see the public guest list
2. Visit **http://localhost:3000/admin** for the detailed admin dashboard with:
   - Summary stats (going, not going, pending, total adults, total kids)
   - Full RSVP table with names, status, counts, messages, and timestamps
   - Quick links to public page and RSVP page
3. Share the single RSVP link with everyone

## 📁 Project Structure

```
lny/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Optional: pre-add guest names
├── public/
│   └── photos/                # Your celebration photos
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage (public guest list)
│   │   ├── rsvp/
│   │   │   └── page.tsx       # RSVP page (single link for all)
│   │   ├── admin/
│   │   │   └── page.tsx       # Admin dashboard with detailed RSVP table
│   │   ├── api/
│   │   │   ├── invitees/      # GET all invitees
│   │   │   └── rsvp/          # POST RSVP responses
│   │   └── globals.css        # Global styles & Chinese New Year theme
│   ├── components/
│   │   ├── CastleGateOpening.tsx  # Chinese temple gate animation
│   │   ├── Carousel.tsx           # Photo carousel
│   │   ├── LocationBanner.tsx     # Date/time/location banner
│   │   ├── GuestList.tsx          # Guest list with horse emojis
│   │   └── WaveDivider.tsx        # Decorative wave SVG
│   └── lib/
│       ├── config.ts          # Event details (edit this!)
│       └── prisma.ts          # Database client
└── README.md
```

## 🛠️ Tech Stack

- **Next.js 16** (App Router) - React framework
- **Prisma 7** + **Neon** (Postgres) - Database ORM and hosted Postgres
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Embla Carousel** - Touch-optimized swipeable carousel
- **TypeScript** - Type safety

## 🎨 Design Customization

### Colors

The app uses a traditional Chinese New Year color palette. Edit `src/app/globals.css` to customize:

```css
@theme {
  --color-imperial-red: #DC143C;  /* Primary red */
  --color-golden: #FFD700;        /* Gold accent */
  --color-crimson: #8B0000;       /* Dark red */
  --color-lucky-gold: #FFA500;    /* Orange gold */
  --color-charcoal: #1a1a1a;      /* Text */
  --color-cream: #FFF8E7;         /* Background */
}
```

### Photos

The carousel is **fully swipeable**:
- **Desktop**: Click and drag left/right
- **Mobile**: Swipe with your finger
- **Both**: Click dots below to jump to any photo

## 🎯 Common Tasks

### Pre-add Guest Names (Optional)

If you want guests to see their names already in the system, edit `prisma/seed.ts`:

```typescript
const guests = [
  "张家",
  "李明 & 王芳",
  "陈家大小",
  // Add your guests here...
];
```

Then run:

```bash
npx prisma db seed
```

**Note:** This is optional. Guests can RSVP even if their names aren't pre-added.

### View All RSVPs

Visit the homepage at **http://localhost:3000** to see:
- Who's coming (with adult/kid counts)
- Who can't make it
- Who hasn't responded yet
- Total adult and kid counts

### Reset / seed the database

The app creates the table automatically. To add sample invitees:

```bash
cd birthday
DATABASE_URL="your-neon-url" npx prisma db seed
```

## 🎉 Tips for Success

1. **Test the RSVP flow** before sharing the link
2. **Share one link with everyone**: http://localhost:3000/rsvp
3. **Check on mobile** - most guests will RSVP from their phones
4. **Customize the photos** to match your celebration
5. **Update the config** with accurate date/time/location
6. **Encourage red attire** for good fortune and great photos!

## 🐴 Year of the Horse

The Horse is the seventh animal in the Chinese zodiac. People born in the Year of the Horse are believed to be:
- Energetic and active
- Warm-hearted and enthusiastic
- Independent and ambitious
- Strong-willed and confident

**马到成功** (Mǎ dào chéng gōng) - "Success arrives with the horse" - A traditional blessing for immediate success!

**万马奔腾** (Wàn mǎ bēn téng) - "Ten thousand horses galloping" - Symbolizing great momentum and vitality!

---

新年快乐 • Happy Lunar New Year! • 马年大吉 🐴🏮
