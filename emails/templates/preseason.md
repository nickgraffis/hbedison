Hey {{ context.Name }},

The boys water polo season will officially begin on August 22nd. Here are some really important things to know and do before we get started. **We will also have a Parent Meeting August 23rd at 7 PM at the Edison HS Library**. 

Take a look at some important information below for this season. Or [view this email in the browser](https://edisonwp.com/emails/preseason?{{ Object.keys(context)?.map(key => `${key}=${context[key]}`).join('&') }})

## Email List & Communication

I have cleaned up the email list a significant amount, this email was sent to the following addresses:

**Athlete Emails**: {{ context.AthleteEmails }}
{{ context?.ParentEmails ? '**ParentEmails:** ' + context.ParentEmails : '' }}

If you would like to add, remove, or update an email from an "_Athlete_" to a _"Parent"_ email, you can do so [here](https://edisonwp.com/email-list/{{ context.id }}).

## Athlete Clearance

Athletes will need to be cleard by **August 24th** or they will not be able to participate in games, scrimmages, or practice. Not being cleared will result in an unescused abscense. 

### Steps for Clearance

{{ context?.HomeCampus ? '✅' : '❌' }} Register on [Home Campus](). _You {{  context?.HomeCampus ? 'are' : ' are not'}} signed up on Home Campus_.

Sign up online [here]() and then verify your email. Then fill out all of the necessisary forms. 

{{ context?.Physical ? '✅' : '❌' }} Provide the school with a current physical. _You {{ context?.Physical ? 'have a current physical on file with the school' : 'do not have a current physical on file with the school' }}_.

{{ context?.Cleared ? '✅' : '❌' }} Take the online Concussion Baseline Test. If you have signed up on Home Campus, our athlete dirictor has already sent you a link to take the test. If you need to get that link again, email [Rich Boyce](mailto:rboyce@hbuhsd.edu).

{{ context?.Cleared ? '✅' : '❌' }} Provide the school's financial office with a check made out to **Edison High School** for **$90.00** **_anytime between 12PM and 3 PM_**  for _"Training & Transportation Fees"_. Training refers to the schools trainer, not Coach Ashley, and transportation refers to our use of school busses and vans. 

**{{ context?.Cleared ? '🎉 You are currently cleared' : '❌ You are not currently cleared' }}.**

## Game Schedule

The [Game Schedule](https://edisonwp.com/boys) has not changed significantly since it was posted months ago. You can view it [here](https://edisonwp.com/boys).

## Practice Groups

We will practice in two groups often, and those groups will not be set in stone and will change until we get deeper into season. 

{{ context?.Name }}, you are in the **{{ context?.Team }} Group**.

## Schedule Before School Starts

**Green Group**

M (Aug 22) 6 - 8 AM @ HBHS </br>
T (Aug 23) 6 - 8 AM @ Edison HS (6 - 7 AM Weightroom) </br>
W (Aug 24) 6 - 8 AM @ Edison HS </br>
W (Aug 24) 3 - 6 PM @ Northwood HS Scrimmage (No Transportation) </br>
Th (Aug 25) 6 - 8 AM @ Edison HS (6 - 7 AM Weightroom) </br>
Fri (Aug 26) 6 - 8 AM @ Edison HS </br>
Sat (Aug 27) OFF </br>
Sun (Aug 28) OFF </br>
M (Aug 29) 6 - 8 AM @ HBHS </br>
T (Aug 30) 6 - 8 AM @ Edison HS (6 - 7 AM Weightroom) </br>

**Gold Group**

M (Aug 22) 3 - 5 PM @ Edison HS </br>
T (Aug 23) 6 - 8 AM @ Edison HS (6 - 7 AM Weightroom) </br>
W (Aug 24) 2 - 4 PM @ Northwood HS (No Transportation) </br>
Th (Aug 25) 6 - 8 AM @ Edison HS (6 - 7 AM Weightroom) </br>
Fri (Aug 26) 3 - 5 PM @ Edison HS </br>
Sat (Aug 27) OFF </br>
Sun (Aug 28) OFF </br>
M (Aug 29) 3 - 5 PM @ Edison HS </br>
T (Aug 30) 6 - 8 AM @ Edison HS (6 - 7 AM Weightroom) </br>


## Schedule Once School Starts

I will provide a more detailed schedule very soon for the season, but here are some things to know: 

1. We will always practice after school or later. 
2. All practices will be at Edison HS. 
3. Athlete's are **REQUIRED** to attend **ALL** practices and games. Athletes who are not present for practice, or a game, will be marked absent in thier class. If unescused abscenses continue, athletes will be dropped from the class, and therfore not be a part of the team.

**Green Group**

W (Aug 31) First Day of School - Attend **ALL** classes, including your Water Polo class with Mr. Whittmore. </br>
W (Aug 31) 5:30 - 7:30 PM @ Edison HS </br>
Th (Sept 1) 5:30 - 7:30 PM @ Edison HS </br>
Fri (Sept 2) Varsity Long Beach Tournament - Roster and Times TBA </br>
Sat (Sept 3) Varsity Long Beach Tournament - Roster and Times TBA (No Transportation) </br>

**Gold Group**

W (Aug 31) First Day of School - Attend **ALL** classes, including your Water Polo class with Mr. Whittmore. </br>
Th (Sept 1) 3 - 5 PM @ Edison HS </br>
Fri (Sept 2) 3:30 - 4:30 PM Weightroom + 4:30 - 5:30 PM Pool @ Edison

## T-Shirt Size & Uniform

You either gave me your T-Shirt Size at practice, or I guessed. It is **{{ context?.ShirtSize }}**.

If you want to change the T-Shirt/Polo Shirt Size you can do so [here](https://edisonwp.com/shirt-size/{{ context?.id }}).

## Coaching Staff

**Head Coach** - Nick Graffis [ngraffis@hubuhsd.edu](mailto:ngraffis@hbuhsd.edu) </br>
**Varsity Assistant** - Brian Huyhn </br>
**F/S Co-Head Coach** - Ashley Hogan </br>
**F/S Co-Head Coach/Goalies** - Coryn Cavecchee </br>
**Weight Trainer** - Ashley Penntegil </br>

## Parent Communication Guide

Edison has provided a panflet to help parents to understand the best way to communicate with their coaches. [Here is the PDF of this panflet]().

Essentially it says that:

