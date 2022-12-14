import {
  Controller,
  Get,
  Render,
  Post,
  Res,
  Request,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { LoginGuard } from './common/guards/login.guards';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('login')
  index(@Request() req): { message: string } {
    return { message: req.flash('loginError') };
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Res() res: Response): void {
    res.redirect('/home');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  getHome(@Request() req) {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req) {
    return { user: req.user };
  }

  // @Get('/logout')
  // logout(@Request() req, @Res() res: Response): void {
  //   req.logout();
  //   res.redirect('/');
  // }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout(() => {
      res.redirect('/');
    });
  }
}
