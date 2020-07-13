import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tagSearch' })
export class TagFilterPipe implements PipeTransform {
  public transform(tags: any[], searchText: any): any {
    if (searchText == null || tags == null) {
      return tags;
    }
    var tagsArray = Array.from(tags);
    return tagsArray.filter(tag => tag.name.toLowerCase().indexOf
    (searchText.toLowerCase()) !== -1);
  }
}