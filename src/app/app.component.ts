import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'budget-builder-example';
  startDate: string = '';
  endDate: string = '';
  numberMonth: string[] = [];
  incomeObj: {
    label: string;
    parentCategories: {
      id: string;
      label: string;
      type: string;
      data: { label: string; value: number; id: string }[];
      categories: {
        id: string;
        label: string;
        type: string;
        data: { label: string; value: number; id: string }[];
      }[];
    }[];
  } = {
    label: 'Income',
    parentCategories: [
      {
        id: uuidv4(),
        label: 'General Income',
        type: 'parent-category',
        data: [],
        categories: [
          { label: 'Sales', type: 'category', data: [], id: uuidv4() },
          { label: 'Commission', type: 'category', data: [], id: uuidv4() },
        ],
      },
      {
        id: uuidv4(),
        label: 'Other Income',
        type: 'parent-category',
        data: [],
        categories: [
          { label: 'Training', type: 'category', data: [], id: uuidv4() },
          { label: 'Consulting', type: 'category', data: [], id: uuidv4() },
        ],
      },
    ],
  };

  expensesObj: {
    label: string;
    parentCategories: {
      id: string;
      label: string;
      type: string;
      data: { label: string; value: number; id: string }[];
      categories: {
        id: string;
        label: string;
        type: string;
        data: { label: string; value: number; id: string }[];
      }[];
    }[];
  } = {
    label: 'Expenses',
    parentCategories: [
      {
        id: uuidv4(),
        label: 'Operational Expenses',
        type: 'parent-category',
        data: [],
        categories: [
          {
            label: 'Management Fees',
            type: 'category',
            data: [],
            id: uuidv4(),
          },
          { label: 'Cloud Hosting', type: 'category', data: [], id: uuidv4() },
        ],
      },
      {
        id: uuidv4(),
        label: 'Salaries & Wages',
        type: 'parent-category',
        data: [],
        categories: [
          {
            label: 'Full Time Dev Salaries',
            type: 'category',
            data: [],
            id: uuidv4(),
          },
          {
            label: 'Part Time Dev Salaries',
            type: 'category',
            data: [],
            id: uuidv4(),
          },
          {
            label: 'Remote Salaries',
            type: 'category',
            data: [],
            id: uuidv4(),
          },
        ],
      },
    ],
  };

  calculateOpeningBalance(index: number): number {
    if (index === 0) {
      return 0;
    } else {
      return this.calculateClosingBalance(index - 1);
    }
  }
  calculateClosingBalance(index: number): number {
    let currentProfitLoss =
      this.calculateTotal(index, 'income') -
      this.calculateTotal(index, 'expenses');
    if (index === 0) {
      return currentProfitLoss;
    } else {
      return this.calculateOpeningBalance(index) + currentProfitLoss;
    }
  }

  deleteParentCategory(idParentCategory: string, type: 'income' | 'expenses') {
    if (type === 'income') {
      this.incomeObj = {
        ...this.incomeObj,
        parentCategories: this.incomeObj.parentCategories.filter(
          (pc) => pc.id !== idParentCategory
        ),
      };
    } else {
      this.expensesObj = {
        ...this.expensesObj,
        parentCategories: this.expensesObj.parentCategories.filter(
          (pc) => pc.id !== idParentCategory
        ),
      };
    }
  }

  openApplyAllParentCategory(
    e: any,
    value: number,
    idParentCategory: string,
    type: 'income' | 'expenses'
  ) {
    if (confirm('Apply to all')) {
      console.log('apply');
      if (type === 'income') {
        this.incomeObj = {
          ...this.incomeObj,
          parentCategories: this.incomeObj.parentCategories.map((pc) => {
            if (pc.id === idParentCategory) {
              return {
                ...pc,
                data: pc.data.map((mv) => ({ ...mv, value: value })),
              };
            }
            return pc;
          }),
        };
      } else {
        this.expensesObj = {
          ...this.expensesObj,
          parentCategories: this.expensesObj.parentCategories.map((pc) => {
            if (pc.id === idParentCategory) {
              return {
                ...pc,
                data: pc.data.map((mv) => ({ ...mv, value: value })),
              };
            }
            return pc;
          }),
        };
      }
    }
  }

  openApplyAllCategory(
    e: any,
    value: number,
    idParentCategory: string,
    idCategory: string,
    type: 'income' | 'expenses'
  ) {
    console.log(value, type, '123');
    if (confirm('Apply to all')) {
      if (type === 'income') {
        this.incomeObj = {
          ...this.incomeObj,
          parentCategories: this.incomeObj.parentCategories.map((pc) => {
            if (pc.id === idParentCategory) {
              return {
                ...pc,
                categories: pc.categories.map((c) => {
                  if (c.id === idCategory) {
                    return {
                      ...c,
                      data: c.data.map((mv) => ({ ...mv, value: value })),
                    };
                  }
                  return c;
                }),
              };
            }
            return pc;
          }),
        };
      } else {
        this.expensesObj = {
          ...this.expensesObj,
          parentCategories: this.expensesObj.parentCategories.map((pc) => {
            if (pc.id === idParentCategory) {
              return {
                ...pc,
                categories: pc.categories.map((c) => {
                  if (c.id === idCategory) {
                    return {
                      ...c,
                      data: c.data.map((mv) => ({ ...mv, value: value })),
                    };
                  }
                  return c;
                }),
              };
            }
            return pc;
          }),
        };
      }
    }
  }

  deleteCategory(
    idCategory: string,
    idParentCategory: string,
    type: 'income' | 'expenses'
  ) {
    console.log(type, 'wtf');
    if (type === 'income') {
      this.incomeObj = {
        ...this.incomeObj,
        parentCategories: this.incomeObj.parentCategories.map((pc) => {
          if (pc.id === idParentCategory) {
            return {
              ...pc,
              categories: pc.categories.filter((c) => c.id !== idCategory),
            };
          }
          return pc;
        }),
      };
    } else {
      this.expensesObj = {
        ...this.expensesObj,
        parentCategories: this.expensesObj.parentCategories.map((pc) => {
          if (pc.id === idParentCategory) {
            return {
              ...pc,
              categories: pc.categories.filter((c) => c.id !== idCategory),
            };
          }
          return pc;
        }),
      };
    }
  }

  changeStartMonth(type: 'starttime' | 'endtime', e: Event) {
    if (type === 'starttime') {
      this.startDate = (e?.target as HTMLInputElement).value;
      if (this.endDate) {
        this.numberMonthsDisplay(this.startDate, this.endDate);
      }
    } else {
      this.endDate = (e?.target as HTMLInputElement).value;
      if (this.startDate) {
        this.numberMonthsDisplay(this.startDate, this.endDate);
      }
    }
  }

  numberMonthsDisplay(
    startMonthTimeString: string,
    endMonthTimeString: string
  ) {
    try {
      let startObjTime = new Date(startMonthTimeString);
      let startMonth = startObjTime.getUTCMonth();
      let endObjTime = new Date(endMonthTimeString);
      // let endMonth = endObjTime.getUTCMonth();
      let months = (startObjTime.getFullYear() - endObjTime.getFullYear()) * 12;
      months -= startObjTime.getMonth();
      months += endObjTime.getMonth();
      // months += 1;
      const array_month: { label: string; value: number }[] = [];
      for (let i = startMonth; i <= startMonth + months; i++) {
        if (i >= 12) {
          let format_index = i - 12;
          let format_year = startObjTime.getFullYear() + 1;
          array_month.push({
            label: this.convertIndexToMonth(format_index) + ' ' + format_year,
            value: 0,
          });
        } else {
          array_month.push({
            label:
              this.convertIndexToMonth(i) + ' ' + startObjTime.getFullYear(),
            value: 0,
          });
        }
      }
      this.numberMonth = array_month.map((m) => m.label);
      this.incomeObj = {
        ...this.incomeObj,
        parentCategories: this.incomeObj.parentCategories.map((pc) => ({
          ...pc,
          data: [...array_month.map((m) => ({ ...m, id: uuidv4() }))],
          categories: pc.categories.map((c) => ({
            ...c,
            data: [...array_month.map((m) => ({ ...m, id: uuidv4() }))],
          })),
        })),
      };

      this.expensesObj = {
        ...this.expensesObj,
        parentCategories: this.expensesObj.parentCategories.map((pc) => ({
          ...pc,
          data: [...array_month.map((m) => ({ ...m, id: uuidv4() }))],
          categories: pc.categories.map((c) => ({
            ...c,
            data: [...array_month.map((m) => ({ ...m, id: uuidv4() }))],
          })),
        })),
      };
      return months <= 0 ? 0 : months;
    } catch (e) {
      throw e;
    }
  }

  MoveArrowParentCategory(
    index: number,
    type: 'up' | 'down' | 'left' | 'right',
    typeObj: 'income' | 'expenses'
  ) {
    switch (type) {
      case 'up':
        if (index !== 0) {
          const nextUp = this.incomeObj.parentCategories[index - 1].id;
          const findUp = document.getElementById(nextUp);
          findUp?.focus();
        }
        return
      case 'down':
        if(index !== this.incomeObj.parentCategories.length - 1 ) {
          const nextDown = this.incomeObj.parentCategories[index + 1].id;
          const findDown = document.getElementById(nextDown);
          findDown?.focus();
        }
        return
      case 'left':
      case 'right':
    }
  }

  addNewParentCategory(e: any, type: 'income' | 'expenses') {
    if (type === 'income') {
      this.incomeObj = {
        ...this.incomeObj,
        parentCategories: [
          ...this.incomeObj.parentCategories,
          {
            id: uuidv4(),
            label: e.target.value,
            type: 'parent-category',
            data: this.numberMonth.map((label) => ({
              label: label,
              id: uuidv4(),
              value: 0,
            })),
            categories: [],
          },
        ],
      };
    } else {
      this.expensesObj = {
        ...this.expensesObj,
        parentCategories: [
          ...this.expensesObj.parentCategories,
          {
            id: uuidv4(),
            label: e.target.value,
            type: 'parent-category',
            data: this.numberMonth.map((label) => ({
              label: label,
              id: uuidv4(),
              value: 0,
            })),
            categories: [],
          },
        ],
      };
    }
    e.target.value = null;
  }

  addNewCategory(id: string, e: any, type: 'income' | 'expenses') {
    if (type === 'income') {
      this.incomeObj = {
        ...this.incomeObj,
        parentCategories: this.incomeObj.parentCategories.map((pc) => {
          if (pc.id === id) {
            return {
              ...pc,
              categories: [
                ...pc.categories,
                {
                  id: uuidv4(),
                  label: e.target.value,
                  type: 'category',
                  data: this.numberMonth.map((label) => ({
                    label: label,
                    id: uuidv4(),
                    value: 0,
                  })),
                },
              ],
            };
          }
          return pc;
        }),
      };
    } else {
      this.expensesObj = {
        ...this.expensesObj,
        parentCategories: this.expensesObj.parentCategories.map((pc) => {
          if (pc.id === id) {
            return {
              ...pc,
              categories: [
                ...pc.categories,
                {
                  id: uuidv4(),
                  label: e.target.value,
                  type: 'category',
                  data: this.numberMonth.map((label) => ({
                    label: label,
                    id: uuidv4(),
                    value: 0,
                  })),
                },
              ],
            };
          }
          return pc;
        }),
      };
    }
  }

  calculateTotal(indexMonth: number, type: 'income' | 'expenses') {
    let total = 0;
    if (type === 'income') {
      this.incomeObj.parentCategories.forEach((pc) => {
        total += pc.data[indexMonth].value;
        pc.categories.forEach((c) => {
          total += c.data[indexMonth].value;
        });
      });
    } else {
      this.expensesObj.parentCategories.forEach((pc) => {
        total += pc.data[indexMonth].value;
        pc.categories.forEach((c) => {
          total += c.data[indexMonth].value;
        });
      });
    }

    return total;
  }

  calculateSubTotal(
    indexMonth: number,
    indexParentCategory: number,
    type: 'income' | 'expenses'
  ) {
    let subTotal = 0;
    if (type === 'income') {
      const parentCategory =
        this.incomeObj.parentCategories[indexParentCategory];
      subTotal = parentCategory.data[indexMonth].value;
      parentCategory.categories.forEach((c) => {
        subTotal += c.data[indexMonth].value;
      });
    } else {
      const parentCategory =
        this.expensesObj.parentCategories[indexParentCategory];
      subTotal = parentCategory.data[indexMonth].value;
      parentCategory.categories.forEach((c) => {
        subTotal += c.data[indexMonth].value;
      });
    }

    return subTotal;
  }

  convertIndexToMonth(index: number) {
    switch (index) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'Octorber';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        return '';
    }
  }
}
