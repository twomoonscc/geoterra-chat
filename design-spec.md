 DESIGN SPEC: GeoTerra Chat — Full Application UI
                                                                                
  Design Intent
                                                                                
  GeoTerra Chat is a split-pane geospatial intelligence interface pairing a     
  conversational AI assistant with an interactive map canvas. Users speak in
  natural language — "show me all properties within 5km of this point,"         
  "highlight flood risk zones" — and the map responds in real time. The       
  experience should feel like professional-grade tooling with the
  approachability of a chat interface: precise, calm, confident, and quietly
  powerful.

  ---
  Layout
        
  Structure: Full-viewport two-pane horizontal split.
                                                                                
  +-----------------------------------------------+
  |  Header Bar (48px)                             |                            
  +----------------+------------------------------+                             
  |                |                                |
  |  Chat Panel    |  Map Canvas                    |                           
  |  (400px)       |  (flex: 1)                     |                         
  |                |                                |                           
  |  [Composer]    |  [Zoom] [Layers] [Coords]      |                         
  +----------------+------------------------------+                             
                                                                              
  Breakpoints:                                                                  
  - Mobile (< 640px): Single-pane, map full screen. Floating chat button      
  bottom-right slides up an 80vh bottom sheet.                                  
  - Tablet (640–1024px): Split-pane, chat panel 320px. Layer drawer floats over
  map.                                                                          
  - Desktop (> 1024px): Full split-pane, chat panel 400px, layer drawer 280px   
  slides in from right.
                                                                                
  ---                                                                         
  Visual Design                                                                 
                                                                              
  Color Palette (dark-mode first):
                                                                                
  ┌─────────────────────┬─────────┬─────────────────────────────────────────┐
  │        Role         │  Value  │                  Usage                  │   
  ├─────────────────────┼─────────┼─────────────────────────────────────────┤ 
  │ Background (base)   │ #09090B │ App shell, chat panel                   │
  ├─────────────────────┼─────────┼─────────────────────────────────────────┤
  │ Background          │ #18181B │ Cards, composer                         │   
  │ (elevated)          │         │                                         │
  ├─────────────────────┼─────────┼─────────────────────────────────────────┤   
  │ Background (subtle) │ #27272A │ Input fields, hover states              │ 
  ├─────────────────────┼─────────┼─────────────────────────────────────────┤
  │ Border              │ #27272A │ Panel dividers, card borders            │   
  ├─────────────────────┼─────────┼─────────────────────────────────────────┤
  │ Text (primary)      │ #FAFAFA │ Headings, body                          │   
  ├─────────────────────┼─────────┼─────────────────────────────────────────┤ 
  │ Text (secondary)    │ #A1A1AA │ Labels, timestamps                      │   
  ├─────────────────────┼─────────┼─────────────────────────────────────────┤ 
  │ Text (disabled)     │ #52525B │ Inactive elements                       │   
  ├─────────────────────┼─────────┼─────────────────────────────────────────┤
  │ Brand / Primary     │ #3B82F6 │ Send button, links, focus rings, map    │   
  │                     │         │ highlights                              │ 
  ├─────────────────────┼─────────┼─────────────────────────────────────────┤   
  │ AI accent           │ #8B5CF6 │ AI avatar ring, thinking indicator      │ 
  ├─────────────────────┼─────────┼─────────────────────────────────────────┤   
  │ Success             │ #22C55E │ Connected status                        │
  ├─────────────────────┼─────────┼─────────────────────────────────────────┤   
  │ Warning             │ #F59E0B │ Caution states                          │ 
  ├─────────────────────┼─────────┼─────────────────────────────────────────┤   
  │ Error               │ #EF4444 │ Failure states                          │
  └─────────────────────┴─────────┴─────────────────────────────────────────┘   
                                                                              
  Typography (Geist / Geist Mono — already in project):                         
   
  ┌───────────┬──────┬────────┬─────────────┬────────────────┐                  
  │   Level   │ Size │ Weight │ Line Height │ Letter Spacing │                
  ├───────────┼──────┼────────┼─────────────┼────────────────┤                  
  │ Display   │ 24px │ 600    │ 32px        │ -0.025em       │
  ├───────────┼──────┼────────┼─────────────┼────────────────┤                  
  │ Heading 2 │ 14px │ 600    │ 20px        │ -0.01em        │                  
  ├───────────┼──────┼────────┼─────────────┼────────────────┤                  
  │ Body      │ 14px │ 400    │ 22px        │ 0              │                  
  ├───────────┼──────┼────────┼─────────────┼────────────────┤                  
  │ Caption   │ 12px │ 400    │ 16px        │ 0.01em         │                
  ├───────────┼──────┼────────┼─────────────┼────────────────┤                  
  │ Label     │ 12px │ 500    │ 16px        │ 0.02em         │
  ├───────────┼──────┼────────┼─────────────┼────────────────┤                  
  │ Mono      │ 13px │ 400    │ 20px        │ 0              │                
  └───────────┴──────┴────────┴─────────────┴────────────────┘                  
   
  Border Radius: Cards/panels: 8px · Chat bubbles: 12px · Pills/badges: 9999px ·
   Tooltips: 6px                                                              
                                                                                
  ---                                                                         
  Key Component Specifications
                              
  Composer
                                                                                
  - Auto-growing textarea (min 56px, max 160px)                                 
  - Send button: 32×32px circle — disabled gray (#27272A) when empty, blue      
  (#3B82F6) with input                                                          
  - Placeholder: "Ask about your geospatial data..." in #52525B               
  - Enter sends, Shift+Enter newlines                                           
  - Focused state: top border brightens to #3B82F6                              
                                                                                
  AI Message                                                                    
                                                                              
  - Transparent background (no bubble) with 24px avatar (violet-to-blue gradient
   ring)                                                                      
  - Thinking state: 3 animated dots in #8B5CF6, 150ms stagger                   
  - Streaming state: blinking cursor (#3B82F6, 530ms interval) at end of text   
  - Map action badge: "Updated map view" / "Added 3 layers"                     
                                                                                
  Data Cards (inline in AI responses)                                           
                                                                                
  - Table: 5 rows visible, scrollable, mono font for values                     
  - Stat: 32px number, caption label, optional trend indicator                
  - Feature Detail: Key-value list, coordinate values in mono, "View on map"    
  button                                                                        
  - Skeleton loading: shimmer animation with #27272A bars                       
                                                                                
  Map Controls                                                                
                                                                                
  - Zoom +/−: 36×36px stacked, translucent backdrop-blur backgrounds            
  - Coordinate readout: bottom-left, mono 12px, #A1A1AA
  - Layer toggle: opens 280px drawer from right edge                            
                                                                                
  Command Palette (Cmd+K)                                                       
                                                                                
  - 480px wide, centered, backdrop overlay                                      
  - Groups: Recent Queries / Available Layers / Actions
  - Selected item: #3B82F6 at 15% background + 2px left border                  
                                                                                
  ---                                                                           
  Motion                                                                        
                                                                              
  ┌────────────────┬──────────────────┬───────────┬────────────────────────┐
  │  Interaction   │       Type       │ Duration  │         Easing         │
  ├────────────────┼──────────────────┼───────────┼────────────────────────┤
  │ Chat message   │ fade + slide up  │ 200ms     │ ease-out               │
  │ appear         │ 8px              │           │                        │
  ├────────────────┼──────────────────┼───────────┼────────────────────────┤    
  │ AI thinking    │ sequential       │ 600ms     │ ease-in-out            │    
  │ dots           │ opacity pulse    │ cycle     │                        │    
  ├────────────────┼──────────────────┼───────────┼────────────────────────┤    
  │ Map fly-to     │ native fly       │ 1200ms    │ ease-in-out            │  
  │                │ animation        │           │                        │    
  ├────────────────┼──────────────────┼───────────┼────────────────────────┤
  │ Layer drawer   │ slide in from    │ 250ms     │ cubic-bezier(0.16, 1,  │    
  │ open           │ right            │           │ 0.3, 1)                │  
  ├────────────────┼──────────────────┼───────────┼────────────────────────┤    
  │ Command        │ fade + scale     │ 150ms     │ ease-out               │  
  │ palette open   │ from 97%         │           │                        │    
  ├────────────────┼──────────────────┼───────────┼────────────────────────┤
  │ Skeleton       │ horizontal       │ 1500ms    │ linear, infinite       │    
  │ shimmer        │ gradient sweep   │           │                        │    
  └────────────────┴──────────────────┴───────────┴────────────────────────┘
                                                                                
  Reduced motion: All transitions become 150ms opacity fades. Map fly-to becomes
   instant jump. Thinking dots become static "...". No translate/scale
  transforms.                                                                   
                                                                              
  ---
  CSS Custom Properties

  :root {
    --gt-bg-base: #09090B;
    --gt-bg-elevated: #18181B;
    --gt-bg-subtle: #27272A;                                                    
    --gt-border: #27272A;
    --gt-text-primary: #FAFAFA;                                                 
    --gt-text-secondary: #A1A1AA;                                             
    --gt-text-disabled: #52525B;                                                
    --gt-brand: #3B82F6;
    --gt-ai-accent: #8B5CF6;                                                    
    --gt-success: #22C55E;                                                    
    --gt-error: #EF4444;                                                        
    --gt-chat-width: 400px;
    --gt-header-height: 48px;                                                   
  }                                                                           

  ---
  Build Order
                                                                                
  1. Layout Shell — split-pane with header
  2. Chat Panel + Composer — message thread, empty state, suggestion chips      
  3. Message Components — user bubble, AI message, thinking indicator           
  4. Map Canvas — integrate react-map-gl or react-leaflet, zoom controls,
  coordinate readout                                                            
  5. Data Cards — TableCard, StatCard, FeatureCard                            
  6. Layer Drawer — slide-in, toggles, opacity slider                           
  7. Feature Popup — click-triggered property panel                             
  8. Command Palette — Cmd+K overlay
  9. Mobile adaptations — bottom sheet, FAB, responsive breakpoints             
                                                                              
  ---                                                                           
  Aesthetic Direction                                                         
                     
  Dark, precise, cartographic. Feels like mission control for spatial data —
  high contrast, information-dense where needed, breathing room elsewhere. Draw 
  from Linear (density without clutter, dark mode execution), Mapbox Studio
  (map-as-hero split pane, layer management), and Vercel v0 (chat streaming UX, 
  structured AI output cards).                                                

  Avoid: Gradients on UI chrome · Rounded-everything aesthetic · Colored chat   
  panel backgrounds · Map control clutter · Heavy borders · Decorative patterns
  on surfaces                                                                   
                