export const signatureTemplates = {
  professional: {
    name: 'Professional',
    category: 'free',
    description: 'Signature classique et professionnelle',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; border-left: 4px solid #2563eb; padding-left: 20px; margin: 20px 0;">
        <div style="margin-bottom: 10px;">
          <strong style="color: #1f2937; font-size: 18px;">${data.fullName}</strong>
        </div>
        <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">
          ${data.jobTitle}
        </div>
        <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">
          ${data.company}
        </div>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
          <div style="color: #374151; font-size: 13px; margin-bottom: 5px;">
            📧 ${data.email}
          </div>
          ${data.phone ? `<div style="color: #374151; font-size: 13px; margin-bottom: 5px;">📞 ${data.phone}</div>` : ''}
          ${data.website ? `<div style="color: #374151; font-size: 13px; margin-bottom: 5px;">🌐 <a href="${data.website}" style="color: #2563eb; text-decoration: none;">${data.website}</a></div>` : ''}
          ${data.address ? `<div style="color: #374151; font-size: 13px; margin-bottom: 5px;">📍 ${data.address}</div>` : ''}
        </div>
      </div>
    `
  },
  
  modern: {
    name: 'Modern',
    category: 'free',
    description: 'Design moderne avec dégradé',
    html: (data) => `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 12px; color: white; margin: 20px 0;">
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
          <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; font-size: 24px; font-weight: bold;">
            ${data.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div>
            <div style="font-size: 20px; font-weight: 600; margin-bottom: 5px;">${data.fullName}</div>
            <div style="font-size: 14px; opacity: 0.9;">${data.jobTitle}</div>
          </div>
        </div>
        <div style="font-size: 16px; margin-bottom: 20px; opacity: 0.9;">
          ${data.company}
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 13px;">
          <div>📧 <a href="mailto:${data.email}" style="color: white; text-decoration: none;">${data.email}</a></div>
          ${data.phone ? `<div>📞 ${data.phone}</div>` : ''}
          ${data.website ? `<div>🌐 <a href="${data.website}" style="color: white; text-decoration: none;">${data.website}</a></div>` : ''}
          ${data.address ? `<div>📍 ${data.address}</div>` : ''}
        </div>
      </div>
    `
  },
  
  minimal: {
    name: 'Minimal',
    category: 'free',
    description: 'Design épuré et minimaliste',
    html: (data) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 20px 0; padding: 20px 0; border-top: 2px solid #000;">
        <div style="margin-bottom: 8px;">
          <span style="font-size: 16px; font-weight: 500; color: #000;">${data.fullName}</span>
          <span style="color: #666; font-size: 14px; margin-left: 10px;">${data.jobTitle}</span>
        </div>
        <div style="color: #666; font-size: 14px; margin-bottom: 15px;">
          ${data.company}
        </div>
        <div style="font-size: 13px; color: #333; line-height: 1.6;">
          <div>${data.email}</div>
          ${data.phone ? `<div>${data.phone}</div>` : ''}
          ${data.website ? `<div><a href="${data.website}" style="color: #333; text-decoration: none;">${data.website}</a></div>` : ''}
          ${data.address ? `<div>${data.address}</div>` : ''}
        </div>
      </div>
    `
  },
  
  creative: {
    name: 'Creative',
    category: 'premium',
    description: 'Design créatif avec icônes colorées',
    html: (data) => `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; background: #f8fafc; border-radius: 16px; padding: 30px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="width: 50px; height: 50px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 20px; color: white; font-weight: bold; font-size: 18px;">
            ${data.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div>
            <div style="font-size: 22px; font-weight: 600; color: #1a202c; margin-bottom: 4px;">${data.fullName}</div>
            <div style="font-size: 15px; color: #4a5568; margin-bottom: 2px;">${data.jobTitle}</div>
            <div style="font-size: 14px; color: #718096;">${data.company}</div>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 14px;">
          <div style="display: flex; align-items: center; color: #2d3748;">
            <span style="margin-right: 8px;">📧</span>
            <a href="mailto:${data.email}" style="color: #3182ce; text-decoration: none;">${data.email}</a>
          </div>
          ${data.phone ? `
            <div style="display: flex; align-items: center; color: #2d3748;">
              <span style="margin-right: 8px;">📞</span>
              ${data.phone}
            </div>
          ` : ''}
          ${data.website ? `
            <div style="display: flex; align-items: center; color: #2d3748;">
              <span style="margin-right: 8px;">🌐</span>
              <a href="${data.website}" style="color: #3182ce; text-decoration: none;">${data.website}</a>
            </div>
          ` : ''}
          ${data.address ? `
            <div style="display: flex; align-items: center; color: #2d3748;">
              <span style="margin-right: 8px;">📍</span>
              ${data.address}
            </div>
          ` : ''}
        </div>
      </div>
    `
  },
  
  elegant: {
    name: 'Elegant',
    category: 'premium',
    description: 'Design élégant avec typographie raffinée',
    html: (data) => `
      <div style="font-family: 'Georgia', serif; max-width: 550px; margin: 20px 0; padding: 25px 0; border-left: 3px solid #8b5cf6; padding-left: 25px;">
        <div style="margin-bottom: 12px;">
          <div style="font-size: 24px; font-weight: 400; color: #1f2937; margin-bottom: 4px; letter-spacing: 0.5px;">${data.fullName}</div>
          <div style="font-size: 16px; color: #6b7280; font-style: italic; margin-bottom: 6px;">${data.jobTitle}</div>
          <div style="font-size: 15px; color: #8b5cf6; font-weight: 500;">${data.company}</div>
        </div>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <div style="font-size: 14px; color: #4b5563; line-height: 1.8;">
            <div style="margin-bottom: 6px;">✉️ <a href="mailto:${data.email}" style="color: #8b5cf6; text-decoration: none;">${data.email}</a></div>
            ${data.phone ? `<div style="margin-bottom: 6px;">📱 ${data.phone}</div>` : ''}
            ${data.website ? `<div style="margin-bottom: 6px;">🔗 <a href="${data.website}" style="color: #8b5cf6; text-decoration: none;">${data.website}</a></div>` : ''}
            ${data.address ? `<div style="margin-bottom: 6px;">📍 ${data.address}</div>` : ''}
          </div>
        </div>
      </div>
    `
  },
  
  tech: {
    name: 'Tech',
    category: 'premium',
    description: 'Design tech avec code et couleurs sombres',
    html: (data) => `
      <div style="font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace; max-width: 600px; background: #1a1a1a; color: #e5e5e5; padding: 25px; border-radius: 8px; margin: 20px 0; border: 1px solid #333;">
        <div style="margin-bottom: 15px;">
          <div style="color: #00ff88; font-size: 14px; margin-bottom: 5px;">// ${data.fullName}</div>
          <div style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 4px;">${data.fullName}</div>
          <div style="color: #888; font-size: 14px; margin-bottom: 2px;">${data.jobTitle}</div>
          <div style="color: #00ff88; font-size: 13px;">${data.company}</div>
        </div>
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #333;">
          <div style="font-size: 12px; line-height: 1.6;">
            <div style="margin-bottom: 4px;"><span style="color: #ff6b6b;">const</span> <span style="color: #00ff88;">email</span> = <span style="color: #ffd93d;">"${data.email}"</span>;</div>
            ${data.phone ? `<div style="margin-bottom: 4px;"><span style="color: #ff6b6b;">const</span> <span style="color: #00ff88;">phone</span> = <span style="color: #ffd93d;">"${data.phone}"</span>;</div>` : ''}
            ${data.website ? `<div style="margin-bottom: 4px;"><span style="color: #ff6b6b;">const</span> <span style="color: #00ff88;">website</span> = <span style="color: #ffd93d;">"${data.website}"</span>;</div>` : ''}
            ${data.address ? `<div style="margin-bottom: 4px;"><span style="color: #ff6b6b;">const</span> <span style="color: #00ff88;">location</span> = <span style="color: #ffd93d;">"${data.address}"</span>;</div>` : ''}
          </div>
        </div>
      </div>
    `
  },
  
  colorful: {
    name: 'Colorful',
    category: 'premium',
    description: 'Design coloré et dynamique',
    html: (data) => `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); padding: 30px; border-radius: 20px; color: white; margin: 20px 0; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
        
        <div style="position: relative; z-index: 1;">
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <div style="width: 70px; height: 70px; background: rgba(255,255,255,0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-right: 20px; font-size: 28px; font-weight: bold; backdrop-filter: blur(10px);">
              ${data.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <div style="font-size: 24px; font-weight: 700; margin-bottom: 6px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">${data.fullName}</div>
              <div style="font-size: 16px; opacity: 0.95; margin-bottom: 4px;">${data.jobTitle}</div>
              <div style="font-size: 14px; opacity: 0.8;">${data.company}</div>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; font-size: 14px;">
            <div style="background: rgba(255,255,255,0.15); padding: 12px; border-radius: 12px; backdrop-filter: blur(10px);">
              <div style="font-weight: 600; margin-bottom: 4px;">📧 Email</div>
              <a href="mailto:${data.email}" style="color: white; text-decoration: none; opacity: 0.9;">${data.email}</a>
            </div>
            ${data.phone ? `
              <div style="background: rgba(255,255,255,0.15); padding: 12px; border-radius: 12px; backdrop-filter: blur(10px);">
                <div style="font-weight: 600; margin-bottom: 4px;">📞 Téléphone</div>
                <div style="opacity: 0.9;">${data.phone}</div>
              </div>
            ` : ''}
            ${data.website ? `
              <div style="background: rgba(255,255,255,0.15); padding: 12px; border-radius: 12px; backdrop-filter: blur(10px);">
                <div style="font-weight: 600; margin-bottom: 4px;">🌐 Site web</div>
                <a href="${data.website}" style="color: white; text-decoration: none; opacity: 0.9;">${data.website}</a>
              </div>
            ` : ''}
            ${data.address ? `
              <div style="background: rgba(255,255,255,0.15); padding: 12px; border-radius: 12px; backdrop-filter: blur(10px);">
                <div style="font-weight: 600; margin-bottom: 4px;">📍 Adresse</div>
                <div style="opacity: 0.9;">${data.address}</div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `
  }
}

export const getTemplateCategories = () => {
  const categories = {
    free: [],
    premium: []
  }
  
  Object.entries(signatureTemplates).forEach(([key, template]) => {
    categories[template.category].push({
      key,
      ...template
    })
  })
  
  return categories
}

export const getTemplateByKey = (key) => {
  return signatureTemplates[key] || null
} 