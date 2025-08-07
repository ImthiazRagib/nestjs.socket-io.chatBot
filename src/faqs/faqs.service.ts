import { Injectable } from '@nestjs/common';

@Injectable()
export class FaqsService {}


// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, ILike } from 'typeorm';
// import { Faq } from './entities/faq.entity';
// import { CreateFaqDto } from './dto/create-faq.dto';
// import { UpdateFaqDto } from './dto/update-faq.dto';

// @Injectable()
// export class FaqsService {
//   constructor(
//     @InjectRepository(Faq)
//     private faqRepository: Repository<Faq>,
//   ) {}

//   async create(createFaqDto: CreateFaqDto): Promise<Faq> {
//     const faq = this.faqRepository.create({
//       ...createFaqDto,
//       keywords: createFaqDto.keywords || this.extractKeywords(createFaqDto.question),
//     });
//     return this.faqRepository.save(faq);
//   }

//   async findAll(): Promise<Faq[]> {
//     return this.faqRepository.find({
//       where: { isActive: true },
//       order: { usageCount: 'DESC', createdAt: 'DESC' },
//     });
//   }

//   async findOne(id: number): Promise<Faq> {
//     const faq = await this.faqRepository.findOne({
//       where: { id, isActive: true },
//     });
//     if (!faq) {
//       throw new NotFoundException(`FAQ with ID ${id} not found`);
//     }
//     return faq;
//   }

//   async update(id: number, updateFaqDto: UpdateFaqDto): Promise<Faq> {
//     const faq = await this.findOne(id);
    
//     const updateData = { ...updateFaqDto };
//     if (updateFaqDto.question && !updateFaqDto.keywords) {
//       updateData.keywords = this.extractKeywords(updateFaqDto.question);
//     }
    
//     await this.faqRepository.update(id, updateData);
//     return this.findOne(id);
//   }

//   async remove(id: number): Promise<void> {
//     const faq = await this.findOne(id);
//     await this.faqRepository.update(id, { isActive: false });
//   }

//   async searchFaqs(query: string, limit: number = 5): Promise<Faq[]> {
//     const searchTerms = this.extractKeywords(query);
    
//     // First, try exact question match
//     let faqs = await this.faqRepository.find({
//       where: { 
//         question: ILike(`%${query}%`),
//         isActive: true 
//       },
//       order: { usageCount: 'DESC' },
//       take: limit,
//     });

//     // If no exact matches, search by keywords
//     if (faqs.length === 0) {
//       const keywordQueries = searchTerms.map(term => ({
//         keywords: ILike(`%${term}%`),
//         isActive: true
//       }));

//       if (keywordQueries.length > 0) {
//         faqs = await this.faqRepository.find({
//           where: keywordQueries,
//           order: { usageCount: 'DESC' },
//           take: limit,
//         });
//       }
//     }

//     // If still no matches, search in answers
//     if (faqs.length === 0) {
//       faqs = await this.faqRepository.find({
//         where: { 
//           answer: ILike(`%${query}%`),
//           isActive: true 
//         },
//         order: { usageCount: 'DESC' },
//         take: limit,
//       });
//     }

//     return faqs;
//   }

//   async incrementUsage(id: number): Promise<void> {
//     await this.faqRepository.increment({ id }, 'usageCount', 1);
//   }

//   async findByCategory(category: string): Promise<Faq[]> {
//     return this.faqRepository.find({
//       where: { category, isActive: true },
//       order: { usageCount: 'DESC' },
//     });
//   }

//   private extractKeywords(text: string): string[] {
//     // Simple keyword extraction - remove common words and split
//     const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can', 'may', 'might', 'what', 'when', 'where', 'why', 'how'];
    
//     return text
//       .toLowerCase()
//       .replace(/[^\w\s]/g, ' ')
//       .split(/\s+/)
//       .filter(word => word.length > 2 && !commonWords.includes(word))
//       .slice(0, 10); // Limit to 10 keywords
//   }
// }
