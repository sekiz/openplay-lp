// Blog içerik koleksiyonu. Yazılar src/content/blog/<dil>/<slug>.md altında durur;
// aynı slug farklı dil klasörlerinde aynı yazının yerelleştirilmiş sürümüdür.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().max(90),
    description: z.string().min(70).max(170), // arama sonucu ve paylaşım kartı metni
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('OpenPlay Team'),
    tags: z.array(z.string()).default([]),
    order: z.number().default(99), // dizindeki sıra; 1 öne çıkan yazıdır
    draft: z.boolean().default(false),
    takeaways: z.array(z.string()).min(2).max(5), // yazının başındaki özet; yapay zekâ yanıtlarında alıntılanmaya uygun
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]), // FAQPage şemasına da yazılır
  }),
});

export const collections = { blog };
