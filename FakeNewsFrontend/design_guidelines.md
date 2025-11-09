# Fake News Detector - Design Guidelines

## Design Approach
**System**: Custom professional approach inspired by analytical tools like Grammarly and data dashboards, prioritizing credibility, clarity, and functional efficiency. This is a utility-focused application where trust and accuracy visualization are paramount.

## Core Design Principles
1. **Credibility First**: Clean, professional interface that inspires user trust
2. **Result Clarity**: Unambiguous visualization of detection results
3. **Functional Efficiency**: Streamlined workflow from input to results
4. **Accessible Design**: Clear typography and intuitive interactions

## Typography
- **Primary Font**: Inter or Work Sans (Google Fonts) - modern, professional, highly readable
- **Headings**: 
  - H1: text-4xl md:text-5xl, font-bold (app title)
  - H2: text-2xl md:text-3xl, font-semibold (section headers)
  - H3: text-xl font-semibold (result labels)
- **Body Text**: text-base leading-relaxed (descriptions, instructions)
- **Labels**: text-sm font-medium uppercase tracking-wide (form labels, metadata)
- **Results**: text-lg md:text-xl font-medium (prediction output)

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16
- Component padding: p-6 to p-8
- Section spacing: space-y-8 to space-y-12
- Container max-width: max-w-4xl (centered, focused content area)
- Page padding: px-4 md:px-6 lg:px-8

## Page Structure

### Header
- Full-width with inner max-w-6xl container
- Logo/title on left, minimal navigation/info on right
- Height: h-16 md:h-20
- Border-bottom for separation
- Include tagline: "AI-Powered News Verification"

### Main Content Area (max-w-4xl, centered)

**Input Section** (primary focus area):
- Card-based container with rounded-xl borders
- Two-tab interface: "Text Input" and "Upload File"
- Tab styling: Clear active/inactive states, border-b-2 on active
- Padding: p-8 md:p-12

**Text Input Tab**:
- Large textarea: min-h-[300px], rounded-lg border
- Character counter in bottom-right: text-sm
- Placeholder: "Paste news article text here for analysis..."
- Submit button below: w-full md:w-auto px-12 py-4, text-lg font-semibold

**File Upload Tab**:
- Drag-and-drop zone: border-2 border-dashed, rounded-lg, min-h-[300px]
- Center-aligned content with upload icon (from Heroicons: arrow-up-tray)
- Instructions: "Drop PDF or DOCX file here or click to browse"
- File type indicator: text-sm below instructions
- Selected file display: Show filename with remove option
- Upload button: Same styling as text submit

**Results Display**:
- Card container appearing below input section
- Result badge with large text showing "REAL NEWS" or "FAKE NEWS"
- Confidence percentage: Circular progress indicator or large percentage display
- Details grid: 2-column layout showing label and probability
- Visual separator between input and results
- "Analyze Another" button to reset

### Loading State
- Spinner overlay on input section
- "Analyzing..." text with animated dots
- Disabled input during processing

### Error States
- Alert component with error icon (Heroicons: exclamation-triangle)
- Clear error message text
- Retry button or clear error action

### Footer
- Minimal footer with disclaimer text
- "This tool uses AI and may not be 100% accurate. Always verify from multiple sources."
- Links: About, Privacy, API Documentation
- Padding: py-12, border-top

## Component Library

**Cards**: 
- Rounded-xl borders, shadow-sm elevation
- Padding: p-6 to p-8
- Background: solid with subtle border

**Buttons**:
- Primary: Large, rounded-lg, font-semibold, px-8 py-3
- Secondary: Outlined style, same size
- Icon buttons: p-2, rounded-full for close/remove actions

**Inputs**:
- Textarea/File zones: border-2, rounded-lg, focus ring visible
- Labels: Uppercase, tracking-wide, text-sm, mb-2

**Badges**:
- Result badges: Large (px-6 py-3), rounded-full, uppercase, font-bold
- Use contrasting treatment for Real vs Fake results

**Progress Indicators**:
- Circular progress ring for confidence percentage
- Or horizontal bar with percentage label

**Icons**: 
- Use Heroicons exclusively
- Sizes: w-6 h-6 for inline, w-12 h-12 for featured elements

## Images
No hero image. This is a utility application where function takes priority. The interface should feel like a professional tool, not a marketing page.

## Responsive Behavior
- Mobile (base): Single column, full-width inputs, stacked layout
- Tablet (md:): Wider centered container, larger text
- Desktop (lg:): max-w-4xl container, optimal reading width

## Animations
**Minimal and purposeful only**:
- Smooth tab transitions: transition-all duration-200
- Loading spinner rotation
- Result card slide-in: slide from opacity-0 to opacity-100
- NO hover animations, NO scroll effects

## Accessibility
- Clear focus states on all interactive elements
- Semantic HTML structure
- ARIA labels on file upload and result displays
- High contrast text ratios
- Keyboard navigation support for tab switching