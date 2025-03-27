# ModelMetrics - LLM API Pricing Calculator

A powerful tool to calculate and compare the cost of using different Large Language Model APIs for your AI projects.

## User Journey Improvements

The application has been redesigned to provide a more intuitive and efficient user experience:

### 1. Navigation Enhancements

#### Sidebar Navigation

- **Persistent Sidebar**: A collapsible sidebar that remains visible as users scroll, providing easy access to all main sections.
- **Context-Aware Navigation**: Highlights the current active section, with subtle animations to guide user attention.
- **Quick Actions**: Dedicated area for frequently used functions like saving configurations and accessing recent calculations.

#### Top Bar Navigation

- **Enhanced Header**: Includes breadcrumb navigation, search functionality, and streamlined action buttons.
- **Quick Calculate**: Dedicated button for instant results.
- **Provider Filters**: Easy access dropdown for selecting which providers to include in comparisons.
- **User Account Section**: Profile settings and saved calculations access.

### 2. Content Organization

#### Progressive Disclosure Approach

- **Wizard Interface**: Step-by-step guidance through the calculation process:
  1. Select providers to compare
  2. Configure input/output parameters
  3. Set additional options
  4. Review and calculate

#### Tabbed Content Sections

- **Organized Results**: Tabbed navigation for different views of results (tables, visualizations, features).
- **Model Comparison**: Dedicated section with various comparison views.
- **Documentation and Resources**: Easy access to help and reference materials.

### 3. Visual Hierarchy and UI Improvements

- **Consistent Styling**: Maintains the dark theme aesthetic while enhancing contrast and readability.
- **Clear Section Divisions**: Visual cues to separate different functional areas.
- **Responsive Design**: Adapts to different screen sizes for a consistent experience.
- **Animations and Transitions**: Subtle motion effects guide the user through the interface.

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Headless UI components
- React Router for navigation
- Chart.js and Recharts for visualizations

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Feature Roadmap

- **User Accounts**: Save and share calculations
- **API Integration**: Real-time pricing updates
- **Export Options**: PDF, CSV, and JSON exports
- **Custom Model Support**: Add your own models for comparison
- **Budget Planning Tools**: Forecast usage and costs over time
