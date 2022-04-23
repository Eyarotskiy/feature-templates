import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutInnerComponent} from 'src/app/components/about/about-inner/about-inner.component';
import {AboutComponent} from 'src/app/components/about/about.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    children: [
      {
        path: 'inner',
        component: AboutInnerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule { }
