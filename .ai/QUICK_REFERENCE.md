# AI Assistant Quick Reference

## 🎯 First Time Working on This Project?

**READ THIS FIRST:** [PROJECT_CONTEXT.md](../PROJECT_CONTEXT.md)

This is a comprehensive guide covering:
- Complete architecture
- API integration details
- Production-level best practices
- Common issues and solutions

---

## 🚨 Critical Rules

### 1. Always Follow Production Standards
- Add proper error handling with try-catch
- Include detailed logging with prefixes: `[componentName]`
- Return `null` on errors, not minimal objects
- Add TypeScript types for all functions
- Test changes thoroughly

### 2. API Integration
- **Never** expose API keys in client code
- Always use `tmdb.fetchFromEndpoint()` for TMDB calls
- Cache responses appropriately (5 minutes default)
- Handle errors gracefully with fallbacks
- Log all API operations

### 3. Code Patterns

**Data Fetching:**
```typescript
export const getData = async (): Promise<Type[]> => {
  try {
    console.log('[functionName] Fetching data...');
    const data = await service.getData();
    
    if (!data || data.length === 0) {
      console.warn('[functionName] No data returned');
      return fallbackData;
    }
    
    console.log('[functionName] Success');
    return data;
  } catch (error) {
    console.error('[functionName] Error:', error);
    return fallbackData;
  }
};
```

**Component Structure:**
```typescript
import React from 'react';
import { Type } from '@/lib/types/type';

interface ComponentProps {
  data: Type;
}

const Component = ({ data }: ComponentProps) => {
  // Logic here
  
  return (
    // JSX here
  );
};

export default Component;
```

### 4. File Locations

**Need to modify API calls?**
- `src/lib/constants/tmdb.ts` - API configuration
- `src/lib/services/tmdbService.ts` - Service layer
- `src/lib/data-fetching.ts` - Data fetching functions

**Need to modify pages?**
- `src/app/page.tsx` - Homepage
- `src/app/movie/[id]/page.tsx` - Movie details
- `src/app/search/page.tsx` - Search page

**Need to modify components?**
- `src/components/Generic/` - Reusable components
- `src/components/Core/` - Core UI components

**Need to modify types?**
- `src/lib/types/movie.ts` - Movie interface

**Need to modify auth?**
- `src/lib/supabase/` - Supabase clients
- `src/proxy.ts` - Middleware for route protection

---

## 🔍 Common Tasks

### Adding a New API Endpoint

1. Add method to `tmdbService` in `src/lib/services/tmdbService.ts`
2. Add data fetching function in `src/lib/data-fetching.ts`
3. Use in page/component
4. Add error handling and logging

### Creating a New Page

1. Create file in `src/app/[route]/page.tsx`
2. Add server-side data fetching
3. Import and use components
4. Add error boundaries
5. Test thoroughly

### Adding a New Component

1. Create file in `src/components/Generic/[ComponentName].tsx`
2. Define TypeScript interface for props
3. Implement component logic
4. Add proper error handling
5. Export default

### Debugging API Issues

1. Check console for `[tmdb]` logs
2. Verify API key in `.env.local`
3. Test endpoint directly in browser
4. Check Network tab in DevTools
5. Verify response structure matches types

---

## 📋 Pre-Commit Checklist

- [ ] Code follows established patterns
- [ ] TypeScript types added
- [ ] Error handling implemented
- [ ] Logging added with prefixes
- [ ] No console.log (use console.error/warn/info)
- [ ] No hardcoded values
- [ ] Responsive design tested
- [ ] No TypeScript errors
- [ ] Build succeeds (`pnpm build`)

---

## 🐛 Troubleshooting

### API Data Not Showing
1. Check `.env.local` has valid API key
2. Clear Next.js cache: `rm -rf .next`
3. Check console for `[tmdb]` errors
4. Verify network connectivity
5. Test API directly

### Build Errors
1. Run `pnpm build` to see errors
2. Fix TypeScript errors first
3. Check for missing imports
4. Verify all environment variables

### Authentication Issues
1. Verify Supabase credentials
2. Check `proxy.ts` middleware
3. Clear browser cookies
4. Test in incognito mode

---

## 📞 Need More Info?

See [PROJECT_CONTEXT.md](../PROJECT_CONTEXT.md) for:
- Complete architecture details
- Production-level considerations
- Deployment instructions
- Future roadmap
- And much more!
