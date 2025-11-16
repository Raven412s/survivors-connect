# Resources Page Structure Overview

## Page Layout Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                     HERO SECTION                            │
│  "Resources & Knowledge Hub"                                │
│  Comprehensive collection of resources, knowledge products  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│        ORGANIZATIONAL WEBSITES (3 cards - 3 columns)        │
├─────────────────────────────────────────────────────────────┤
│  🌐 Jan Mitra Nyas  │  🌐 PVCHR.asia  │  🌐 Connect+       │
│  Description...     │  Description... │  Description...    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│     KNOWLEDGE & LEARNING RESOURCES (2 cards - 2 columns)    │
├─────────────────────────────────────────────────────────────┤
│  📄 PVCHR Blog      │  📖 Testimonial Healing Blog          │
│  Description...     │  Description...                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│     MULTIMEDIA RESOURCES (2 cards - 2 columns)              │
├─────────────────────────────────────────────────────────────┤
│  ▶️  YouTube Channel │  🎵 Audio Resources                  │
│  Description...     │  Description...                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│         REPORTS & DOCUMENTATION (2 cards - 2 columns)       │
├─────────────────────────────────────────────────────────────┤
│  📋 Comprehensive Report │  📁 Annual Reports Archive       │
│  Description...         │  Description...                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│           REFERENCE RESOURCES (1 card - full width)         │
├─────────────────────────────────────────────────────────────┤
│  🔗 Wikipedia Entry (Verified)                              │
│  Description...                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│      SUPPORT RESOURCE CATEGORIES (3 cards - 3 columns)      │
├─────────────────────────────────────────────────────────────┤
│  ❤️  Mental Health   │  ⚖️  Legal & Advocacy  │  📚 Research│
│  Support Links      │  Support Links         │  Links       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│    SOCIAL MEDIA CONNECTIONS (3 cards - 3 columns)           │
├─────────────────────────────────────────────────────────────┤
│  👥 Facebook        │  𝕏 Twitter             │  📷 Instagram │
│  Description...     │  Description...        │  Description..│
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              QUICK COPY LINKS (4 items)                     │
│  [Survivor Connect] [Copy] │  [Jan Mitra Nyas] [Copy]       │
│  [PVCHR] [Copy]            │  [Connect+ Platform] [Copy]    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    CTA SECTION                              │
│  "Ready to Take Action?"                                    │
│  [Contact Us] [Get Involved]                                │
└─────────────────────────────────────────────────────────────┘
```

## Resource Cards Design

Each resource card features:
```
┌────────────────────────────────────┐
│ [ICON]  [CATEGORY BADGE]           │
│                                    │
│ Resource Name                      │
│                                    │
│ Short description of the resource  │
│ and what you'll find there.        │
│                                    │
│ On hover: "Visit" link appears     │
└────────────────────────────────────┘
```

## Color Coding by Type

- **Organizational Websites**: Primary color
- **Knowledge & Blogs**: Blue
- **Multimedia**: Red  
- **Reports**: Purple
- **Reference**: Green
- **Support Categories**: Primary color with custom icons
- **Social Media**: Primary color

## Responsive Breakpoints

### Mobile (< 768px)
- All sections: 1 column
- Full width cards with padding
- Touch-friendly spacing

### Tablet (768px - 1024px)
- Most sections: 2 columns
- Organizational websites: 2 columns
- Social media: 2-3 columns
- Increased spacing

### Desktop (> 1024px)
- Organizational websites: 3 columns
- Knowledge & Multimedia: 2 columns
- Support categories: 3 columns
- Social media: 3 columns
- Reference: Full width

## Interactive Elements

### Hover States
- Card border changes to primary color
- Card shadow increases for elevation effect
- Background tints slightly with primary color
- Icon scales up (110%)
- Link text appears/reveals

### Click Actions
- External links open in new tab
- Internal navigation links follow normal routing
- Copy buttons provide visual feedback (✓ Copied)
- Feedback disappears after 2 seconds

## Accessibility Features

✓ Semantic HTML structure (section, h2, h3, a tags)
✓ ARIA labels on icon buttons
✓ Keyboard navigation support
✓ High contrast ratios for text
✓ Screen reader friendly descriptions
✓ Proper heading hierarchy
✓ Focus visible states for keyboard navigation

## Performance Considerations

- Static site generation compatible
- No unnecessary re-renders
- Simple state management (copy feedback only)
- Optimized images/icons
- Fast link loading
- Lazy loading support for images if added

## SEO Structure

```
<html>
  <head>
    <title>Resources | Survivor Connect</title>
    <meta name="description" content="...">
    <meta property="og:title" content="...">
    <meta property="og:description" content="...">
  </head>
  <body>
    <h1>Resources & Knowledge Hub</h1>
    
    <h2>Organizational Websites</h2>
    <div class="grid">
      <article>
        <h3>Jan Mitra Nyas</h3>
        <p>Description...</p>
        <a href="">Visit →</a>
      </article>
      ...
    </div>
    ...
  </body>
</html>
```

## Content Organization Strategy

### By Type
1. Primary organizational websites
2. Knowledge and learning materials
3. Multimedia content
4. Official documentation
5. Third-party verification
6. Support services
7. Social engagement
8. Quick sharing options

### By Accessibility
- Most important resources first (organizational sites)
- Multiple ways to access same resources
- Quick copy option for easy sharing
- Internal navigation for deeper exploration

### By Purpose
- **Learn**: Blogs, articles, publications
- **Watch**: Videos, multimedia content
- **Read**: Reports, documentation
- **Engage**: Social media, contact
- **Help**: Support services, legal aid
