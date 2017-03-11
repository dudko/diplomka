#include <string.h>
#include <time.h>
#include <stdlib.h>
#include <math.h>
#include <errno.h>
#include <stdio.h>

double* random_point_sphere(void) {
  
  double* xyz = (double*) malloc(sizeof(double) * 3);
  char run = 1;

  while (run) {
    double u = (double) rand() / (double) (RAND_MAX-1) * (rand() < RAND_MAX/2 ? 1 : -1);
    double v = (double) rand() / (double) (RAND_MAX-1) * (rand() < RAND_MAX/2 ? 1 : -1);

    if (u*u + v*v >= 1) continue;
    
    xyz[0] = 2 * u * sqrt(1 - u*u - v*v);
    xyz[1] = 2 * v * sqrt(1 - u*u - v*v); 
    xyz[2] = 1 - 2 * (u*u + v*v);

    // if (math_errhandling & MATH_ERRNO) {
    //   printf("%s\n", strerror(errno));
    // }
    run = 0;
  }

  return xyz;
}

void transpose(double **src, double **dst, const int N, const int M) {
  for(int n = 0; n<N*M; n++) {
      int i = n/N;
      int j = n%N;
      dst[n] = src[M*j + i];
  }
}

double** allocate_matrix(unsigned int rows, unsigned int cols) {
  double** matrix = malloc(sizeof(double*) * rows);
  for (int i = 0; i < rows; i++) {
    matrix[i] = malloc(sizeof(double) * cols); 
  }
}

void print_matrix(double **matrix, unsigned int m) {
  for (int i = 0; i < m; i++) {
    for (int j = 0; j < m; j++) {
      printf("%f ", matrix[i][j]);
    }
    printf("\n");
  }
}

void multiply_matrices(double **M, double **N, double **result, unsigned int m) {
  for(int i = 0; i < m; i++) {
    for (int j = 0; j < m; j++) {
      for(int k = 0; k < m; k++) {
          result[i][j] = M[i][k] * N[k][j];
      }
    }
  }
}

/*
   Recursive definition of determinate using expansion by minors.
*/
//==============================================================================
// Recursive definition of determinate using expansion by minors.
//
// Notes: 1) arguments:
//             a (double **) pointer to a pointer of an arbitrary square matrix
//             n (int) dimension of the square matrix
//
//        2) Determinant is a recursive function, calling itself repeatedly
//           each time with a sub-matrix of the original till a terminal
//           2X2 matrix is achieved and a simple determinat can be computed.
//           As the recursion works backwards, cumulative determinants are
//           found till untimately, the final determinate is returned to the
//           initial function caller.
//
//        3) m is a matrix (4X4 in example)  and m13 is a minor of it.
//           A minor of m is a 3X3 in which a row and column of values
//           had been excluded.   Another minor of the submartix is also
//           possible etc.
//             m  a b c d   m13 . . . .
//                e f g h       e f . h     row 1 column 3 is elminated
//                i j k l       i j . l     creating a 3 X 3 sub martix
//                m n o p       m n . p
//
//        4) the following function finds the determinant of a matrix
//           by recursively minor-ing a row and column, each time reducing
//           the sub-matrix by one row/column.  When a 2X2 matrix is
//           obtained, the determinat is a simple calculation and the
//           process of unstacking previous recursive calls begins.
//
//                m n
//                o p  determinant = m*p - n*o
//
//        5) this function uses dynamic memory allocation on each call to
//           build a m X m matrix  this requires **  and * pointer variables
//           First memory allocation is ** and gets space for a list of other
//           pointers filled in by the second call to malloc.
//
//        6) C++ implements two dimensional arrays as an array of arrays
//           thus two dynamic malloc's are needed and have corresponsing
//           free() calles.
//
//        7) the final determinant value is the sum of sub determinants
//
//==============================================================================


// double Determinant(double a[][6], int n)
// {   
//     int i,j,j1,j2 ;                    // general loop and matrix subscripts
//     double det = 0 ;                   // init determinant
//     double **m = NULL ;                // pointer to pointers to implement 2d
//                                        // square array

//     if (n < 1)    {  }                // error condition, should never get here

//     else if (n == 1) {                 // should not get here
//         det = a[0][0] ;
//         }

