import {Component, inject, OnInit} from '@angular/core';
import {CategoriesComponent} from '../../components/categories/categories.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-catalog-detail',
  imports: [
    CategoriesComponent
  ],
  templateUrl: './catalog-detail.component.html',
  styleUrl: './catalog-detail.component.scss'
})
export class CatalogDetailComponent implements OnInit {
  private _route = inject(ActivatedRoute);

  public goodId: number | null = null

  public goods = [
    {
      id: 1,
      characteristics: 'asdf'
    },
    {
      id: 2,
      characteristics: 'asdf'
    }
  ]

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.goodId = id;
      }
    })
  }
}
