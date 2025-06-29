import React from 'react';
import { Palette, Copy, Check } from 'lucide-react';

const ColorPalette = () => {
  const [copiedColor, setCopiedColor] = React.useState('');

  const colorPalettes = [
    {
      name: 'Deep Navy Blue',
      description: 'Primary deep navy tones for headers and emphasis',
      colors: [
        { name: 'Navy 50', hex: '#f0f4ff', css: 'navy-50' },
        { name: 'Navy 100', hex: '#e0e7ff', css: 'navy-100' },
        { name: 'Navy 200', hex: '#c7d2fe', css: 'navy-200' },
        { name: 'Navy 300', hex: '#a5b4fc', css: 'navy-300' },
        { name: 'Navy 400', hex: '#818cf8', css: 'navy-400' },
        { name: 'Navy 500', hex: '#6366f1', css: 'navy-500' },
        { name: 'Navy 600', hex: '#4f46e5', css: 'navy-600' },
        { name: 'Navy 700', hex: '#4338ca', css: 'navy-700' },
        { name: 'Navy 800', hex: '#022f78', css: 'navy-800', primary: true },
        { name: 'Navy 900', hex: '#011d4a', css: 'navy-900' },
      ]
    },
    {
      name: 'Royal Blue',
      description: 'Secondary royal blue for accents and interactions',
      colors: [
        { name: 'Royal 50', hex: '#eff6ff', css: 'royal-50' },
        { name: 'Royal 100', hex: '#dbeafe', css: 'royal-100' },
        { name: 'Royal 200', hex: '#bfdbfe', css: 'royal-200' },
        { name: 'Royal 300', hex: '#93c5fd', css: 'royal-300' },
        { name: 'Royal 400', hex: '#60a5fa', css: 'royal-400' },
        { name: 'Royal 500', hex: '#3b82f6', css: 'royal-500' },
        { name: 'Royal 600', hex: '#024abf', css: 'royal-600', primary: true },
        { name: 'Royal 700', hex: '#1d4ed8', css: 'royal-700' },
        { name: 'Royal 800', hex: '#1e40af', css: 'royal-800' },
        { name: 'Royal 900', hex: '#1e3a8a', css: 'royal-900' },
      ]
    },
    {
      name: 'Medium Blue',
      description: 'Complementary medium blue for variety and depth',
      colors: [
        { name: 'Medium 50', hex: '#f0f9ff', css: 'medium-blue-50' },
        { name: 'Medium 100', hex: '#e0f2fe', css: 'medium-blue-100' },
        { name: 'Medium 200', hex: '#bae6fd', css: 'medium-blue-200' },
        { name: 'Medium 300', hex: '#7dd3fc', css: 'medium-blue-300' },
        { name: 'Medium 400', hex: '#38bdf8', css: 'medium-blue-400' },
        { name: 'Medium 500', hex: '#0ea5e9', css: 'medium-blue-500' },
        { name: 'Medium 600', hex: '#0284c7', css: 'medium-blue-600' },
        { name: 'Medium 700', hex: '#0369a1', css: 'medium-blue-700' },
        { name: 'Medium 800', hex: '#075985', css: 'medium-blue-800' },
        { name: 'Medium 900', hex: '#0c4a6e', css: 'medium-blue-900' },
      ]
    },
    {
      name: 'Orange Accent',
      description: 'Warm orange for highlights and call-to-action elements',
      colors: [
        { name: 'Orange 50', hex: '#fff7ed', css: 'orange-50' },
        { name: 'Orange 100', hex: '#ffedd5', css: 'orange-100' },
        { name: 'Orange 200', hex: '#fed7aa', css: 'orange-200' },
        { name: 'Orange 300', hex: '#fdba74', css: 'orange-300' },
        { name: 'Orange 400', hex: '#fb923c', css: 'orange-400' },
        { name: 'Orange 500', hex: '#f97316', css: 'orange-500' },
        { name: 'Orange 600', hex: '#ea580c', css: 'orange-600' },
        { name: 'Orange 700', hex: '#c2410c', css: 'orange-700' },
        { name: 'Orange 800', hex: '#9a3412', css: 'orange-800' },
        { name: 'Orange 900', hex: '#7c2d12', css: 'orange-900' },
      ]
    },
    {
      name: 'Neutral Greys',
      description: 'Professional grey tones for text and backgrounds',
      colors: [
        { name: 'Neutral 50', hex: '#f9fafb', css: 'neutral-50' },
        { name: 'Neutral 100', hex: '#f3f4f6', css: 'neutral-100' },
        { name: 'Neutral 200', hex: '#e5e7eb', css: 'neutral-200' },
        { name: 'Neutral 300', hex: '#d1d5db', css: 'neutral-300' },
        { name: 'Neutral 400', hex: '#9ca3af', css: 'neutral-400' },
        { name: 'Neutral 500', hex: '#6b7280', css: 'neutral-500' },
        { name: 'Neutral 600', hex: '#4b5563', css: 'neutral-600' },
        { name: 'Neutral 700', hex: '#374151', css: 'neutral-700' },
        { name: 'Neutral 800', hex: '#1f2937', css: 'neutral-800' },
        { name: 'Neutral 900', hex: '#111827', css: 'neutral-900' },
      ]
    }
  ];

  const texturePatterns = [
    {
      name: 'Dots Pattern',
      description: 'Subtle dot pattern for backgrounds',
      className: 'pattern-dots',
      preview: 'bg-navy-800 pattern-dots'
    },
    {
      name: 'Grid Pattern',
      description: 'Clean grid pattern for structure',
      className: 'pattern-grid',
      preview: 'bg-royal-600 pattern-grid'
    },
    {
      name: 'Diagonal Pattern',
      description: 'Dynamic diagonal stripes',
      className: 'pattern-diagonal',
      preview: 'bg-medium-blue-500 pattern-diagonal'
    },
    {
      name: 'Navy Texture',
      description: 'Textured navy background',
      className: 'texture-navy',
      preview: 'texture-navy'
    },
    {
      name: 'Royal Texture',
      description: 'Textured royal blue background',
      className: 'texture-royal',
      preview: 'texture-royal'
    },
    {
      name: 'Wave Texture',
      description: 'Gradient wave texture',
      className: 'texture-waves',
      preview: 'texture-waves'
    }
  ];

  const copyToClipboard = async (text, type = 'hex') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedColor(text);
      setTimeout(() => setCopiedColor(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="container-professional">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Palette className="h-16 w-16 text-navy-800" />
            <div>
              <h1 className="heading-lg">Deep Blue Color Palette & Textures</h1>
              <p className="text-body text-neutral-600">
                Comprehensive design system featuring #022f78 and #024abf
              </p>
            </div>
          </div>
        </div>

        {/* Primary Colors Showcase */}
        <div className="card-lg p-8 mb-12">
          <h2 className="heading-md mb-8 text-center">Primary Color Showcase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div 
                className="w-32 h-32 mx-auto rounded-3xl shadow-professional-xl mb-4 animate-blue-glow"
                style={{ backgroundColor: '#022f78' }}
              ></div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Deep Navy Blue</h3>
              <p className="text-lg font-mono text-neutral-600">#022f78</p>
              <p className="text-caption text-neutral-500">Primary brand color</p>
            </div>
            <div className="text-center">
              <div 
                className="w-32 h-32 mx-auto rounded-3xl shadow-professional-xl mb-4 animate-blue-glow"
                style={{ backgroundColor: '#024abf' }}
              ></div>
              <h3 className="text-xl font-bold text-royal-600 mb-2">Royal Blue</h3>
              <p className="text-lg font-mono text-neutral-600">#024abf</p>
              <p className="text-caption text-neutral-500">Secondary brand color</p>
            </div>
          </div>
        </div>

        {/* Color Palettes */}
        {colorPalettes.map((palette, paletteIndex) => (
          <div key={paletteIndex} className="card-lg p-8 mb-8">
            <div className="mb-6">
              <h3 className="heading-sm mb-2">{palette.name}</h3>
              <p className="text-body text-neutral-600">{palette.description}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
              {palette.colors.map((color, colorIndex) => (
                <div key={colorIndex} className="group">
                  <div 
                    className={`w-full h-20 rounded-xl shadow-professional cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-professional-lg ${
                      color.primary ? 'ring-4 ring-orange-400 ring-opacity-50' : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyToClipboard(color.hex)}
                  >
                    <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedColor === color.hex ? (
                        <Check className="h-5 w-5 text-white drop-shadow-lg" />
                      ) : (
                        <Copy className="h-5 w-5 text-white drop-shadow-lg" />
                      )}
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium text-neutral-700">{color.name}</p>
                    <p className="text-xs font-mono text-neutral-500">{color.hex}</p>
                    <button
                      onClick={() => copyToClipboard(`text-${color.css}`)}
                      className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      {color.css}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Texture Patterns */}
        <div className="card-lg p-8 mb-8">
          <div className="mb-6">
            <h3 className="heading-sm mb-2">Texture Patterns</h3>
            <p className="text-body text-neutral-600">Rich textures to enhance depth and visual interest</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {texturePatterns.map((pattern, index) => (
              <div key={index} className="group">
                <div 
                  className={`w-full h-32 rounded-xl shadow-professional cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-professional-lg ${pattern.preview}`}
                  onClick={() => copyToClipboard(pattern.className)}
                >
                  <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedColor === pattern.className ? (
                      <Check className="h-6 w-6 text-white drop-shadow-lg" />
                    ) : (
                      <Copy className="h-6 w-6 text-white drop-shadow-lg" />
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="font-semibold text-neutral-800">{pattern.name}</h4>
                  <p className="text-caption text-neutral-600">{pattern.description}</p>
                  <code className="text-xs bg-neutral-100 px-2 py-1 rounded text-neutral-700">
                    {pattern.className}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Examples */}
        <div className="card-lg p-8 mb-8">
          <div className="mb-6">
            <h3 className="heading-sm mb-2">Gradient Combinations</h3>
            <p className="text-body text-neutral-600">Beautiful gradients using the deep blue palette</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group">
              <div className="w-full h-32 rounded-xl shadow-professional cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-professional-lg gradient-navy">
                <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className="h-6 w-6 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="mt-3">
                <h4 className="font-semibold text-neutral-800">Navy Gradient</h4>
                <code className="text-xs bg-neutral-100 px-2 py-1 rounded text-neutral-700">
                  gradient-navy
                </code>
              </div>
            </div>

            <div className="group">
              <div className="w-full h-32 rounded-xl shadow-professional cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-professional-lg gradient-royal">
                <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className="h-6 w-6 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="mt-3">
                <h4 className="font-semibold text-neutral-800">Royal Gradient</h4>
                <code className="text-xs bg-neutral-100 px-2 py-1 rounded text-neutral-700">
                  gradient-royal
                </code>
              </div>
            </div>

            <div className="group">
              <div className="w-full h-32 rounded-xl shadow-professional cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-professional-lg bg-gradient-blue-depth">
                <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className="h-6 w-6 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="mt-3">
                <h4 className="font-semibold text-neutral-800">Blue Depth</h4>
                <code className="text-xs bg-neutral-100 px-2 py-1 rounded text-neutral-700">
                  bg-gradient-blue-depth
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="card-lg p-8">
          <div className="mb-6">
            <h3 className="heading-sm mb-2">Usage Examples</h3>
            <p className="text-body text-neutral-600">See the color palette in action</p>
          </div>
          
          <div className="space-y-6">
            {/* Card Example */}
            <div className="card-navy p-6">
              <h4 className="text-xl font-bold text-white mb-3">Deep Navy Card</h4>
              <p className="text-white/90 mb-4">
                This card uses the deep navy background with subtle texture overlay for depth and richness.
              </p>
              <button className="btn-accent">
                Call to Action
              </button>
            </div>

            {/* Royal Card Example */}
            <div className="card-royal p-6">
              <h4 className="text-xl font-bold text-white mb-3">Royal Blue Card</h4>
              <p className="text-white/90 mb-4">
                This card showcases the royal blue with geometric pattern texture for visual interest.
              </p>
              <button className="bg-white text-royal-600 px-6 py-3 rounded-xl font-semibold hover:bg-neutral-50 transition-colors">
                Secondary Action
              </button>
            </div>

            {/* Glass Effect Example */}
            <div className="glass-dark p-6 rounded-2xl">
              <h4 className="text-xl font-bold text-white mb-3">Glass Effect</h4>
              <p className="text-white/90">
                Frosted glass effect with deep blue background for modern, sophisticated appearance.
              </p>
            </div>
          </div>
        </div>

        {/* Copy Notification */}
        {copiedColor && (
          <div className="fixed bottom-6 right-6 bg-navy-800 text-white px-6 py-3 rounded-xl shadow-professional-xl animate-slide-in-right">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-400" />
              <span>Copied: {copiedColor}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPalette;