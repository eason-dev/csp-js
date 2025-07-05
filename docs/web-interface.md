# Web Interface Guide

The CSP Kit web interface provides an interactive, visual way to generate Content Security Policy headers without any installation. Perfect for beginners, quick testing, and sharing configurations with team members.

## 🌐 Access the Interface

**👉 [csp-kit.eason.ch](https://csp-kit.eason.ch)**

The web interface is fully responsive and works on:
- ✅ **Desktop browsers** (Chrome, Firefox, Safari, Edge)
- ✅ **Mobile devices** (iOS Safari, Android Chrome)
- ✅ **Tablets** (iPad, Android tablets)

## ✨ Key Features

### 🎯 **Visual Service Selection**
- Browse 106+ services with intuitive categories
- Search and filter services by name or functionality
- View detailed information about each service's CSP requirements
- Add/remove services with simple clicks

### ⚡ **Real-time CSP Generation**
- See your CSP policy update instantly as you modify services
- Visual preview of how changes affect your security policy
- Color-coded CSP directives for easy understanding
- Automatic validation with warnings and suggestions

### 📋 **Multiple Output Formats**
- **HTTP Header**: Ready-to-use header string
- **HTML Meta Tag**: For static sites and client-side implementation
- **JSON Configuration**: For programmatic usage
- **Nginx/Apache**: Server configuration snippets

### 🔗 **Shareable Configurations**
- Generate shareable URLs for your CSP configuration
- Collaborate with team members by sharing links
- Save different configurations for different environments
- Export configurations for documentation

### 🔍 **Service Discovery**
- Explore services by category (Analytics, Payment, Social, etc.)
- Search functionality with fuzzy matching
- Service recommendations based on common combinations
- Detailed service information with official documentation links

## 🚀 Getting Started

### 1. **Browse Services**

When you first visit the interface:

1. **Explore categories** - Services are organized by function
2. **Use search** - Type to find specific services quickly
3. **Read service details** - Click on services to learn more
4. **Start with popular services** - Recommended services are highlighted

### 2. **Build Your Configuration**

1. **Add services** - Click the "+" button next to services
2. **See real-time updates** - CSP policy updates automatically
3. **Review requirements** - See what domains each service needs
4. **Add custom rules** - Include your own domains and directives

### 3. **Copy and Use**

1. **Choose format** - Header, meta tag, or JSON
2. **Copy to clipboard** - One-click copying
3. **Test in your app** - Verify the CSP works as expected
4. **Share with team** - Use shareable URLs for collaboration

## 🎛️ Interface Sections

### **Service Browser**

**Left Panel: Service Categories**
- Analytics (Google Analytics, Mixpanel, etc.)
- Payment (Stripe, PayPal, etc.)
- Social (Facebook, Twitter, etc.)
- Forms (Typeform, Calendly, etc.)
- And 9+ more categories...

**Main Area: Service Grid**
- Service cards with name, description, and category
- Search bar for quick filtering
- Add/remove buttons for each service
- Service details modal with documentation links

### **CSP Builder**

**Right Panel: Configuration**
- Selected services list
- Custom rules input
- Nonce generation options
- Report URI configuration

**Output Section**
- Live CSP preview
- Multiple format options
- Copy to clipboard buttons
- Validation warnings and suggestions

### **Header**
- CSP Kit branding and navigation
- Links to documentation and GitHub
- Theme toggle (light/dark mode)
- Configuration sharing options

## 📱 Mobile Experience

The web interface is fully optimized for mobile devices:

### **Mobile Navigation**
- Collapsible service browser
- Touch-friendly buttons and controls
- Swipe gestures for category switching
- Responsive grid layouts

### **Mobile Features**
- **Quick search** - Search services on small screens
- **Condensed view** - Essential information only
- **Share sheet integration** - Native sharing on mobile
- **Offline support** - Basic functionality works offline

## 🔧 Advanced Features

### **Custom Rules**

Add your own CSP directives beyond service requirements:

```
Script Sources: https://my-cdn.com, https://my-api.com
Style Sources: https://fonts.example.com
Image Sources: data:, blob:
```

### **Nonce Generation**

Enable nonce support for secure inline scripts:
- Toggle nonce generation
- See example usage with generated nonce
- Copy nonce value for your implementation

### **Report URI Configuration**

Set up CSP violation reporting:
```
Report URI: https://my-site.com/csp-report
```

### **Environment Presets**

Save different configurations for:
- **Development** - More permissive policies for debugging
- **Staging** - Testing configurations
- **Production** - Strict security policies

### **Validation and Warnings**

The interface provides intelligent feedback:
- ⚠️ **Security warnings** for unsafe directives
- 💡 **Suggestions** for optimization
- ❌ **Errors** for invalid configurations
- 📊 **Policy analysis** showing directive coverage

## 🔗 URL Sharing

Share your configurations with team members using special URLs:

### **Configuration URLs**

```
https://csp-kit.eason.ch?services=google-analytics,stripe,google-fonts&nonce=true
```

**URL Parameters:**
- `services` - Comma-separated list of service IDs
- `nonce` - Enable nonce generation (true/false)
- `custom` - Base64-encoded custom rules
- `reportUri` - URL-encoded report URI

### **Creating Shareable Links**

1. Configure your CSP policy
2. Click the "Share" button
3. Copy the generated URL
4. Share with team members or save for later

### **Using Shared Links**

When someone visits your shared link:
- Configuration loads automatically
- All services and settings are preserved
- Recipients can modify and create their own links

## 📊 Service Information

Each service provides detailed information:

### **Service Details Modal**

Click on any service to see:
- **Description** - What the service does
- **CSP Requirements** - Exact domains and directives needed
- **Official Documentation** - Links to vendor CSP guides
- **Usage Notes** - Implementation tips and warnings
- **Last Updated** - When the service was last verified

### **CSP Requirements Breakdown**

```
Google Analytics requires:
✓ script-src: https://www.googletagmanager.com
✓ img-src: https://www.google-analytics.com
✓ connect-src: https://analytics.google.com
```

### **Implementation Examples**

See how to implement each service:
- HTML meta tag examples
- Server configuration snippets
- Framework-specific code

## 🎨 Customization

### **Theme Options**
- **Light mode** - Default clean interface
- **Dark mode** - Easy on the eyes for long sessions
- **Auto mode** - Follows system preference

### **Display Preferences**
- **Compact view** - More services visible at once
- **Detailed view** - More information per service
- **Grid layout** - Card-based service browser
- **List layout** - Dense list of services

### **Export Options**
- **Copy to clipboard** - Quick copying
- **Download as file** - Save configuration locally
- **Email configuration** - Send to team members
- **Print friendly** - Printer-optimized format

## 🚀 Integration Workflows

### **Development Workflow**

1. **Start with web interface** for initial configuration
2. **Test the CSP** in your application
3. **Refine with CLI tools** for advanced needs
4. **Automate with API** for production deployment

### **Team Collaboration**

1. **Product Manager** creates initial requirements using web interface
2. **Shares URL** with development team
3. **Developers** refine configuration and implement
4. **QA** validates CSP using the same shared configuration

### **Client Presentations**

1. **Configure CSP** for client's services
2. **Share URL** in presentations or proposals
3. **Demonstrate real-time** CSP generation
4. **Export documentation** for client reference

## 🔍 Troubleshooting

### **Common Issues**

**Services not loading:**
- Check internet connection
- Try refreshing the page
- Clear browser cache

**CSP not working in browser:**
- Verify you copied the complete header
- Check for typos in service names
- Ensure all required services are included

**Sharing links not working:**
- Check URL encoding for special characters
- Verify all services exist in current version
- Try regenerating the share link

### **Browser Compatibility**

**Fully supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Limited support:**
- Internet Explorer (basic functionality only)
- Very old mobile browsers (degraded experience)

### **Performance Tips**

- Use search instead of scrolling through all services
- Bookmark frequently used configurations
- Use direct URLs for repeated access
- Consider CLI for bulk operations

## 📚 Learning Resources

### **CSP Concepts**

The web interface includes educational content:
- **CSP directive explanations** - What each directive does
- **Security implications** - Why CSP matters
- **Common patterns** - Typical service combinations
- **Best practices** - Security recommendations

### **Interactive Tutorials**

Built-in tutorials guide you through:
- Creating your first CSP policy
- Understanding different service categories
- Using advanced features
- Troubleshooting common issues

### **Help System**

Access help content throughout the interface:
- **Tooltips** - Quick explanations for all features
- **Help panel** - Detailed documentation
- **Examples** - Real-world usage scenarios
- **FAQ** - Common questions and answers

## 🔄 Updates and Maintenance

### **Automatic Updates**

The web interface automatically receives:
- **New services** - Added weekly
- **Service updates** - Updated when requirements change
- **Feature improvements** - Regular enhancements
- **Security fixes** - Immediate patches

### **Offline Support**

Limited functionality works offline:
- Previously loaded services remain available
- CSP generation works with cached data
- Saved configurations persist locally
- Full functionality returns when online

### **Data Synchronization**

Your data is handled with privacy in mind:
- **No account required** - Anonymous usage
- **Local storage only** - Configurations saved in browser
- **No tracking** - Minimal analytics for improvement
- **GDPR compliant** - Respects privacy preferences

## 🎯 Tips for Power Users

### **Keyboard Shortcuts**

- `Ctrl/Cmd + K` - Focus search
- `Ctrl/Cmd + Enter` - Copy CSP header
- `Escape` - Close modals
- `Tab/Shift+Tab` - Navigate interface

### **Quick Operations**

- **Double-click** services to add/remove quickly
- **Right-click** for context menus
- **Drag and drop** to reorder (coming soon)
- **Bulk select** with Shift+click (coming soon)

### **Expert Mode**

Enable expert mode for:
- **Raw CSP editing** - Direct directive editing
- **Advanced validation** - More detailed checks
- **Performance metrics** - CSP size and complexity analysis
- **Security scoring** - Policy strength assessment

## 🌟 Coming Soon

Planned features for the web interface:

- **🤖 AI Assistant** - Smart service recommendations
- **📊 CSP Analytics** - Policy performance insights
- **🔄 Version History** - Track configuration changes
- **👥 Team Workspaces** - Collaborative editing
- **🎨 Custom Themes** - Personalized interface
- **📱 Native Apps** - iOS and Android applications

---

## 🙏 Feedback Welcome

Help us improve the web interface:

- **[Feature requests](https://github.com/eason-dev/csp-kit/discussions)** - Suggest new features
- **[Bug reports](https://github.com/eason-dev/csp-kit/issues)** - Report problems
- **[User feedback](mailto:feedback@csp-kit.eason.ch)** - Share your experience
- **[Star on GitHub](https://github.com/eason-dev/csp-kit)** - Show your support

---

## 📚 Related Resources

- **[Getting Started](./getting-started.md)** - Learn CSP Kit basics
- **[API Reference](./api-reference.md)** - Programmatic usage
- **[CLI Guide](./cli-guide.md)** - Command-line tools
- **[Contributing](./contributing.md)** - Help improve CSP Kit