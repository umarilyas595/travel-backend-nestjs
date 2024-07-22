import { HttpException, Injectable } from '@nestjs/common';
import { CreateOpenaiDto } from './dto/create-openai.dto';
import { UpdateOpenaiDto } from './dto/update-openai.dto';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenaiService {
  async create(createOpenaiDto: CreateOpenaiDto) {
    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const chat_completion = await openai.createChatCompletion({
        model: 'gpt-4',
        temperature: 0,
        messages: [{ role: 'system', content: createOpenaiDto.content }],
      });
      return chat_completion.data.choices;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  findAll() {
    return `This action returns all openai`;
  }

  findOne(id: number) {
    return `This action returns a #${id} openai`;
  }

  update(id: number, updateOpenaiDto: UpdateOpenaiDto) {
    return `This action updates a #${id} openai`;
  }

  remove(id: number) {
    return `This action removes a #${id} openai`;
  }
}
