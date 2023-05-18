export class Video {
    id?: number;
    title: string;
    linkvideo: string;
    transcription: string;
    summary: string;
    topics: string;
    connectors: string;
    questions: string;
    critique: string;
    final_grading: string;
    idowner: string;

  
    constructor(
      id :number = 0,
      title: string = "",
      linkvideo: string = "",
      transcription: string = "",
      summary: string = "",
      topics: string = "",
      connectors: string = "",
      questions: string = "",
      critique: string = "",
      final_grading: string = "",
      idowner: string = "",
    ) {
      this.id = id;
      this.title = title;
      this.linkvideo = linkvideo;
      this.transcription = transcription;
      this.summary = summary;
      this.topics = topics;
      this.connectors = connectors;
      this.questions = questions;
      this.critique = critique;
      this.final_grading = final_grading;
      this.idowner = idowner;
    }
  }