//     else if (n == 2)  {                // basic 2X2 sub-matrix determinate
//                                        // definition. When n==2, this ends the
//         det = a[0][0] * a[1][1] - a[1][0] * a[0][1] ;// the recursion series
//         }


//                                        // recursion continues, solve next sub-matrix
//     else {                             // solve the next minor by building a
//                                        // sub matrix
//         det = 0 ;                      // initialize determinant of sub-matrix

//                                            // for each column in sub-matrix
//         for (j1 = 0 ; j1 < n ; j1++) {
//                                            // get space for the pointer list
//             m = (double **) malloc((n-1)* sizeof(double *)) ;

//             for (i = 0 ; i < n-1 ; i++)
//                 m[i] = (double *) malloc((n-1)* sizeof(double)) ;
//                        //     i[0][1][2][3]  first malloc
//                        //  m -> +  +  +  +   space for 4 pointers
//                        //       |  |  |  |          j  second malloc
//                        //       |  |  |  +-> _ _ _ [0] pointers to
//                        //       |  |  +----> _ _ _ [1] and memory for
//                        //       |  +-------> _ a _ [2] 4 doubles
//                        //       +----------> _ _ _ [3]
//                        //
//                        //                   a[1][2]
//                       // build sub-matrix with minor elements excluded
//             for (i = 1 ; i < n ; i++) {
//                 j2 = 0 ;               // start at first sum-matrix column position
//                                        // loop to copy source matrix less one column
//                 for (j = 0 ; j < n ; j++) {
//                     if (j == j1) continue ; // don't copy the minor column element

//                     m[i-1][j2] = a[i][j] ;  // copy source element into new sub-matrix
//                                             // i-1 because new sub-matrix is one row
//                                             // (and column) smaller with excluded minors
//                     j2++ ;                  // move to next sub-matrix column position
//                     }
//                 }

//             det += pow(-1.0,1.0 + j1 + 1.0) * a[0][j1] * Determinant(m,n-1) ;
//                                             // sum x raised to y power
//                                             // recursively get determinant of next
//                                             // sub-matrix which is now one
//                                             // row & column smaller

//             for (i = 0 ; i < n-1 ; i++) free(m[i]) ;// free the storage allocated to
//                                             // to this minor's set of pointers
//             free(m) ;                       // free the storage for the original
//                                             // pointer to pointer
//         }
//     }
//     return(det) ;
// }


int main(void) {
  srand(time(NULL));
  
  // for (int test = 0; test < 1000; test++) {
    double C[6][6] = {
      {106.75, 60.41, 60.41, 0.0, 0.0, 0},
      {60.41, 106.75, 60.41, 0.0, 0.0, 0},
      {60.41, 60.41, 106.75, 0.0, 0.0, 0},
      {0.0, 0.0, 0.0, 28.34, 0.0, 0},
      {0.0, 0.0, 0.0, 0.0, 28.34, 0},    
      {0.0, 0.0, 0.0, 0.0, 0.0, 28.34}
    };

    // print matrix
    printf("C\n");
    for (int i = 0; i < 6; i++) {
      printf("[ ");
      for (int j = 0; j < 6; j++) {
        printf("%f, ", C[i][j]);
      }
      printf(" ]\n");
    }
    printf("\n");  

    double* point = random_point_sphere();
    double i = point[0];
    double j = point[1];
    double k = point[2];

    // printf("i, j, k: %f %f %f\n", i, j, k);

    double theta = acos(k);
    double sin_theta = sin(theta);
    
    double O[3][3] = { 
      {k + (1 - k) * i * i, (1 - k) * i * j + sin_theta * -k, (1 - k) * i * k + j * sin_theta},
      {(1 - k) * i * j + sin_theta * k, k + (1 - k) * j *j, (1 - k) * j * k + sin_theta * -i},
      {(1 - k) * i * k + sin_theta * -j, (1 - k) * k * j + sin_theta * i, k + (1 - k) * k * k}
    };

    double K[6][6] = {
      {O[0][0]*O[0][0], O[0][1]*O[0][1], O[0][2]*O[0][2], 2*O[0][1]*O[0][2], 2*O[0][2]*O[0][0], 2*O[0][0]*O[0][1]},
      {O[1][0]*O[1][0], O[1][1]*O[1][1], O[1][2]*O[1][2], 2*O[1][1]*O[1][2], 2*O[1][2]*O[1][0], 2*O[1][0]*O[1][1]},
      {O[2][0]*O[2][0], O[2][1]*O[2][1], O[2][2]*O[2][2], 2*O[2][1]*O[2][2], 2*O[2][2]*O[2][0], 2*O[2][0]*O[2][1]},
      {O[1][0]*O[2][0], O[1][1]*O[2][1], O[1][2]*O[2][2], O[1][1]*O[2][2]+O[1][2]*O[2][1], O[1][2]*O[2][0]+O[1][0]*O[2][2], O[1][0]*O[2][1]+O[1][1]*O[2][0]},
      {O[2][0]*O[0][0], O[2][1]*O[0][1], O[2][2]*O[0][2], O[2][1]*O[0][2]+O[2][2]*O[0][1], O[2][2]*O[0][0]+O[2][0]*O[0][2], O[2][0]*O[0][1]+O[2][1]*O[0][0]},
      {O[0][0]*O[1][0], O[0][1]*O[1][1], O[0][2]*O[1][2], O[0][1]*O[1][2]+O[0][2]*O[1][1], O[0][2]*O[1][0]+O[0][0]*O[1][2], O[0][0]*O[1][1]+O[0][1]*O[1][0]}
    };

    // print matrix
    printf("K\n");
    for (int i = 0; i < 6; i++) {
      printf("[ ");
      for (int j = 0; j < 6; j++) {
        printf("%f, ", K[i][j]);
      }
      printf(" ]\n");
    }
    printf("\n");

    double KT[6][6] = {0};
    transpose((double **) K, (double **) KT, 6, 6);

    // print matrix
    printf("KT\n");    
    for (int i = 0; i < 6; i++) {
      printf("[ ");
      for (int j = 0; j < 6; j++) {
        printf("%f, ", KT[i][j]);
      }
      printf(" ]\n");
    }
    printf("\n");

    double CS[6][6] = {0};
    
    for(int i = 0; i < 6; i++) {
      for (int j = 0; j < 6; j++){
        for(int k = 0; k < 6; k++){
            CS[i][j] = K[i][k] * C[k][j];
        }
      }
    }
    // print matrix
    printf("CS1\n");    
    for (int i = 0; i < 6; i++) {
      printf("[ ");
      for (int j = 0; j < 6; j++) {
        printf("%f, ", C[i][j]);
      }
      printf(" ]\n");
    }
    printf("\n");

    for(int i = 0; i < 6; i++) {
      for (int j = 0; j < 6; j++){
        for(int k = 0; k < 6; k++){
            C[i][j] = CS[i][k] * KT[k][j];
        }
      }
    }

    // print matrix
    printf("CS\n");    
    for (int i = 0; i < 6; i++) {
      printf("[ ");
      for (int j = 0; j < 6; j++) {
        printf("%f, ", C[i][j]);
      }
      printf(" ]\n");
    }
    printf("\n");

    // int N = 6;
    // int NN = 36;

    // int pivotArray[9]; //since our matrix has three rows
    // int errorHandler;
    // double lapackWorkspace[36];

    // // dgetrf(M,N,A,LDA,IPIV,INFO) means invert LDA columns of an M by N matrix
    // // called A, sending the pivot indices to IPIV, and spitting error information
    // // to INFO. also don't forget (like I did) that when you pass a two-dimensional
    // // array to a function you need to specify the number of "rows"
    // dgetrf_(&N, &N, C[0], &N, pivotArray, &errorHandler);
    // printf ("dgetrf eh, %d, should be zero\n", errorHandler);

    // dgetri_(&N, C[0], &N, pivotArray, lapackWorkspace, &NN, &errorHandler);
    // printf ("dgetri eh, %d, should be zero\n", errorHandler);

    // for (int i = 0; i < 6; i++) {
    //   for (int j = 0; j < 6; j++) {
    //     printf("%f ", C[i][j]);
    //   }
    //   printf("\n");
    // }  

    // // Determinant(C, 6);
    // printf("%f", Determinant(C, 6));
    // free(point);
    
    return 0;
}